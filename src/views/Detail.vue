<template>
  <div>
 <Loader v-if="loading"/>
 <div v-else-if="record">
        <div class="breadcrumb-wrap" >
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
            {{record.type === 'income' ? 'Доход' : 'Расход'}}
        </a>
        </div>
        <div class="row">
        <div class="col s12 m6">
            <div class="card" :class="record.type === 'income' ? 'green':'red'">
            <div class="card-content white-text">
                <p>Описание: {{record.description}}</p>
                <p>Сумма: {{record.amount | currency}}</p>
                <p>Категория: {{record.categoryName}}</p>

                <small>{{record.date}}</small>
            </div>
            </div>
        </div>
        </div>
  </div>
  <p class="center" v-else>Записи с id = {{ $route.params.id }} не найдено</p>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
export default {
  components: { Loader },
  name:'detail',
  data:()=>({
    record: null,
    loading: true
  }),
  async mounted(){
    const id = this.$route.params.id //последне свойство соответствиет описанию роута в ротере /details/:ID
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName : category.title
    }

    this.loading = false
  }
}
</script>
