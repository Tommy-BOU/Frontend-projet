<template>
  <span v-if="hasRoles">
    <div class="adminNav" v-if="userRoles.includes('ROLE_ADMIN')">
      <h1>Back office</h1>
      <div>
        <router-link to="/film/crud">Gérer les films</router-link> |
        <router-link to="/category/crud">Gérer les catégories</router-link> |
        <router-link to="/user/crud">Gérer les utilisateurs</router-link> |
        <router-link to="/comment/crud">Gérer les commentaires</router-link>
      </div>
    </div>
  </span>

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/films">Films</router-link>
    <span v-if="!isLoggedIn">
      |
      <router-link to="/register">Inscription</router-link> |
      <router-link to="/login">Connection</router-link>
    </span>
    <span v-else>
      |
      <button @click="logout">Déconnection</button>
      <p>Bonjour, {{ userName }}</p>
      <span v-if="userRoles.includes('BANNED')" style="color: red">ATTENTION : Votre compte est bannis, vous ne pouvez plus voter ni laisser de commentaires</span>
    </span>
  </nav>
  <router-view />
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["userName", "isLoggedIn", "userRoles", "hasRoles"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logout() {
      this.logoutUser();
      this.$router.push("/login");
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

nav button {
  font-weight: bold;
  color: #2c3e50;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1em;
}

.adminNav {
  color: white;
  background-color: dodgerblue;
  width: 100%;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}

.adminNav a {
  color: white;
  text-decoration: none;
}
</style>
