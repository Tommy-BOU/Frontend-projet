<template>
  <div v-if="type == 'film'">
    <button @click="voteFilm">
      <img v-if="value == 1" src="@/assets/transparentUpArrow.png" alt="" />
      <img v-else src="@/assets/transparentDownArrow.png" alt="" />
    </button>
  </div>
  <div v-if="type == 'comment'">
    <button @click="voteComment">
      <img v-if="value == 1" src="@/assets/transparentUpArrow.png" alt="" />
      <img v-else src="@/assets/transparentDownArrow.png" alt="" />
    </button>
  </div>
</template>

<script>
import voteService from "@/services/voteService.js";
export default {
  props: {
    type: String,
    entityId: Number,
    value: Number,
  },
  data() {
    return {
      vote: {
        id: this.entityId,
        value: this.value,
      },
    };
  },
  methods: {
    async voteFilm() {
      try {
        this.vote.id = this.entityId;
        await voteService.voteFilm(this.vote);
        this.$emit('event')
      } catch (e) {
        console.error(e);
      }
    },
    async voteComment() {
      try {
        console.log(this.vote)
        await voteService.voteComment(this.vote);
        this.$emit('event')
      } catch (e) {
        console.error(e);
      }
    },
  },
  emits: ["event"],
};
</script>

<style>
</style>