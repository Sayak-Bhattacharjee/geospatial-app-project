<template>
  <div id="app">
    <nav>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
      <router-link v-if="isLoggedIn" to="/map">Map</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // Implement login status check logic here (e.g., checking a token in localStorage)
      // For now, we'll just set isLoggedIn to false
      this.isLoggedIn = !!localStorage.getItem('userToken');
    },
    logout() {
      localStorage.removeItem('userToken');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'() {
      this.checkLoginStatus();
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>