<template>
  <form class="card auth-card" @submit.prevent="subitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
            <input
                id="email"
                type="text"
               v-model.trim="email"
               :class="{invalide: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && $v.email.email )}"
            >
            <label for="email">Email</label>
            <small
                v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid">
            Поле email не должно быть пустым</small>
            <small
                v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid">
            Введите корректный email</small>
            </div>
    <div class="input-field">
            <input
                id="password"
                type="password"
                v-model.trim="password"
                 :class="{invalide: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && $v.password.minLength )}"
            >
            <label for="password">Пароль</label>
            <small
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required">
            Поле пароль не должно быть пустым</small>
            <small
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength">
            Пароль должен быть не меньше {{$v.password.$params.minLength.min}} символов/ Сейчас он состоит из {{password.length}} символов </small>
            </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="nick"
          :class="{invalid: $v.password.$dirty && !$v.password.required}"
      >
      <label for="name">Имя</label>
      <small
         class="helper-text invalid"
         v-if="$v.nick.$dirty && !$v.nick.required">
      Введите ваше имя</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'register',
    data: () => ({
        email:'',
        password:'',
        nick:'',
        agree: false

    }),
    validations: {
        email: {  email, required  },
        password: {minLength: minLength(8), required},
        nick:{required},
        agree: {checked: v => v}

    },
    methods : {
     async subitHandler(){
        if (this.$v.$invalid){
          this.$v.$touch()
          return
        }

        const formData = {
          email: this.email,
          password : this.password,
          nick : this.nick

        }

        try{
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        } catch(e) {
          console.log('AIIIUIIKA')
        }



      }

    }
}
</script>
