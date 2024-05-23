<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    username: this.username,
                    password: this.password
                });
                this.message = response.data.message;
                if (response.data.message === 'Login successful') {
                    // Store the user token or login status
                    localStorage.setItem('userToken', 'your-auth-token');
                    localStorage.setItem('isLoggedIn', true)
                    this.$router.push('/map');
                }
            } catch (error) {
                this.message = error.response.data.message || 'Login failed';
            }
        }
    }
};
</script>