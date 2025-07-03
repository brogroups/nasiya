<template>
  <div class="settings-page">
    <h2>Sozlamalar</h2>
    <div class="profile-info">
      <p><strong>Profil turi:</strong> {{ userProfileType }}</p>
      <p><strong>Login:</strong> {{ userLogin }}</p>
    </div>

    <form @submit.prevent="changePassword">
      <h3>Parolni o'zgartirish</h3>
      <div>
        <label for="currentPassword">Joriy parol</label>
        <input type="password" v-model="currentPassword" id="currentPassword" required />
      </div>
      <div>
        <label for="newPassword">Yangi parol</label>
        <input type="password" v-model="newPassword" id="newPassword" required />
      </div>
      <div>
        <label for="confirmPassword">Yangi parolni tasdiqlang</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
      </div>
      <button type="submit">Parolni o'zgartirish</button>
      <p
        v-if="passwordMessage"
        :class="{ error: passwordError, success: !passwordError }"
      >
        {{ passwordMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Bu yerda user ma'lumotlarini olish uchun o'zingizning auth/store yoki API chaqiruvingizdan foydalaning
// Misol uchun:
const user = ref({
  profileType: "Admin", // yoki 'User', 'Moderator', va hokazo
  login: "user@example.com",
});

const userProfileType = computed(() => user.value.profileType);
const userLogin = computed(() => user.value.login);

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const passwordMessage = ref("");
const passwordError = ref(false);

function changePassword() {
  passwordMessage.value = "";
  passwordError.value = false;

  if (newPassword.value !== confirmPassword.value) {
    passwordMessage.value = "Yangi parollar mos emas!";
    passwordError.value = true;
    return;
  }
  if (newPassword.value.length < 6) {
    passwordMessage.value = "Parol kamida 6 ta belgidan iborat bo'lishi kerak.";
    passwordError.value = true;
    return;
  }

  // Parolni o'zgartirish uchun API chaqiruvi (mock)
  // await api.changePassword({ currentPassword: currentPassword.value, newPassword: newPassword.value })
  setTimeout(() => {
    passwordMessage.value = "Parol muvaffaqiyatli o'zgartirildi!";
    passwordError.value = false;
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  }, 1000);
}
</script>

<style scoped>
.settings-page {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  color: var(--primary-text);
  width: 100%;
  height: 100%;
}

h2 {
  margin-bottom: 28px;
  color: var(--primary-text);
  letter-spacing: 1px;
}

.profile-info {
  margin-bottom: 28px;
  background: var(--secondary-bg);
  padding: 14px 18px;
  border-radius: 8px;
  font-size: 15px;
  color: var(--secondary-text);
}

.profile-info p {
  margin: 0 0 6px 0;
}

form > div {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--primary-text);
}

input {
  width: 100%;
  padding: 10px;
  border: 1.5px solid var(--border-color);
  border-radius: 5px;
  font-size: 15px;
  background: var(--secondary-bg);
  color: var(--primary-text);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 5px var(--accent);
}

button {
  width: 100%;
  padding: 12px 0;
  background: var(--accent);
  color: #1e1e2f;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

button:hover {
  background: var(--accent-hover);
  transform: scale(1.02);
}

.error {
  color: var(--danger);
  margin-top: 10px;
  text-align: center;
}

.success {
  color: var(--success);
  margin-top: 10px;
  text-align: center;
}
</style>
