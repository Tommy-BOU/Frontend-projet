<template>
  <div>
    <h1>Liste des films dans la catégorie "{{ category.label }}"</h1>
    <ul>
      <li v-for="film in films" :key="film.id">
        <h3>{{ film.title }}</h3>

        <p>réalisé par : {{ film.realisator }}</p>

        <h4>sorti en {{ film.releaseYear }}</h4>

        <p>{{ film.summary }}</p>

        <router-link :to="`/films/${film.id}`">Détails</router-link>

        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import filmService from "@/services/filmService";
import categoryService from "@/services/categoryService";
export default {
  data() {
    return {
      films: [],
      category: {},
    };
  },
  methods: {
    async fetchFilms() {
      try {
        const res = await filmService.getFilmsByCategory(this.$route.params.id);
        this.films = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchCategory() {
      try {
        const res = await categoryService.getCategory(this.$route.params.id);
        this.category = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },

  created() {
    this.fetchFilms();
    this.fetchCategory();
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
a {
  color: white;
  text-decoration: none;
  background-color: dodgerblue;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>