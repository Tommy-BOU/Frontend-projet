<template>
  <div>
    <h1>Liste des films</h1>
    <ul>
      <li v-for="film in films" :key="film.id">
        <h3>{{ film.title }}</h3>

        <p>réalisé par : {{ film.realisator }}</p>

        <h4>sorti en {{ film.releaseYear }}</h4>

        <p>{{ film.summary }}</p>

        <div>
          genres :
          <p v-for="data in film.filmCategories" :key="data.id">
            {{ data.category.label }}
          </p>
        </div>

        <router-link :to="`/films/${film.id}`">Détails</router-link>

        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import filmService from "@/services/filmService";
export default {
  data() {
    return {
      films: [],
    };
  },
  methods: {
    async fetchFilms() {
      try {
        const res = await filmService.getFilms();
        this.films = JSON.parse(res.data);
        // this.films = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    // createPost() {
    //   this.$router.push({ name: "createPost" });
    // },
    // viewDetails(id) {
    //   this.$router.push({ name: "postsDetail", params: { id } });
    // },
    // editPost(id) {
    //   this.$router.push({ name: "updatePost", params: { id } });
    // },
    // deletePost(id) {
    //   postService
    //     .deletePost(id)
    //     .then(() => this.fetchPosts())
    //     .catch((error) => console.error(error));
    // },
  },
  created() {
    this.fetchFilms();
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