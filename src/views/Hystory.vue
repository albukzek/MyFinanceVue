<template>
 <div>


    <div class="history-chart">
        <canvas></canvas>
    </div>
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
        <HistoryTable :records="records"/>
    </section>
    </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
export default {
  name:'hyistory',
  data: () => ({
    loading: true,
    records: [],
    categories : []

  }),
  async mounted() {
    // мы передаем данные сразу в рекодс модели так как после каждой итерации шаблон будет обновляться
    // а через мап можено обработать массив и обновить модель единожды
    // this.records = await this.$store.dispatch('fetchRecords')
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName : this.categories.find(c => c.id === record.categoryId).title,
        typeClass : record.type === 'income' ? 'green' : 'red',
        typeText : record.type === 'income' ? 'Доход' : 'Расход'
      }
    })

    this.loading = false
  },
  components:{
    HistoryTable
  }
}
</script>
