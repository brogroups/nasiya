<template>
  <div class="usta-model-modal" @mousedown.self="closeModal" v-show="show">
    <div class="usta-model-form">
      <div class="header">
        <h2>Mijoz Ma'lumotlari</h2>
        <p class="close-btn" @click="closeModal">X</p>
      </div>
      <div class="form-top">
        <div class="form-group">
          <label for="name">Ism</label>
          <input type="text" id="name" v-model="usta.name" required />
        </div>
        <div class="form-group">
          <label for="phone">Telefon raqami</label>
          <input type="tel" id="phone" v-model="usta.phone" required />
        </div>
      </div>
      <form @submit.prevent="addProduct">
        <div class="form-product">
          <label>Mahsulot nomi</label>
          <input type="text" v-model="product.name" required />
        </div>
        <div class="form-product">
          <label>Narxi</label>
          <input type="number" v-model="product.price" required />
        </div>
        <div class="form-product">
          <label>Soni</label>
          <input type="number" v-model="product.quantity" required />
        </div>
        <div class="form-product">
          <!-- <label>&nbsp;</label> -->
          <button type="submit" class="save-btn">Mahsulot qo‘shish</button>
        </div>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th>Mahsulot nomi</th>
            <th>Narxi</th>
            <th>Soni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="3" class="text-center">Mahsulotlar mavjud emas</td>
          </tr>
        </tbody>
      </table>

      <div class="buttonbox">
        <button type="button" class="cancel-btn" @click="closeModal">
          Bekor qilish
        </button>
        <button type="button" class="save-btn" @click="saveUsta">
          Ustani saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../Utils/axios";

export default {
  name: "MijozModel",
  emits: ["close"],
  data() {
    return {
      show: false,
      usta: {
        name: "",
        phone: "",
      },
      product: {
        name: "",
        price: "",
        quantity: "",
      },
      products: [],
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addProduct() {
      if (this.product.name && this.product.price && this.product.quantity) {
        this.products.push({ ...this.product });
        this.product.name = "";
        this.product.price = "";
        this.product.quantity = "";
      } else {
        alert("Iltimos, barcha mahsulot maydonlarini to‘ldiring.");
      }
    },
    async saveUsta() {
      if (this.usta.name && this.usta.phone) {
        const ustaData = {
          ...this.usta,
          products: [...this.products],
        };
        console.log("Usta ma'lumotlari:", ustaData);
        try {
          const { data, status } = await api.post("/nasiya/create/klient", {
            username: ustaData.name,
            phone: ustaData.phone,
            products: ustaData.products,
          });
          if (status === 201) {
            console.log(data);
            this.show = false;
            this.$emit("regetdata");
            alert("Usta va mahsulotlar muvaffaqiyatli saqlandi!");
          }
        } catch (error) {
          alert(error.message);
          console.error(error);
        }
      } else {
        alert("Iltimos, usta haqida barcha maydonlarni to‘ldiring.");
      }
    },
  },
};
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
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}
.form-top{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.form-group {
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-product {
  width: 23%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.form-product > button {
  margin-top: 28px;
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
.table {
  width: 100%;
  height: auto;
  border-collapse: collapse;
  margin-top: 20px;
}
.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.table th {
  background-color: var(--secondary-bg);
  color: var(--primary-text);
}
.table td {
  background-color: var(--primary-bg);
  color: var(--primary-text);
}
.table tr:nth-child(even) {
  background-color: var(--secondary-bg);
}
.table tr:hover {
  background-color: var(--hover-bg);
}
.table th {
  font-weight: 600;
  font-size: 16px;
}
.table td {
  font-size: 14px;
}
.table tr {
  transition: background-color 0.3s ease;
}
.table tr:hover {
  background-color: var(--hover-bg);
}
</style>
