<template>
    <div class="home-container">
      <button class="view-menu-button">
        <router-link to="/menu" class="view-menu-link">View Online Menu</router-link>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
  };
  </script>
  
  <style scoped>
  .home-container {
    background-image: url('@/assets/background.jpeg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .view-menu-button {
    padding: 15px 30px;
    font-size: 20px;
    font-family: 'Arial', sans-serif;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .view-menu-button:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(-2px);
  }
  
  .view-menu-button:active {
    transform: translateY(0);
  }
  
  .view-menu-link {
    text-decoration: none; /* Remove underline */
    color: inherit; /* Inherit color from button */
    display: inline-block; /* Ensure proper padding and click area */
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 1.5; /* Adjust for vertical centering */
  }
  </style>
  