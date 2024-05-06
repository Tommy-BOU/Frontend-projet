<template>
  <p>posté par {{ data.user.userName }} le {{ formatDate(data.datePosted) }}</p>
  <p>{{ data.content }}</p>
  <span v-if="hasRoles && userRoles.includes('ROLE_USER')">
    <vote-button
      @event="getCommentVotes"
      :value="1"
      :entityId="data.id"
      :type="'comment'"
    ></vote-button
  ></span>

  score : {{ votesValue }}

  <span v-if="hasRoles && userRoles.includes('ROLE_USER')">
    <vote-button
      @event="getCommentVotes"
      :value="-1"
      :entityId="data.id"
      :type="'comment'"
    ></vote-button
  ></span>

  <hr />
</template>

<script>
import voteService from "@/services/voteService.js";
import VoteButton from "@/components/VoteButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { VoteButton },
  props: {
    data: Object,
  },
  data() {
    return {
      votesValue: 0,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userRoles", "hasRoles"]),
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat("default", { dateStyle: "full" }).format(
        date
      );
    },
    async getCommentVotes() {
      try {
        let voteCount = 0;
        const res = await voteService.getVotesByComment(this.data.id);
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
    this.getCommentVotes();
  },
};
</script>

<style>
</style>