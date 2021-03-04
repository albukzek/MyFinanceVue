<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{"Login_HomeBuhgaltery" | localize }}</span>
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
            {{"Login_NotEmail" | localize}}</small>
            <small
                v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid">
            {{"Login_NotCorrectEmail" | localize}}</small>
            </div>
            <div class="input-field">
            <input
                id="password"
                type="password"
                v-model.trim="password"
                 :class="{invalide: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && $v.password.minLength )}"
            >
            <label for="password">{{"Login_Password" | localize}}</label>
            <small
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required">
            {{"Login_NotPassword" | localize}}</small>
            <small
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength">
            Пароль должен быть не меньше {{$v.password.$params.minLength.min}} символов/ Сейчас он состоит из {{password.length}} символов </small>
            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                {{"Login_Enter" | localize}}
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
            {{"Login_NotAccount" | localize}}
            <router-link to="/register">{{"Login_Register" | localize}}</router-link>
            </p>
        </div>
        </form>

</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
    name: 'login',
    data: () => ({
        email:'',
        password:''
    }),
    validations: {
        email: {  email, required  },
        password: {minLength: minLength(8), required}

    },
    mounted(){
        if(messages[this.$route.query.message]){
            this.$message(messages[this.$route.query.message])
        }

    },
      metaInfo() {
    return {
      title: this.$title('Login_HomeBuhgaltery')
    }
  },
    methods: {
         async submitHandler(){
            // console.log(this.$v.password)
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                email: this.email,
                password: this.password
            }

            try{

            await this.$store.dispatch('login', formData)
            // console.log(formData)
             this.$router.push('/')
            } catch (e) {}

        }
    }
}
</script>
