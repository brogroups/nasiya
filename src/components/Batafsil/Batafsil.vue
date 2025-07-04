<template >
 <div class="batafsil">
  <div class="model-content">
   <h2>Batafsil ma'lumot</h2>
   <div class="user-info">
    <p><strong>Ism:</strong> {{ user.username }}</p>
    <p><strong>Telefon:</strong> {{ user.phone }}</p>
    <p><strong>Qarz:</strong> {{ formatSum(user.purchases[0].totalQuantity) }}</p>
   </div>
   <table class="table scrollable">
    <thead>
     <tr>
      <th>Mahsulot nomi</th>
      <th>Narxi</th>
      <th>Soni</th>
      <th>Umumiy narx</th>
     </tr>
    </thead>
    <tbody>
     <tr v-for="(item, index) in user.purchases[0].products" :key="index">
      <td>{{ item.name }}</td>
      <td>{{ formatSum(item.price) }}</td>
      <td>{{ item.quantity }}</td>
      <td>{{ formatSum(item.price * item.quantity) }}</td>
     </tr>
     <tr v-if="user.purchases[0].products.length === 0">
      <td colspan="4" class="text-center">Mahsulotlar mavjud emas</td>
     </tr>
    </tbody>
    
   </table>
   <button @click="close" class="send-btn">Yopish</button>
  </div>
 </div>
</template>
<script>
export default {
 name: "Batafsil",
 emits: ["close"],
 data() {
  return {
   show: false,
  };
 },
 props: {
  user: {
   type: Object,
   default: () => ({}),
  },
 },
 methods: {
  close() {
   this.$emit("close");
  },
  formatSum(value) {
   return new Intl.NumberFormat("uz-UZ").format(value);
  },
 },
 mounted() {
  console.log("Mounted Batafsil component with user:", this.user);
  
  this.$nextTick(() => {
   this.$el.addEventListener("click", (e) => {
    if (e.target === this.$el) {
     this.close();
    }
   });
  });
 },
};
</script>
<style scoped>
.batafsil{
 width: 100%;
 height: 100%;
 position: fixed;
 display: flex;
 top: 0;
 right: 0;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 background-color: #f0f0f03d;
 z-index: 99;
}
.model-content {
 width: 60%;
 height: 80%;
 background: var(--modal-bg, #242637);
 padding: 24px;
 border-radius: 8px;
 box-shadow: 0 4px 12px var(--modal-shadow, rgba(0, 0, 0, 0.4));
 color: var(--primary-text);
 overflow-y: auto;
}
table {
 width: 100%;
 height: auto;
 border-collapse: collapse;
 margin-top: 20px;
}
tr > th,
tr > td {
 padding: 15px 10px;;
}
</style>