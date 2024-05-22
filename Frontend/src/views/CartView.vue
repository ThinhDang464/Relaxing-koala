<template>
    <div class="cart-container container mt-5">
      <h2 class="text-center mb-4">Shopping Cart</h2>
      <div v-if="cartItems.length === 0" class="alert alert-info text-center">
        Your cart is empty.
      </div>
      <div v-else>
        <div v-for="(item, index) in cartItems" :key="item.menuItem._id" class="cart-item card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="item-details flex-grow-1">
              <h4 class="card-title mb-1">{{ item.menuItem.name }}</h4>
              <p class="card-text mb-1">Price: ${{ item.menuItem.price.toFixed(2) }}</p>
            </div>
            <div class="quantity-control d-flex align-items-center">
              <button class="btn btn-secondary btn-sm" @click="decreaseQuantity(index)">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="btn btn-secondary btn-sm" @click="increaseQuantity(index)">+</button>
            </div>
            <button class="btn btn-danger btn-sm ml-3" @click="removeItem(index)">Remove</button>
          </div>
        </div>
        <div class="total-amount text-right">
          <h4>Total Amount: ${{ totalAmount.toFixed(2) }}</h4>
        </div>
        <div class="text-center">
          <button class="btn btn-primary mt-3" @click="openModal">Place Order</button>
        </div>
      </div>
      <!-- Modal -->
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Enter Your Information</h5>
              <button type="button" class="close" @click="closeModal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="placeOrder">
                <div class="form-group">
                  <label for="firstName">First Name:</label>
                  <input type="text" class="form-control" id="firstName" v-model="firstName" required>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name:</label>
                  <input type="text" class="form-control" id="lastName" v-model="lastName" required>
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                  <label for="deliveryAddress">Delivery Address:</label>
                  <textarea class="form-control" id="deliveryAddress" v-model="deliveryAddress" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Place Order</button>
                <button type="button" class="btn btn-secondary ml-2" @click="closeModal">Cancel</button>
              </form>
            </div>
          </div>
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
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  .item-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }
  .quantity-control {
    display:flex;
    align-items: right;
    margin-left: auto;
  }
  .quantity-control button {
    margin: 0 5px;
  }
  .total-amount {
    margin-top: 20px;
    text-align: right;
  }
  .modal.fade.show {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  