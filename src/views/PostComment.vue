<template>
  <div>
    <h1>Laisser un commentaire</h1>
    <form @submit.prevent="submitComment">
      <div>
        <label for="content">Contenu:</label>
        <textarea id="content" v-model="comment.content"></textarea>
      </div>
      <input id="filmId" type="hidden" value="{{ filmId }}" />
      <button type="submit">Poster</button>
    </form>
  </div>
</template>

<script>
import commentService from "@/services/commentService.js";
export default {
  data() {
    return {
      comment: {
        content: null,
        filmId: null,
      },
    };
  },
  methods: {
    async getFilmId() {
      this.comment.filmId = this.$route.params.id;
    },
    // check post comment method
    submitComment() {
      commentService
        .createComment(this.comment)
        .then(() => this.$router.push({ path: "/films/" + this.comment.filmId }))
        .catch((error) => console.error(error));
    },
  },

  created() {
    this.getFilmId();
  },
};
</script>

<style>
</style>