<template>
  <div id="app">
    <h1>NYC Payroll</h1>
    <cardData />
    <BarChart />
    <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</div>



</template>

<script>
import cardData from './components/cardData.vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)




export default {
  name: 'App',

  components: {
    cardData
  },

  data() {
    return {
      data: [],
      firstItem: {}
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/k397-673e.json');
        const data = await response.json();

        console.log('Data:', data);

        const firstItem = data[0];

        const fiscalYear = firstItem.fiscal_year;
        const agencyName = firstItem.agency_name;

        console.log('Fiscal Year:', fiscalYear);
        console.log('Payroll Number:', payrollNumber);
        console.log('Agency Name:', agencyName);

        this.firstItem = firstItem;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};


</script>
