<template>
  <div v-if="!toggle">
    <table>
      <thead>
        <th>ID</th>
        <th>Nom d'utilisateur</th>
        <th>Email</th>
        <th>Roles</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.roles }}</td>
          <td>
            <edit-button @modifyEvent="modify(user)"></edit-button>
            <delete-button @deleteEvent="deleteUser(user.id)"></delete-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <form class="crudForm" @submit.prevent="updateUser">
      <label for="userName">Nom d'utilisateur</label>
      <input type="text" id="userName" v-model="user.userName" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="user.email" />
      <label for="roles">Roles</label>
      <select id="roles" v-model="user.roles" multiple>
        <option v-for="role in roles" :key="role.id" :value="role">
          {{ role }}
        </option>
      </select>
      <button type="submit">Enregistrer</button>
    </form>
    <button
      @click="
        toggle = !toggle;
        formType = '';
        userId = 0;
        clearUser();
      "
    >
      Retour
    </button>
  </div>
</template>

<script>
import userService from "@/services/userService.js";
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";

export default {
  components: { EditButton, DeleteButton },
  data() {
    return {
      users: [],
      roles: ["ROLE_USER", "ROLE_ADMIN", "BANNED"],
      toggle: false,
      formType: "",
      userId: 0,
      user: {
        userName: "",
        email: "",
        roles: [],
      },
    };
  },
  methods: {
    async getUsers() {
      try {
        const res = await userService.getUsers();
        this.users = JSON.parse(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteUser(id) {
      try {
        await userService.deleteUser(id);
        this.getUsers();
      } catch (e) {
        console.log(e);
      }
    },
    modify(data) {
      this.userId = data.id;
      this.user.userName = data.userName;
      this.user.email = data.email;
      this.user.password = data.password;
      this.user.roles = data.roles;
      this.toggle = !this.toggle;
      this.formType = "modify";
    },
    clearUser() {
      this.user = {
        userName: "",
        email: "",
        password: "",
        roles: [],
      };
    },
    async updateUser() {
      try {
        await userService.updateUser(this.userId, this.user);
        console.log(this.user)
        this.toggle = !this.toggle;
        this.getUsers();
        this.clearUser();
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.getUsers();
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