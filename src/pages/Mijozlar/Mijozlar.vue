<template>
  <div class="header">
    <h2>Mijozlar</h2>
    <button @click="showMijozModel = true" class="fetch-btn">
      Mijoz yaratish
    </button>
  </div>
  <div class="ustalar-page scrollable">
    <table v-if="users.length" class="users-table scrollable">
      <thead>
        <tr class="table-header">
          <th>#</th>
          <th>Ism</th>
          <th>Telefon</th>
          <th>Qarzdorlik</th>
          <th>Tolov qilish</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="user.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.totalDebt }}</td>
          <td class="tr-box">
            <input type="number" v-model="paid" />
            <button v-on:click="paidRequest(user._id)">tolov</button>
          </td>
          <td>
            <button class="defa-btn" @click="showInfo(user)">Batafsil</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="no-data">Ma'lumotlar yo'q</div>
  </div>
  <MijozModel
    v-if="showMijozModel"
    @close="(showMijozModel = false), fetchUsers()"
  />
  <Batafsil
    v-if="showBatafsil"
    :type="'klient'"
    :user="batafsilUser"
    @close="(showBatafsil = false), fetchUsers()"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import MijozModel from "./MijozModel.vue";
import api from "../../Utils/axios";
import Batafsil from "../../components/Batafsil/Batafsil.vue";
const users = ref([]);
const showMijozModel = ref(false);
const paid = ref(0);
let showBatafsil = ref(false);
let batafsilUser = ref({});
function showInfo(user) {
  showBatafsil.value = true;
  batafsilUser.value = user;
}
const fetchUsers = async () => {
  try {
    const res = await api.get("/nasiya/get/klient");
    users.value = res.data.datas;
  } catch (e) {
    users.value = [];
  }
};
const paidRequest = (id) => {
  api
    .post("/paid/" + id, { paid: paid.value || 0 })
    .then((res) => {
      console.log(res);
      paid.value = 0;
      fetchUsers();
      alert("Tolov boldi");
    })
    .catch((e) => console.error(e));
};

// Avtomatik yuklash
onMounted(fetchUsers);
</script>

<style scoped>
.ustalar-page {
  padding: 24px;
  background: var(--tablitsa-bg);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  height: 83vh;
}
.header {
  display: flex;
  justify-content: space-between;

  align-items: center;
  border-radius: 10px;
}
.fetch-btn {
  background: var(--accent);
  color: #000;
  border: none;
  padding: 10px 22px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.fetch-btn:hover {
  background: var(--accent-hover);
}
.users-table {
  width: 100%;
  height: auto;
  border-collapse: collapse;
  font-size: 16px;
  overflow-y: auto;
}
.users-table th,
.users-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.table-header {
  font-weight: 600;
  height: 60px;
  font-size: 18px;
  position: sticky;
  top: -25px;
  z-index: 10;
}

.tr-box {
  display: flex;
  gap: 10px;
}
.defa-btn,
.tr-box > button {
  padding: 8px 20px;
  background: var(--accent);

  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.defa-btn:hover,
.tr-box > button:hover {
  background: var(--accent-hover);
}
.tr-box > input {
  background: none;
  color: #fff;
  outline: none;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.users-table th {
  background: var(--tablitsa-bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top: 16px;
}
.no-data {
  text-align: center;
  color: #888;
  padding: 40px 0;
  font-size: 18px;
}
</style>
