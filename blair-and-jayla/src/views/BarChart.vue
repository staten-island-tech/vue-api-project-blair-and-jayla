<template>
  <div class="container">
    <Bar id= "my-chart-id" v-if="loaded" :options="chartOptions":data="chartData" />
  </div>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false

    try {
      const { userlist } = await fetch('/api/userlist')
      this.chartdata = userlist

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}

  // data() {
  //   return {
  //     chartData: {
  //       labels: [ '2022', '2024' ],
  //       datasets: [ { data: [40, 20, 12] } ]
  //     },
  //     chartOptions: {
  //       responsive: true
  //     }
  //   }
  // }
</script>