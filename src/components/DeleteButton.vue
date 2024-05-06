<template>
  <button @click="deleteButton">Supprimmer</button>
</template>

<script>
export default {
  methods: {
    async deleteButton() {
      if (confirm("Voulez-vous supprimer cet élément ?")) {
        this.$emit("deleteEvent");
      }
    },
  },
  emits: ["deleteEvent"],
};
</script>

<style scoped>
button {
  color: white;
  background-color: red;

  padding: 5px 10px;
  margin: 5px;
  border-radius: 2px;
  cursor: pointer;
}
</style>