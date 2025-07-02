<template>
 <div class="dashboard">
  <h1>Dashboard</h1>
  <div class="stats">
   <div class="stat-card">
    <h2>{{ users }}</h2>
    <p>Foydalanuvchilar</p>
   </div>
   <div class="stat-card">
    <h2>{{ sales }}</h2>
    <p>Sotuvlar</p>
   </div>
   <div class="stat-card">
    <h2>{{ revenue }} so'm</h2>
    <p>Daromad</p>
   </div>
  </div>
  <div class="recent">
   <h3>So‘nggi faoliyat</h3>
   <ul>
    <li v-for="(item, idx) in recentActivities" :key="idx">
     {{ item }}
    </li>
   </ul>
  </div>
 </div>
</template>

<script>
export default {
 data() {
  return {
   users: 120,
   sales: 45,
   revenue: 1500000,
   recentActivities: [
    "Yangi foydalanuvchi qo'shildi",
    "Sotuv amalga oshirildi",
    "Hisobot yangilandi"
   ]
  }
 }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  padding: 32px;
  background-color: var(--primary-bg);
}

h1 {
  font-size: 2rem;
  color: var(--primary-text);
  margin-bottom: 24px;
}

.stats {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  flex: 1;
  text-align: center;
  color: var(--primary-text);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.recent {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  color: var(--primary-text);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
</style>
