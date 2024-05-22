<template>
    <div class="menu-container">
      <h1>Our Menu</h1>
      <div class="menu-items">
        <div v-for="item in menuItems" :key="item._id" class="menu-item">
          <img :src="placeholderImage" alt="Menu Item" class="menu-item-image" />
          <div class="menu-item-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="menu-item-price">${{ item.price.toFixed(2) }}</p>
            <button @click="addToCart(item)">Add to Cart</button>
          </div>
        </div>
      </div>
      <router-link to="/cart" class="cart-icon">
        <i class="bi bi-cart-fill"></i>
        <span class="cart-count">{{ cartItemCount }}</span>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: [],
        placeholderImage: 'https://via.placeholder.com/150',
      };
    },
    computed: {
      cartItemCount() {
        return JSON.parse(localStorage.getItem('cart') || '[]').length;
      },
    },
    mounted() {
      this.fetchMenuItems();
    },
    methods: {
      async fetchMenuItems() {
        try {
          const response = await fetch('http://localhost:3000/api/menu-items');
          if (response.ok) {
            this.menuItems = await response.json();
          } else {
            throw new Error('Error fetching menu items');
          }
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      },
      addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((cartItem) => cartItem.menuItem._id === item._id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ menuItem: item, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  .menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
  }
  .menu-item {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  .menu-item-image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  .menu-item-details {
    margin-top: 10px;
  }
  .menu-item-price {
    font-weight: bold;
    color: #888;
  }
  .cart-icon {
    position: fixed;
    top: 70px;
    right: 20px;
    font-size: 24px;
    color: #333;
    text-decoration: none;
  }
  .cart-count {
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 4px 8px;
    font-size: 12px;
    position: absolute;
    top: -10px;
    right: -10px;
  }
  </style>
  