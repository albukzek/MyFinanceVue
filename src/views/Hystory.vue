<template>
 <div>
    <div class="history-chart">
        <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      {{'History_NotNote' | localize}}
    <router-link to="/record">{{'History_AddNewNote' | localize}}</router-link>
    </p>

    <section v-else>
        <HistoryTable :records="items"/>

        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHadler"
          :prev-text="'Back' | localize"
          :next-text="'Forward' | localize"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />
    </section>
    </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixim'
import {Pie} from 'vue-chartjs'
import localizeFilter from '@/filter/localize.filter'
export default {
  name:'hyistory',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
    metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  async mounted() {
    // мы передаем данные сразу в рекодс модели так как после каждой итерации шаблон будет обновляться
    // а через мап можено обработать массив и обновить модель единожды
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
   methods:{
    setup(categories){
      this.setupPaginations(this.records.map(record => {
      return {
        ...record,
        categoryName : categories.find(c => c.id === record.categoryId).title,
        typeClass : record.type === 'income' ? 'green' : 'red',
        typeText : record.type === 'income'
        ? localizeFilter('Record_Income')
        : localizeFilter('Record_Outcome')
      }
    }))
    this.renderChart({
        labels:  categories.map(c => c.title),
        datasets: [{
            label: 'Расход по категориям',
            data: categories.map(c => {
              return this.records.reduce((total, r)=>{
                if (r.categoryId === c.id && r.type === 'outcome'){
                  total += +r.amount
                }
                return total
              },0)
            }),

            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
    }
  },
  components:{
    HistoryTable
  }
}
</script>
