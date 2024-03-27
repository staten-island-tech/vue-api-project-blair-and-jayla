<template>
    <div>
      <canvas ref="radarChart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        chartData: null,
        salaryRanges: [
          { label: 'Less than $20,000', min: 0, max: 20000 },
          { label: '$20,000 - $40,000', min: 20000, max: 40000 },
          { label: '$40,000 - $60,000', min: 40000, max: 60000 },
          { label: '$60,000 - $80,000', min: 60000, max: 80000 },
          { label: '$80,000 - $100,000', min: 80000, max: 100000 },
          { label: 'More than $100,000', min: 100000, max: Infinity }
        ]
      };
    },
    mounted() {
      this.fetchChartData();
    },
    methods: {
      async fetchChartData() {
        try {
          const response = await fetch('https://data.cityofnewyork.us/resource/k397-673e.json');
          const data = await response.json();
          this.chartData = this.processData(data);
          this.renderChart();
        } catch (error) {
          console.error('Error fetching chart data:', error);
  
        }
      },
      processData(data) {
        const processedData = {};
        data.forEach(item => {
          const borough = item.work_location_borough;
          const salary = parseFloat(item.regular_gross_paid);
          const range = this.salaryRanges.find(range => salary >= range.min && salary < range.max);
          if (range) {
            if (!processedData[range.label]) {
              processedData[range.label] = {};
            }
            if (!processedData[range.label][borough]) {
              processedData[range.label][borough] = 0;
            }
            processedData[range.label][borough]++;
          }
        });
        return processedData;
      },
      renderChart() {
        if (!this.chartData) {
          return;
        }
        const ctx = this.$refs.radarChart.getContext('2d');
        const labels = Object.keys(this.chartData);
        const datasets = Object.entries(this.chartData).map(([label, data]) => ({
          label: label,
          data: Object.values(data),
          backgroundColor: this.getCustomColor(),
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true
        }));
        new Chart(ctx, {
          type: 'radar',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            scales: {
              r: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Employees'
                }
              }
            }
          }
        });
      },
      getCustomColor() {
  
        const customColors = [
          '#FFE5EC', 
          '#C9E4DE', 
          '#C6DEF1', 
          '#DEDAF4', 
          '#FAEDCB', 
        ];
  
        return customColors[Math.floor(Math.random() * customColors.length)];
      }
    }
  };
  </script>