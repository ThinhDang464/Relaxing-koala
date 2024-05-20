<template>
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in cartItems" :key="item.menuItem._id" class="cart-item">
          <div class="item-details">
            <h4>{{ item.menuItem.name }}</h4>
            <p>Price: ${{ item.menuItem.price.toFixed(2) }}</p>
            <div class="quantity-control">
              <button @click="decreaseQuantity(index)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>
            <button @click="removeItem(index)">Remove</button>
          </div>
        </div>
        <div class="total-amount">
          <h4>Total Amount: ${{ totalAmount.toFixed(2) }}</h4>
        </div>
        <button @click="openModal">Place Order</button>
      </div>
      <!-- Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Enter Your Information</h3>
          <form @submit.prevent="placeOrder">
            <div>
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" v-model="firstName" required>
            </div>
            <div>
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" v-model="lastName" required>
            </div>
            <div>
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="email" required>
            </div>
            <div>
              <label for="deliveryAddress">Delivery Address:</label>
              <textarea id="deliveryAddress" v-model="deliveryAddress" required></textarea>
            </div>
            <button type="submit">Place Order</button>
            <button type="button" @click="closeModal">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [],
        showModal: false,
        firstName: '',
        lastName: '',
        email: '',
        deliveryAddress: '',
      };
    },
    computed: {
      totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
      },
    },
    mounted() {
      this.loadCartItems();
    },
    methods: {
      loadCartItems() {
        this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      },
      decreaseQuantity(index) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
          this.updateCart();
        }
      },
      increaseQuantity(index) {
        this.cartItems[index].quantity++;
        this.updateCart();
      },
      removeItem(index) {
        this.cartItems.splice(index, 1);
        this.updateCart();
      },
      updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      },
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      async placeOrder() {
        try {
          const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              deliveryAddress: this.deliveryAddress,
              cartItems: this.cartItems,
            }),
          });
          if (response.ok) {
            // Clear the cart
            this.cartItems = [];
            localStorage.removeItem('cart');
            // Close the modal
            this.closeModal();
            // Show success message or redirect to a success page
            alert('Order placed successfully!');
          } else {
            throw new Error('Error placing order');
          }
        } catch (error) {
          console.error('Error placing order:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .item-details {
    flex-grow: 1;
  }
  .quantity-control {
    display: flex;
    align-items: center;
  }
  .quantity-control button {
    margin: 0 5px;
  }
  .total-amount {
    margin-top: 20px;
    text-align: right;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  .modal-content form {
    display: flex;
    flex-direction: column;
  }
  .modal-content form div {
    margin-bottom: 10px;
  }
  .modal-content form label {
    font-weight: bold;
  }
  .modal-content form input,
  .modal-content form textarea {
    width: 100%;
    padding: 5px;
  }
  .modal-content form button {
    margin-top: 10px;
  }
  </style>
  