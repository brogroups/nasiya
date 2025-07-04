<template>
  <div class="header">
    <h2>Ustalar</h2>
    <button @click="showUstaModel = true" class="fetch-btn">
      Usta yaratish
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
            <button @click="paidRequest(user._id)">tolov</button>
          </td>
          <td>
            <button class="defa-btn" @click="showInfo(user)">Batafsil</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="no-data">Ma'lumotlar yo'q</div>
  </div>
  <UstaModel
    v-if="showUstaModel"
    @close="showUstaModel = false"
    @regetdata="fetchUsers"
  />
  <Batafsil v-if="showBatafsil" :user="batafsilUser" @close="showBatafsil = false"/>
</template>

<script>
import UstaModel from "./UstaModel.vue";
import api from "../../Utils/axios";
import Batafsil from '../../components/Batafsil/Batafsil.vue';

export default {
  components: {
    UstaModel,
    Batafsil,
  },
  data() {
    return {
      users: [],
      showUstaModel: false,
      paid: 0,
      showBatafsil: false,
      batafsilUser: {},
    };
  },
  methods: {
    showInfo(user) {
      this.showBatafsil = true;
      this.batafsilUser = user;
      console.log(user);
      
    },
    async fetchUsers() {
      try {
        const { data, status } = await api.get("/nasiya/get/usta");
        if (status === 200) {
          this.users = data.datas;
        }
      } catch (e) {
        this.users = [];
      }
    },
    async paidRequest(id) {
      try {
        const response = await api.post(`/paid/${id}`, {
          paid: this.paid || 0,
        });
        console.log(response);
        this.paid = 0;
        this.fetchUsers();
        alert("Tolov bo‘ldi");
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
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

.tr-box{
  display: flex;
  gap: 10px;
}
.defa-btn,
.tr-box>button{
  padding: 8px 20px;
  background: var(--accent);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.defa-btn:hover,
.tr-box>button:hover{
  background: var(--accent-hover);
}
.tr-box>input{
  background: none;
  color: #fff;
  outline: none;
  padding: 8px 10px;
  border: 1px solid  #ccc;
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
