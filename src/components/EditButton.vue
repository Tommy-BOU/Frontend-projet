<template>
  <button @click="onClick">Modifier</button>
</template>

<script>
export default {
  methods: {
    async onClick() {
      this.$emit("modifyEvent");
    },
  },
  emits: ["modifyEvent"],
};
</script>

<style scoped>
button {
  color: white;
  background-color: dodgerblue;

  padding: 5px 10px;
  margin: 5px;
  border-radius: 2px;
  cursor: pointer;
}
</style>