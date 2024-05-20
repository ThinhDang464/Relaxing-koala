const express = require('express');
const mongoose = require('mongoose');
const menuItem = require('./objects/menuItem');

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
MenuItem.insertMany(menuItems)
  .then(() => {
    console.log('Menu items saved to the database');
  })
  .catch((error) => {
    console.error('Error saving menu items:', error);
  });

// Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});