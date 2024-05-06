<template>
  <div>
    <h1>Inscription</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id='email' v-model="userData.email" required>
      </div>
      <div>
        <label for="userName">Nom d'utilisateur :</label>
        <input type="text" id='userName' v-model="userData.username" required>
      </div>
      <div>
        <label for="pwd">Mot de passe:</label>
       <input type="password" id='pwd' v-model="userData.password" required>
      </div>
      <button type='submit'>S'inscrire</button>
    </form>
  </div>
</template>

<script>
import userService from '@/services/userService';
export default {
  data(){
    return {
    userData:{}
    };
  },

  methods : {
    async register(){
      try{

        await userService.register(this.userData)
        console.log('Inscription réussie')
        this.$router.push('/login')
      }catch(e){
        console.error(e)
      }

    }
  }

}
</script>

<style>

</style>