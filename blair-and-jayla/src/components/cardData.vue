<template>
  <div>
    <div v-for="(person, index) in data" :key="index" class="card">
      <div class="card-body">
        <h2>{{ person.first_name }} {{ person.last_name }}</h2>
        <p>Fiscal Year: {{ person.fiscal_year }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/k397-673e.json')
      const jsonData = await response.json()
      this.data = jsonData
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}
</script>

<style scoped>

.container {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.card {
  flex: 0 0 auto;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.card-body {
  padding: 20px;
}

h2 {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
}

p {
  margin: 0;
  font-size: 1em;
  color: #666;
}


</style>
