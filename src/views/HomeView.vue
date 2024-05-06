<template>
  <div class="container background">
    <h1>Bienvenu !</h1>
    <router-link to="/films"> accéder à la liste des films</router-link>
    <p>ou consulter les films par catégorie :</p>

      <div v-for="category in categories" :key="category.id">
        <router-link :to="`/category/${category.id}`">{{
          category.label
        }}</router-link>
      </div>

  </div>
</template>

<script>
import categoryService from "@/services/categoryService";
export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await categoryService.getCategories();
        this.categories = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
li{
  list-style-type: none;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>