<template>
    <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row">
      <CategoryCreate @created="addNewCategody" />

      <CategoryEdit />

    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  data: ()=>({
    categories:[]
  }),
  name: 'categories',
  components:{
    CategoryCreate,
    CategoryEdit
  },
  methods:{
    addNewCategody(category){
      this.categories.push(category)
      console.log(this.categories)
    }
  }
}
</script>
