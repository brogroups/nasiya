<template>
 <div class="home-container">
  <Sidebar :activePage="activePage" class="sidebar" @update:activePage="setActivePage" />
  <div class="main-content">
   <Dashboard :activePage="activePage" v-if="activePage === '/dashboard'" />
   <Ustalar v-if="activePage === '/ustalar'" />
   <Mijozlar v-if="activePage === '/mujozlar'" />
   <Settings v-if="activePage === '/settings'" />
  </div>
 </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Dashboard from '../pages/Dashboard/Dashboard.vue'
import Ustalar from '../pages/Ustalar/Ustalar.vue'
import Mijozlar from '../pages/Mijozlar/Mijozlar.vue'
import Settings from '../pages/Settings/Settings.vue'
import { ref } from 'vue'
const activePage = ref('/dashboard')
function setActivePage(page) {
  activePage.value = page
}

</script>

<style scoped>
.home-container {
 display: flex;
 width: 100%;
 min-height: 100vh;
}
.sidebar {
 width: 13%;
 min-width: 300px;
 height: 100vh;
 padding-top: 30px;
 box-shadow: 2px 0 8px rgba(0,0,0,0.05);
}
.main-content {
 width: 87%;
 flex: 1;
 padding: 24px;
  background: var(--primary-dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>