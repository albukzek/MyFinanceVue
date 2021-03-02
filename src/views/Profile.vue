<template>
<div>
  <div class="page-title">
    <h3>{{'ProfileTitle'  | localize}} </h3>
  </div>

  <form class="form" @submit.prevent="submitHandler">
    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="nick"
          :class="{invalide: $v.nick.$dirty && !$v.nick.required}"


      >
      <label for="description">Имя</label>
      <small
            v-if="$v.nick.$dirty && !$v.nick.required"
            class="helper-text invalid">
            Введите имя
      </small>
    </div>

    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="isRuLocale">
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
import {mapGetters, mapActions} from "vuex"
export default {
  data: ()=>({
    nick: '',
    isRuLocale: true
  }),
  mounted(){
    this.nick = this.info.nick
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(()=>{
      M.updateTextFields()
    },0 )
  },
  validations: {
     nick: { required },
  },
  methods:{
    ...mapActions(['updateInfo']),
     async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
        await  this.updateInfo({
          nick: this.nick,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })

      } catch (e) {}

        }
  },
  computed:{
     ...mapGetters(['info'])
  }
}
</script>


