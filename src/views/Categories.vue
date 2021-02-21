<template>
    <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <Loader v-if="loading"/>
    <div class="row" v-else>
      <CategoryCreate @created="addNewCategody" />

      <CategoryEdit
        :key="categories.length + updateCount"
        :categories="categories"
        @update="updateCategoryes"
        v-if="categories.length"
      />
      <p v-else class="center">Категорий нет</p>
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  data: ()=>({
    categories:[],
    loading: true,
    updateCount: 0
  }),
  name: 'categories',
  components:{
    CategoryCreate,
    CategoryEdit
  },
  methods:{
    addNewCategody(category){
      this.categories.push(category)
    },
    updateCategoryes(category){
      console.log('UpdateCategory Cotegoryes')
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  async mounted(){
   this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
