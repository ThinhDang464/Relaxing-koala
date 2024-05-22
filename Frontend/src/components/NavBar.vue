<template>
    <div class="backgroundContainer">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
          <router-link to="/" class="navbar-logo">
            <h5 class="brand-name">The Relaxing Koala</h5>
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/menu">View Online Menu</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/book">Book a Table</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
  
  };
  </script>
  
  <style scoped>
  .nav-link {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: white !important; /* Change the color to white */
  }
  
  .nav-link:hover {
    color: #e74c3c !important; /* Change the color to darker red on hover */
    transition: background-color 0.5s;
  }
  
  .navbar-logo {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  
  .brand-name {
    font-family: 'Pacifico', cursive; /* Custom font */
    font-size: 1.75rem; /* Adjust font size */
    font-weight: bold;
    color: #f39c12; /* Brand color */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Add some shadow for effect */
    margin: 0;
    padding: 0;
    letter-spacing: 1px; /* Adjust spacing between letters */
  }
  </style>
  