<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Register</button>
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
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/register', {
                    username: this.username,
                    password: this.password
                });
                if (response && response.data && response.data.message) {
                    alert(response.data.message);
                } else {
                    alert('Registration failed. Server response not as expected.');
                }
                this.$router.push('/login');
            } catch (error) {
                this.message = error.response.data.message;
                alert('Registration failed.');
            }
        }
    }
};
</script>
