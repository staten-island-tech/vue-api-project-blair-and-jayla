<template>
  <div id="app">
    <h1>NYC Payroll</h1>
    <cardData />
    <BarChart />
  </div>
</template>

<script>
import CardDisplay from './components/cardData.vue'
import BarChart from 'path/to/component/BarChart'

export default {
  name: 'App',

  components: 
  { BarChart }
  {
    CardDisplay
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/k397-673e.json')
        const data = await response.json()

        console.log('Data:', data)

        const firstItem = data[0]

        const fiscalYear = firstItem.fiscal_year
        const payrollNumber = firstItem.payroll_number
        const agencyName = firstItem.agency_name

        console.log('Fiscal Year:', fiscalYear)
        console.log('Payroll Number:', payrollNumber)
        console.log('Agency Name:', agencyName)

        this.firstItem = firstItem
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
};
console.log(fetchData)
</script>

<style scoped></style>
