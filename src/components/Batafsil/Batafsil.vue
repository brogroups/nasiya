<template>
  <div class="batafsil">
    <div class="model-content">
      <h2>Batafsil ma'lumot</h2>
      <div class="user-info">
        <p><strong>Ism:</strong> {{ user.username }}</p>
        <p><strong>Telefon:</strong> {{ user.phone }}</p>
      </div>
      <table
        class="table scrollable"
        v-for="(item, index) in localUser
          ? localUser.purchases
          : user.purchases"
        :key="index"
      >
        <thead>
          <tr>
            <th>Mahsulot nomi</th>
            <th>Narxi</th>
            <th>Soni</th>
            <th>Umumiy narx</th>
            <th>To`lov</th>
            <th>Qarzdorlik</th>
            <th>To`lov qilish</th>
            <th>Tavar vaqt</th>
            <th>Tolov vaqt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in item.products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ formatSum(product.price) }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ formatSum(product.price * product.quantity) }}</td>
            <td>
              {{ formatSum(product.paid[0]?.price || 0) }}
            </td>
            <td>{{ formatSum(product.debt || 0) }}</td>
            <td class="tr-box">
              <input type="number" v-model="paid" />
              <button @click="paidRequest(user._id, item._id, product._id)">
                tolov
              </button>
            </td>
            <td>{{ formatDate(new Date(item.date)) }}</td>
            <td>
              {{
                product.paid[0]?.createdAt
                  ? formatDate(new Date(product.paid[0]?.createdAt))
                  : ""
              }}
            </td>
          </tr>
          <tr
            v-if="
              (localUser ? localUser.purchases : user.purchases)[0].products
                .length === 0
            "
          >
            <td colspan="4" class="text-center">Mahsulotlar mavjud emas</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">Jami:</td>
            <td>
              {{
                (localUser ? localUser.purchases : user.purchases).reduce(
                  (a, b) => a + b.totalQuantity,
                  0
                )
              }}
            </td>
            <td>
              {{
                (localUser ? localUser.purchases : user.purchases).reduce(
                  (a, b) => a + b.totalPrice,
                  0
                )
              }}
            </td>
            <td>
              {{
                (localUser ? localUser.purchases : user.purchases).reduce(
                  (a, b) => {
                    return (
                      a +
                      b.products.reduce((acc, item) => {
                        return (
                          acc +
                          item.paid.reduce(
                            (acc2, item2) => acc2 + item2?.price,
                            0
                          )
                        );
                      }, 0)
                    );
                  },
                  0
                )
              }}
            </td>
            <td>
              {{
                (localUser ? localUser.purchases : user.purchases).reduce(
                  (a, b) => a + b.totalDebt,
                  0
                )
              }}
            </td>
            <td colspan="4" class="tr-box">
              <input type="number" v-model="paid2" />
              <button @click="paidPurchase(user._id, item._id)">tolov</button>
            </td>
          </tr>
        </tfoot>
      </table>
      <button @click="close" class="send-btn">Yopish</button>
    </div>
  </div>
</template>
<script>
import api from "../../Utils/axios";

export default {
  name: "Batafsil",
  emits: ["close"],
  data() {
    return {
      show: false,
      paid: 0,
      paid2: 0,
      localUser: null,
    };
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    type: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    formatSum(value) {
      return new Intl.NumberFormat("uz-UZ").format(value);
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    },
    async paidRequest(id, purchaseId, productId) {
      try {
        await api.post(`/paid/${id}/${purchaseId}/${productId}`, {
          paid: this.paid || 0,
        });
        this.getPurchase(id);
        this.paid = 0;
        alert("Tolov bo‘ldi");
      } catch (e) {
        console.error(e);
      }
    },
    async getPurchase(id) {
      try {
        console.log(this.type);
        const { data, status } = await api.get(
          `/nasiya/get/${this.type}/${id}`
        );
        if (status === 200) {
          console.log("data", data);
          this.localUser = data[this.type];
        }
      } catch (e) {
        console.error(e);
      }
    },
    async paidPurchase(id, purchaseId) {
      try {
        await api.post(`/paid/${id}/${purchaseId}`, {
          paid: this.paid2 || 0,
        });
        this.getPurchase(id);
        this.paid2 = 0;
        alert("Tolov bo‘ldi");
      } catch (e) {
        console.error(e);
      }
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
.batafsil {
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
  width: 90%;
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
  padding: 15px 10px;
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
</style>
