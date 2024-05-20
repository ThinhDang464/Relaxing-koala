const express = require('express');
const mongoose = require('mongoose');
const menuItem = require('./objects/menuItem');
const onlineCustomer = require('./objects/onlineCustomer');
const cors = require('cors'); //need cors to make request from localhost:8000 to localhost:3000 of server
const app = express();

// MongoDB Atlas connection string
const connectionString = 'mongodb+srv://thinhd46464:ngumanoiak1234@trk.ikxdhis.mongodb.net/?retryWrites=true&w=majority&appName=TRK';

// Connect to MongoDB Atlas
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start the server after successfully connecting to the database
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Create the MenuItem model using the imported schema
const MenuItem = mongoose.model('MenuItem', menuItem);
const OnlineCustomer = mongoose.model('OnlineCustomer', onlineCustomer);

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

// Define the Cart schema
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'OnlineCustomer', required: true },
  items: [cartItemSchema],
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

// Define the Order schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

// Apply CORS middleware
app.use(cors(corsOptions));
// Middleware to parse JSON request bodies
app.use(express.json());

// Hard-coded menu items
const menuItems = [
  { name: 'Smash Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', price: 9.99, category: 'Burgers' },
  { name: 'Double Cheese Burger', description: 'Double juicy beef patty with lettuce, tomato, and cheese', price: 12.99, category: 'Burgers' },
  { name: 'Peperoni Pizza', description: 'Thin crust pizza with pepperoni and mozzarella', price: 12.99, category: 'Pizza' },
  { name: 'Truffle Pasta', description: 'Truffle sauce pasta with creamy bacon and mushroom', price: 12.99, category: 'Pasta' },
  { name: 'Fries', description: 'Thin cut fries with chicken salt', price: 7.99, category: 'Side' },
  { name: 'Hot Chicken Wings', description: 'Buffalo sauce and cream chicken wings', price: 12.99, category: 'Side' },
];

// Save the menu items to the database
async function saveMenuItems() {
  for (const item of menuItems) {
    try {
      const existingItem = await MenuItem.findOne({ name: item.name });
      if (!existingItem) {
        const newItem = new MenuItem(item);
        await newItem.save();
        console.log(`Menu item "${item.name}" saved to the database`);
      } else {
        console.log(`Menu item "${item.name}" already exists in the database`);
      }
    } catch (error) {
      console.error(`Error saving menu item "${item.name}":`, error);
    }
  }
}
saveMenuItems();

// Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
// API endpoint to get all menu items
app.get('/api/menu-items', async (req, res) => {
  try {
    const items = await MenuItem.find(); //fetch all menu items from the database
    res.json(items); //If the database query is successful, we send the retrieved menu items as a JSON response
  } catch (error) {
    console.error('Error retrieving menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to create an order
app.post('/api/orders', async (req, res) => {
  try {
    const { firstName, lastName, email, deliveryAddress, cartItems } = req.body;

    // Create a new user
    const user = new OnlineCustomer({ firstName, lastName, email, deliveryAddress });
    await user.save();

    // Calculate the total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.menuItem.price * item.quantity;
    }, 0);

    // Create a new order
    const order = new Order({
      user: user._id,
      items: cartItems,
      totalAmount,
      deliveryAddress,
    });
    await order.save();

    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
