<template>
  <div class="dashboard scrollable">
    <h1>Dashboard</h1>

    <div class="stats">
      <div class="stat-card" v-for="(value, key) in today" :key="'today-' + key">
        <h2>{{ value }}</h2>
        <p>Bugun: {{ key }}</p>
      </div>
    </div>

    <div class="stats">
      <div
        class="stat-card"
        v-for="(value, key) in total"
        :key="'total-' + key"
      >
        <h2 v-if="typeof value === 'number'">{{ value }}</h2>
        <div v-else>
          <p v-for="(v, k) in value" :key="k">
            <strong>{{ k }}:</strong> {{ v }}
          </p>
        </div>
        <p>Jami: {{ key }}</p>
      </div>
    </div>

    <div class="recent">
      <h3>So‘nggi faoliyat</h3>
      <table  v-if="recentActivities.length">
        <thead>
          <tr>
       <th>Client Name</th>
       <th>Quantity</th>
       <th>Price</th>
       <th>Date</th>
       <th>Info</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, idx) in recentActivities" :key="idx">
       <td>{{ idx }}</td>
       <td>{{ activity.quantity }}</td>
       <td>{{ activity.price }}</td>
       <td>{{ activity.date }}</td>
       <td>{{ activity.info }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        So‘nggi faoliyatlar mavjud emas.
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from '../../Utils/axios.js';

export default {
  data() {
    return {
      today: {},
      total: {},
      recentActivities: []
    };
  },
  methods: {
    async fetchStatistics() {
      try {
        const res = await axios.get('/statistic');
       console.log(res.data);
       
        this.today = res.data.statistic.today || {};
        this.total = res.data.statistic.total || {};
        this.recentActivities = res.data.statistic.recentActivities || this.recentActivities;
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    }
  },
  mounted() {
    this.fetchStatistics();
  }
};
</script>

<style scoped>
.dashboard {
 width: 100%;
  padding: 32px;
  background-color: var(--primary-bg);
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: var(--primary-text);
  margin-bottom: 24px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  flex: 1 1 200px;
  text-align: center;
  color: var(--primary-text);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.stat-card p {
  margin-top: 8px;
  color: var(--secondary-text);
}

.recent {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  color: var(--primary-text);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.recent ul {
  margin-top: 10px;
}

.recent li {
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}
.recent table {
 width: 100%;
 border-collapse: collapse;
 margin-top: 16px;
 background: var(--primary-bg);
}

.recent th,
.recent td {
 padding: 12px 8px;
 text-align: left;
 border-bottom: 1px solid var(--border-color);
 color: var(--primary-text);
}

.recent th {
 background: var(--card-bg);
 font-weight: bold;
}

.recent tr:hover {
 background: var(--hover-bg);
 cursor: pointer;
}
</style>
