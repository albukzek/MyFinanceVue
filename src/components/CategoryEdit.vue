<template>
  <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{"Edit" | localize}}</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field" >
              <select ref="select" v-model="current">
                <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{cat.title}}
                </option>
              </select>
              <label>{{"Record_SelectCategory" | localize}}</label>
            </div>

            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
              >
              <label for="name">{{"CC_Desc" | localize}}</label>
              <span
                v-if="$v.title.$dirty && !$v.title.required"
                class="helper-text invalid">
              {{"CC_InputNameCat" | localize}}
              </span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: $v.title.$dirty && !$v.title.minValue}"

              >
              <label for="limit">{{"CC_Limit"| localize}}</label>
              <span
                v-if="$v.limit.$dirty && !$v.limit.minValue"
                class="helper-text invalid">
              {{"Record_MinValue"|localize}} {{$v.limit.$params.minValue.min  }}
              </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              {{"Update" | localize}}
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from '@/filter/localize.filter'

export default {
  watch:{
    current(catId){
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created(){
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  props:{
    categories:{
      type:Array,
      required: true,
    }
  },

  data:()=>({
    select:null,
    title:'',
    limit:100,
    current: null
  }),
  mounted(){
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  destroyed(){
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('Category_HasBeenUpdated'))
        this.$emit("update",categoryData)
      } catch(e){
      }
    }
  }
}
</script>
