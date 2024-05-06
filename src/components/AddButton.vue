<template>
  <button @click="onClick">Ajouter</button>
</template>

<script>
export default {
  methods: {
    async onClick(){
      this.$emit("addEvent");
    }
  },
  emits: ["addEvent"],
};
</script>

<style scoped>
button {
  color: white;
  background-color: green;

  padding: 5px 10px;
  margin: 5px;
  border-radius: 2px;
  cursor: pointer;
}
</style>