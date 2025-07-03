<template>
 <nav class="sidebar">
  <h2>Nasiya Savdo</h2>
  <ul>
   <li v-for="item in menu" :key="item.to" :class="{ active: activePage === item.to }" @click="setActive(item.to)">
    <span>{{ item.label }}</span>
   </li>
  </ul>


  <div class="sidebar-footer">
   <li class="logout-btn" @click="$emit('logout')">
    <span>Logout</span>
   </li>
   <p>© 2025 Nasiya Savdo</p>
  </div>
 </nav>
</template>

<script>
export default {
 name: "Sidebar",
 props: {
  activePage: {
   type: String,
   default: "/dashboard",
   validator: (value) => ["/dashboard", "/ustalar", "/mujozlar", "/daily", "/settings"].includes(value)
  }
 },
 data() {
  return {
   menu: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/ustalar", label: "Ustalar" },
    { to: "/mujozlar", label: "Mijozlar" },
    // { to: "/daily", label: "Daily" },
    { to: "/settings", label: "Settings" }
   ]
  };
 },
 methods: {
  setActive(page) {
   this.$emit('update:activePage', page);
  }
 }
};
</script>
<style scoped>
.sidebar {

 height: 100vh;
 padding-top: 30px;
 background-color: var(--secondary-bg);
 /* Dark sidebar background */
 box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
 /* Dark shadow */
 display: flex;
 flex-direction: column;
 justify-content: space-between;

}

.sidebar ul {
 display: flex;
 flex-direction: column;
 gap: 10px;
 height: 80%;
}

.sidebar li {
 padding: 0;
 cursor: pointer;
 color: var(--primary-text);
 list-style: none;
}

.sidebar-footer {
 display: flex;
 flex-direction: column;
 gap: 10px;
}

.sidebar li span {
 display: block;
 padding: 15px 25px;
 border-radius: 10px;
 transition: background 0.2s ease;
}

.sidebar li.active span,
.sidebar li:hover span {
 background: var(--accent);
 /* Highlight color from your palette */
 color: #1E1E2F;
 /* Dark text on light accent */
 font-weight: bold;
}
</style>
