<template>
  <div id="app">
    <h1>NYC Payroll</h1>
    <nav>
      <RouterLink to="/">HOME</RouterLink> <br>
      <RouterLink to="/about">SALARY RANGES AND AMOUNT OF EMPLOYEES IN EACH RANGE BASED ON BOROUGH</RouterLink> <br>
      <RouterLink to="/p">A DIFFERENT VISUAL</RouterLink> <br>

    </nav>

    <div class="container">

  </div>
</div>

<RouterView />

</template>

<script>

import { RouterLink, RouterView } from 'vue-router';





export default {
  name: 'App', 


  data() {
    return {
      data: [],
      firstItem: {},
      loaded: false,
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
