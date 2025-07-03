<template>
  <div class="login">
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "../Utils/axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/auth/login", {
          login: this.username,
          password: this.password,
        });
        // Handle successful login (e.g., save token, redirect)
        this.error = "";

        if (response) {
          localStorage.setItem("user", JSON.stringify(response));
        } else {
          throw new Error("No token received");
        }
        this.$router.push("/");
      } catch (err) {
        this.error = err.response || "Login failed";
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #2f3142);
}
.login form {
  max-width: 350px;
  background: #fff;
  padding: 36px;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 1.5px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login input {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.2s;
  outline: none;
}

.login input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #6366f133;
}

.login form button {
  padding: 10px 40px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login button:hover {
  background: linear-gradient(90deg, #4f46e5 0%, #2563eb 100%);
}

.error {
  color: #ef4444;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 5px;
  padding: 8px 12px;
  margin-top: 18px;
  font-size: 15px;
  text-align: center;
}
</style>
