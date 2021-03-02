<template>
<div>
  <div class="page-title">
    <h3>Профиль</h3>
  </div>

  <form class="form" @submit.prevent="submitHandler">
    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalide: $v.name.$dirty && !$v.name.required}"


      >
      <label for="description">Имя</label>
      <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid">
            Введите имя
      </small>
    </div>

    <div class="switch">
      <label>
        English
        <input type="checkbox">
        <span class="lever"></span>
        Русский
      </label>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Обновить
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<style scoped>
 .switch {
   margin-bottom: 1rem;
 }
</style>

<script>
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from "vuex"
export default {
  data: ()=>({
    name: ''
  }),
  mounted(){
    this.name = this.info.name
    setTimeout(()=>{
      M.updateTextFields()
    },0 )
  },
  validations: {
     name: { required  },
  },
  methods:{
     async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{

      } catch (e) {}

        }
  },
  computed:{
    ...mapGetters(['info'])
  }
}
</script>


