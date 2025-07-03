<template>
  <div class="usta-model-modal" @mousedown.self="closeModal" v-show="show">
    <div class="usta-model-form">
      <div class="header">
        <h2>Usta Ma'lumotlari</h2>
        <p class="close-btn" @click="closeModal">X</p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Ism</label>
          <input type="text" id="name" v-model="usta.name" required />
        </div>
        <div class="form-group">
          <label for="phone">Telefon raqami</label>
          <input type="tel" id="phone" v-model="usta.phone" required />
        </div>
        <div class="form-group">
          <label for="specialty">Mutaxassisligi</label>
          <input type="text" id="specialty" v-model="usta.specialty" required />
        </div>
        <div class="form-group">
          <label for="address">Manzili</label>
          <input type="text" id="address" v-model="usta.address" />
        </div>
        <div class="buttonbox">
          <button type="button" class="cancel-btn" @click="closeModal">
            Bekor qilish
          </button>
          <button type="submit" class="save-btn">Saqlash</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick, onMounted } from "vue";

const emit = defineEmits(["close"]);

const usta = reactive({
  name: "",
  phone: "",
  specialty: "",
  address: "",
});

function submitForm() {
  alert("Usta ma'lumotlari saqlandi:\n" + JSON.stringify(usta, null, 2));
}

function closeModal() {
  emit("close");
}

const show = ref(false);
onMounted(() => {
  nextTick(() => {
    show.value = true;
  });
});
</script>

<style scoped>
.usta-model-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--modal-overlay, rgba(0, 0, 0, 0.7));
  z-index: 1000;
}

.usta-model-form {
  width: 60%;
  height: 100%;
  background: var(--modal-bg, #242637);
  padding: 24px;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 4px 12px var(--modal-shadow, rgba(0, 0, 0, 0.4));
  color: var(--primary-text);
  animation: slideInRight 0.4s ease forwards;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-bg);
  border: 1px solid var(--border-color);
  color: var(--primary-text);
  border-radius: 4px;
}

.buttonbox {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.save-btn {
  background: var(--accent);
  color: #1e1e2f;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
.save-btn:hover {
  background: var(--accent-hover);
}

.cancel-btn {
  background: var(--danger);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
.cancel-btn:hover {
  background: #b91c1c;
}

.close-btn {
  cursor: pointer;
  font-size: 20px;
  color: var(--danger);
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
