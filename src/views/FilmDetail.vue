<template>
  <div>
    <h1>{{ film.title }}</h1>
    <p>réalisé par {{ film.realisator }}</p>
    <h4>sorti en {{ film.releaseYear }}</h4>
    <p>{{ film.summary }}</p>
  </div>
  <div>
    genres :
    <p v-for="data in film.filmCategories" :key="data.id">
      {{ data.category.label }}
    </p>
  </div>
  <div>
    <span v-if="hasRoles && userRoles.includes('ROLE_USER')">
      <vote-button
        @event="getFilmVotes"
        :value="1"
        :entityId="film.id"
        :type="'film'"
      ></vote-button
    ></span>

    score : {{ votesValue }}

    <span v-if="hasRoles && userRoles.includes('ROLE_USER')">
      <vote-button
        @event="getFilmVotes"
        :value="-1"
        :entityId="film.id"
        :type="'film'"
      ></vote-button
    ></span>
  </div>
  <span v-if="hasRoles && userRoles.includes('ROLE_USER')">
    <router-link :to="`/comment/${film.id}`"
      >Laisser un commentaire</router-link
    >
  </span>

  <hr />
  <div v-for="comment in comments" :key="comment.id">
    <comment-template :data="comment"></comment-template>
  </div>
</template>

<script>
import filmService from "@/services/filmService";
import commentService from "@/services/commentService";
import VoteButton from "@/components/VoteButton.vue";
import voteService from "@/services/voteService";
import CommentTemplate from "@/components/CommentTemplate.vue";
import { mapGetters } from "vuex";

export default {
  components: { VoteButton, CommentTemplate },
  data() {
    return {
      film: {},
      comments: [],
      votesValue: 0,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userRoles", "hasRoles"]),
  },
  methods: {
    async fetchFilm() {
      try {
        const res = await filmService.getFilm(this.$route.params.id);
        const response = JSON.parse(res.data);
        this.film = response[0];
      } catch (e) {
        console.log(e);
      }
    },
    async fetchComments() {
      try {
        const res = await commentService.getCommentsByFilm(
          this.$route.params.id
        );
        this.comments = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getFilmVotes() {
      try {
        let voteCount = 0;
        const res = await voteService.getVotesByFilm(this.$route.params.id);
        const data = JSON.parse(res.data);
        data.forEach((element) => {
          voteCount += element.value;
        });
        this.votesValue = voteCount;
      } catch (e) {
        console.log(e);
      }
    },
  },

  created() {
    this.fetchFilm();
    this.fetchComments();
    this.getFilmVotes();
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
  background-color: dodgerblue;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>