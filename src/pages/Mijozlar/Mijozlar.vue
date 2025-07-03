<template>
 <div class="header">
 <h2>Mijozlar</h2>
  <button @click="showMijozModel = true" class="fetch-btn">Mijoz yaratish</button>
 </div>
 <div class="ustalar-page scrollable">
 <table v-if="users.length" class="users-table scrollable">
  <thead>
  <tr class="table-header">
   <th>#</th>
   <th>Ism</th>
   <th>Email</th>
   <th>Telefon</th>
   <th>Role</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(user, idx) in users" :key="user.id">
   <td>{{ idx + 1 }}</td>
   <td>{{ user.name }}</td>
   <td>{{ user.email }}</td>
   <td>{{ user.phone }}</td>
   <td>{{ user.role }}</td>
  </tr>
  </tbody>
 </table>
 <div v-else class="no-data">Ma'lumotlar yo'q</div>
 </div>
 <MijozModel v-if="showMijozModel" @close="showMijozModel = false"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MijozModel from './MijozModel.vue'
const users = ref([])
const showMijozModel = ref(false)

const fetchUsers = async () => {
 try {
  const res = await axios.get('/nasiya/get/usta')
  console.log(res)
  users.value = res
 } catch (e) {
  users.value = []
 }
}

// Avtomatik yuklash
onMounted(fetchUsers)
</script>

<style scoped>
.ustalar-page {
 padding: 24px;
 background: var(--tablitsa-bg);
 border-radius: 12px;
 box-shadow: 0 2px 12px rgba(0,0,0,0.07);
 height: 83vh;
}
.header {
 display: flex;
 justify-content: space-between;

 align-items: center;
 border-radius: 10px;
}
.fetch-btn {
 background:  var(--accent);
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
 height: 100vh;
 border-collapse: collapse;
 font-size: 16px;
 overflow-y: auto;
}
.users-table th, .users-table td {
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

.users-table th {
 background: var(--tablitsa-bg);
 box-shadow: 0 2px 12px rgba(0,0,0,0.05);
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