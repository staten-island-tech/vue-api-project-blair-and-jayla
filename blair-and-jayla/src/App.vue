<template>
  <div id="app">
    <h1>NYC Payroll</h1>
    <cardData />
    <RadarChart />
    <BarChart />
    <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</div>



</template>

<script>
import cardData from './components/cardData.vue';
import RadarChart from './components/RadarChart.vue';
import BarChart from './components/BarChart.vue';




export default {
  name: 'App', 

  components: {
    cardData,
    BarChart,
    RadarChart
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
        this.data = data;
        this.dataLoaded
        console.log('Data:', data);

      //   const firstItem = data[0];

      //   const fiscalYear = firstItem.fiscal_year;
      //   const agencyName = firstItem.agency_name;

      //   console.log('Fiscal Year:', fiscalYear);
      //   console.log('Payroll Number:', payrollNumber);
      //   console.log('Agency Name:', agencyName);

      //   this.firstItem = firstItem;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};


</script>
