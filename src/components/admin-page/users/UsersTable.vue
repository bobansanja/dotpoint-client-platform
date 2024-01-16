<template>
  <v-data-table
    :headers="headers"
    :items="userList"
    :search="search"
    :sort-by="[{ key: 'title', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar
        :elevation="1"
        color="grey-lighten-5">
        <v-toolbar-title>Users</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-col>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            single-line
            density="compact"
            variant="outlined"
            class="mb-2"
            hide-details></v-text-field>
        </v-col>
      </v-toolbar>
    </template>
    <template v-slot:item.type="{ item }">
      <v-chip>
        {{ item.type }}
      </v-chip>
    </template>
    <template v-slot:item.products="{ item }">
      <v-chip
        v-for="product in item.products.slice(0, 2)"
        class="product-chip">
        {{ product.title }}
      </v-chip>
      <v-chip
        v-if="item.products.length > 2"
        class="product-chip">
        ...
      </v-chip>
    </template>
    <template v-slot:item.active="{ item }">
      <v-icon
        size="small"
        class="me-2"
        :color="!!item.active ? 'green' : 'red'"
        :icon="!!item.active ? 'mdi-check-circle' : 'mdi-close-circle'">
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-4"
        @click="openEditDialog(item)">
        mdi-cog
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="loadUserList">
        Reload data
      </v-btn>
    </template>
  </v-data-table>
  <UserEdit
    v-if="editDialogDisplayed"
    :user="selectedUser"
    :user-id="selectedUser.id"
    @closeModal="handleModalClose"
    @updateTable="loadUserList" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getUsers } from '../../../services/api.js';
import UserEdit from './UserEdit.vue';

const selectedUser = ref(null);
const editDialogDisplayed = ref(false);

const userList = ref([]);
const search = ref('');
const headers = ref([
  {
    title: 'Id',
    align: 'start',
    key: 'id',
  },
  { title: 'First name', key: 'first_name' },
  { title: 'Last name', key: 'last_name' },
  { title: 'E-mail', key: 'email' },
  { title: 'Type', key: 'type' },
  { title: 'Products', key: 'products', sortable: false },
  { title: 'Active', key: 'active' },
  { title: 'Manage', key: 'actions', sortable: false },
]);

async function loadUserList() {
  const response = await getUsers();
  userList.value = [...response] || [];
}

function openEditDialog(user) {
  editDialogDisplayed.value = true;
  selectedUser.value = user;
}

function handleModalClose() {
  editDialogDisplayed.value = false;
  selectedUser.value = null;
}

onBeforeMount(() => {
  loadUserList();
});
</script>

<style lang="scss" scoped>
.product-chip {
  margin: 0.25rem;
}
</style>
