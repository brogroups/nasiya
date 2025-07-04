<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    const token = localStorage.getItem("token");
    if (!token && this.$route?.name !== "Login") {
      this.$router.replace({ name: "Login" });
    } else if (token && this.$route?.name === "Login") {
      this.$router.replace({ name: "Home" });
    }
  },
  watch: {
    $route(to) {
      const token = localStorage.getItem("token");
      if (!token && to.name !== "Login") {
        this.$router.replace({ name: "Login" });
      } else if (token && to.name === "Login") {
        this.$router.replace({ name: "Home" });
      }
    },
  },
};
</script>
