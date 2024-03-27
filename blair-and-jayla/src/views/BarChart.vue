 <template>
  <div>
    <canvas ref="barChart"></canvas>
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
        // Handle error
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
      const ctx = this.$refs.barChart.getContext('2d');
      const labels = Object.keys(this.chartData);
      const boroughs = Object.keys(this.chartData[labels[0]]);
      const datasets = boroughs.map((borough, index) => ({
        label: borough,
        data: labels.map(label => this.chartData[label][borough] || 0),
        backgroundColor: this.getCustomColor(index), // Use custom color for each dataset
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }));
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Salary Ranges'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Employees'
              }
            }
          }
        }
      });
    },
    getCustomColor(index) {
      // Define an array of custom colors
      const customColors = [
        '#FFE5EC', 
        '#C9E4DE', 
        '#C6DEF1', 
        '#DEDAF4', 
        '#FAEDCB', 
      ];
      // Return the custom color based on the index
      return customColors[index % customColors.length];
    }
  }
};
</script>
