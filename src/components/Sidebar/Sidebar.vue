<template>
 <nav class="sidebar">
 <ul>
  <li
    v-for="item in menu"
    :key="item.to"
    :class="{ active: activePage === item.to }"
    @click="setActive(item.to)"
  >
    <span>{{ item.label }}</span>
  </li>
 </ul>
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
  { to: "/mujozlar", label: "Mujozlar" },
  { to: "/daily", label: "Daily" },
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
  background-color: var(--secondary-bg); /* Dark sidebar background */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2); /* Dark shadow */
}

.sidebar ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar li {
  padding: 0;
  cursor: pointer;
  color: var(--primary-text);
}

.sidebar li span {
  display: block;
  padding: 15px 25px;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.sidebar li.active span,
.sidebar li:hover span {
  background: var(--accent); /* Highlight color from your palette */
  color: #1E1E2F; /* Dark text on light accent */
  font-weight: bold;
}
</style>
