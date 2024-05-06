<template>
  <div v-if="!toggle">
    <table>
      <thead>
        <th>ID</th>
        <th>utilisateur</th>
        <th>Contenu</th>
        <th>Date</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td>{{ comment.id }}</td>
          <td>{{ comment.user.userName }}</td>
          <td>{{ comment.content }}</td>
          <td>{{ comment.datePosted }}</td>
          <td>
            <edit-button @modifyEvent="modify(comment)"></edit-button>
            <delete-button
              @deleteEvent="deleteComment(comment.id)"
            ></delete-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <form class="crudForm" @submit.prevent="updateComment">
      <label for="content">Contenu</label>
      <input type="text" id="content" v-model="comment.content" />
      <button type="submit">Enregistrer</button>
    </form>

    <button
      @click="
        toggle = !toggle;
        formType = '';
        commentId = 0;
        comment.content = '';
      "
    >
      Retour
    </button>
  </div>
</template>

<script>
import commentService from "@/services/commentService.js";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";

export default {
  components: { EditButton, DeleteButton },
  data() {
    return {
      comments: [],
      toggle: false,
      formType: "",
      commentId: 0,
      comment: { content: "" },
    };
  },
  methods: {
    async getComments() {
      try {
        const res = await commentService.getComments();
        this.comments = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteComment(id) {
      try {
        await commentService.deleteComment(id);
        this.getComments();
      } catch (e) {
        console.log(e);
      }
    },
    modify(data) {
      this.toggle = !this.toggle;
      this.formType = "modify";
      this.commentId = data.id;
      this.comment.content = data.content;
    },
    async updateComment() {
      try {
        await commentService.updateComment(this.commentId, this.comment);
        this.comment.content = "";
        this.toggle = !this.toggle;
        this.getComments();
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.getComments();
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
</style>