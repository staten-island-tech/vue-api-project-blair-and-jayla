<template>
   <div>
<Bar id="mychart-id",
:options="chartOptions"
:data="chartData">
</Bar>
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
import { onMounted } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default  {
    name: 'BarChart',
    components: { Bar }, 
    props: {
    data: Array,
    labels: Array,
  },
    data(){
        return{
            chartData: {
                labels: this.labels,
                datasets: [ 
                    {
                        label: 'Salaries',
                        backgroundColor: '#00000',
                        data: this.data
                    }
                ]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}

</script>

// export default{
//    name: 'BarChart',
//    components: {'Bar'},
//    data() {
//       loaded: false,
//       chartData: null,
//       chartOptions: {
//          responsive: true,
//          plugins: {
//             display: true,
//             labels: {
//                color: white
//             }
//          }
//       }
//    },


//  methods: {
//   async onMounted(){
//    try{
//       let res = await fetch('https://data.cityofnewyork.us/resource/k397-673e.json')
//       let data = await res.json()
//       console.log(data)
//    }
// } 
//  }

</script>

<style  scoped>

</style>