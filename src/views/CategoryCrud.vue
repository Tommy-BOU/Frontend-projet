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
        <th>label</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.label }}</td>
          <td>
            <edit-button @modifyEvent="modify(category)"></edit-button>
            <delete-button
              @deleteEvent="deleteCategory(category.id)"
            ></delete-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <form class="crudForm" @submit.prevent="sendForm">
      <label for="label">Label</label>
      <input type="text" id="label" v-model="category.label" />
      <button type="submit">Enregistrer</button>
    </form>
    <button
      @click="
        toggle = !toggle;
        formType = '';
        category.label = '';
        categoryId = 0;
      "
    >
      Retour
    </button>
  </div>
</template>

<script>
import categoriesService from "@/services/categoryService.js";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import AddButton from "@/components/AddButton.vue";

export default {
  components: { EditButton, DeleteButton, AddButton },
  data() {
    return {
      categories: [],
      toggle: false,
      formType: "",
      categoryId: 0,
      category: { label: "" },
    };
  },
  methods: {
    async getCategories() {
      try {
        const res = await categoriesService.getCategories();
        this.categories = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCategory(id) {
      try {
        await categoriesService.deleteCategory(id);
        this.getCategories();
      } catch (e) {
        console.log(e);
      }
    },
    modify(data) {
      this.toggle = !this.toggle;
      this.formType = "modify";
      this.categoryId = data.id;
      this.category.label = data.label;
    },
    async updateCategory(id) {
      try {
        await categoriesService.updateCategory(id, this.category);
        this.category.label = "";
        this.toggle = !this.toggle;
        this.getCategories();
      } catch (e) {
        console.log(e);
      }
    },
    async addCategory() {
      try {
        await categoriesService.createCategory(this.category);
        this.category.label = "";
        this.toggle = !this.toggle;
        this.getCategories();
      } catch (e) {
        console.log(e);
      }
    },
    async sendForm() {
      if (this.formType === "add") {
        this.addCategory();
      }
      if (this.formType === "modify") {
        this.updateCategory(this.categoryId);
      }
    },
  },
  created() {
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
.crudForm {
  display: flex;
  flex-direction: column;
}
</style>