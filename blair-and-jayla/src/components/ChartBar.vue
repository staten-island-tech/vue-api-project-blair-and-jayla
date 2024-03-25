<template>
   <div>
<BarChart data="ChartData"> </BarChart>
   </div>
</template>

<script>

import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

</script>

<style  scoped>

</style>