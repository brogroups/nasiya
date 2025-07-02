<template>
 <div class="login">
  <form @submit.prevent="login">
   <input v-model="username" placeholder="Username" required />
   <input v-model="password" type="password" placeholder="Password" required />
   <button type="submit">Login</button>
  </form>
  <div v-if="error" class="error">{{ error }}</div>
 </div>
</template>

<script>
import axios from '@/Utils/axios'

export default {
 name: 'Login',
 data() {
  return {
   username: '',
   password: '',
   error: ''
  }
 },
 methods: {
  async login() {
   try {
    const response = await axios.post('/login', {
     username: this.username,
     password: this.password
    })
    // Handle successful login (e.g., save token, redirect)
    this.error = ''
    // Example: this.$router.push('/dashboard')
   } catch (err) {
    this.error = err.response?.data?.message || 'Login failed'
   }
  }
 }
}
</script>

<style scoped>
.login {
 max-width: 300px;
 margin: auto;
}
.error {
 color: red;
 margin-top: 10px;
}
</style>
