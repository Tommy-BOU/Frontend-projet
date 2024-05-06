<template>
  <div v-if="!toggle">
    <add-button
      @addEvent="
        toggle = !toggle;
        formType = 'add';
      "
    ></add-button>
    <table>
      <thead>
        <th>ID</th>
        <th>Titre</th>
        <th>Realisateur</th>
        <th>Année de sortie</th>
        <th>Synopsis</th>
        <th>Catégories</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="film in films" :key="film.id">
          <td>{{ film.id }}</td>
          <td>{{ film.title }}</td>
          <td>{{ film.realisator }}</td>
          <td>{{ film.releaseYear }}</td>
          <td>{{ film.summary }}</td>
          <td>
            <p v-for="data in film.filmCategories" :key="data.id">
              {{ data.category.label }}
            </p>
          </td>
          <td>
            <edit-button @modifyEvent="modify(film)"></edit-button>
            <delete-button @deleteEvent="deleteFilm(film.id)"></delete-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div v-else>
    <form class="crudForm" @submit.prevent="sendForm">
      <label for="title">Titre</label>
      <input type="text" id="title" v-model="film.title" />
      <label for="realisator">Realisateur</label>
      <input type="text" id="realisator" v-model="film.realisator" />
      <label for="releaseYear">Année de sortie</label>
      <input type="number" id="releaseYear" v-model="film.releaseYear" />
      <label for="summary">Synopsis</label>
      <textarea id="summary" v-model="film.summary"></textarea>
      <label for="filmCategories">Categories</label>
      <select id="filmCategories" v-model="film.filmCategories" multiple>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category"
        >
          {{ category.label }}
        </option>
      </select>
      <button type="submit">Enregistrer</button>
    </form>
    <button
      @click="
        toggle = !toggle;
        formType = '';
        filmId = 0;
        clearFilm();
      "
    >
      Retour
    </button>
  </div>
</template>

<script>
import FilmService from "@/services/filmService.js";
import CategoryService from "@/services/categoryService.js";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import AddButton from "@/components/AddButton.vue";

export default {
  components: { EditButton, DeleteButton, AddButton },
  data() {
    return {
      films: [],
      categories: [],
      toggle: false,
      formType: "",
      filmId: 0,
      film: {
        title: "",
        realisator: "",
        releaseYear: 0,
        summary: "",
        filmCategories: [],
      },
    };
  },
  methods: {
    async getFilms() {
      try {
        const res = await FilmService.getFilms();
        this.films = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getCategories() {
      try {
        const res = await CategoryService.getCategories();
        this.categories = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteFilm(id) {
      try {
        await FilmService.deleteFilm(id);
        this.getFilms();
      } catch (e) {
        console.log(e);
      }
    },
    modify(data) {
      this.filmId = data.id;
      this.film.title = data.title;
      this.film.realisator = data.realisator;
      this.film.releaseYear = data.releaseYear;
      this.film.summary = data.summary;
      this.film.filmCategories = data.filmCategories;
      this.toggle = !this.toggle;
      this.formType = "modify";
    },
    clearFilm() {
      this.film = {
        title: "",
        realisator: "",
        releaseYear: 0,
        summary: "",
        filmCategories: [],
      };
    },
    async updateFilm(id) {
      try {
        await FilmService.updateFilm(id, this.film);
        this.toggle = !this.toggle;
        this.getFilms();
        this.clearFilm();
      } catch (e) {
        console.log(e);
      }
    },
    async addFilm() {
      try {
        await FilmService.createFilm(this.film);
        this.toggle = !this.toggle;
        this.getFilms();
        this.clearFilm();
      } catch (e) {
        console.log(e);
      }
    },
    async sendForm() {
      if (this.formType === "modify") {
        this.updateFilm(this.filmId);
      } else if (this.formType === "add") {
        this.addFilm();
      }
    },
  },
  created() {
    this.getFilms();
    this.getCategories();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
tr {
  border: 1px solid black;
}
td {
  padding: 5px;
}
.crudForm {
  display: flex;
  flex-direction: column;
}
</style>