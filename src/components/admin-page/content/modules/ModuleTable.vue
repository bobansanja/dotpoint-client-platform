<template>
  <v-data-table
    :headers="headers"
    :items="moduleList"
    :search="search"
    :sort-by="[{ key: 'title', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar color="rgb(255,251,254)">
        <v-spacer></v-spacer>
        <v-col cols="4">
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
        <v-col cols="2">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            variant="flat"
            @click="openNewDialog">
            <v-icon
              size="small"
              class="me-4">
              mdi-plus
            </v-icon>
            New Module
          </v-btn>
        </v-col>
      </v-toolbar>
    </template>
    <template v-slot:item.product="{ item }">
      <v-chip>
        {{ item.product.title }}
      </v-chip>
    </template>
    <template v-slot:item.resources="{ item }">
      <v-chip
        v-for="resource in item.resources.slice(0, 2)"
        class="resource-chip">
        {{ resource.display_name }}
      </v-chip>
      <v-chip
        v-if="item.resources.length > 2"
        class="resource-chip">
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
    <template v-slot:item.editAction="{ item }">
      <v-icon
        size="small"
        class="me-4"
        @click="openEditDialog(item)">
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:item.editResourceAction="{ item }">
      <v-icon
        size="small"
        class="me-4"
        @click="openEditResourceDialog(item)">
        mdi-file-cog-outline
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="loadModuleList">
        Reload data
      </v-btn>
    </template>
  </v-data-table>
  <ModuleNew
    v-if="newDialogDisplayed"
    @closeModal="handleModalClose"
    @updateTable="loadModuleList" />
  <ModuleEdit
    v-if="editDialogDisplayed"
    :module="selectedModule"
    :module-id="selectedModule.id"
    @closeModal="handleModalClose"
    @updateTable="loadModuleList" />
  <ModuleResourceEdit
    v-if="editResourceDialogDisplayed"
    :module="selectedModule"
    @closeModal="handleModalClose"
    @updateTable="loadModuleList" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getModules } from '../../../../services/api.js';
import ModuleNew from './ModuleNew.vue';
import ModuleEdit from './ModuleEdit.vue';
import ModuleResourceEdit from './ModuleResourceEdit.vue';

const selectedModule = ref(null);
const newDialogDisplayed = ref(false);
const editDialogDisplayed = ref(false);
const editResourceDialogDisplayed = ref(false);

const moduleList = ref([]);
const search = ref('');
const headers = ref([
  {
    title: 'Id',
    align: 'start',
    key: 'id',
  },
  { title: 'Title', key: 'title' },
  { title: 'Unique name', key: 'unique_name' },
  { title: 'Product', key: 'product' },
  { title: 'Resources', key: 'resources', sortable: false },
  { title: 'Position', key: 'position' },
  { title: 'Active', key: 'active' },
  { title: 'Edit', key: 'editAction', sortable: false },
  { title: 'Manage', key: 'editResourceAction', sortable: false },
]);

async function loadModuleList() {
  const response = await getModules();
  moduleList.value = [...response] || [];
}

function openNewDialog() {
  editDialogDisplayed.value = false;
  editResourceDialogDisplayed.value = false;

  newDialogDisplayed.value = true;
}

function openEditDialog(module) {
  newDialogDisplayed.value = false;
  editResourceDialogDisplayed.value = false;

  editDialogDisplayed.value = true;
  selectedModule.value = module;
}

function openEditResourceDialog(module) {
  newDialogDisplayed.value = false;
  editDialogDisplayed.value = false;

  editResourceDialogDisplayed.value = true;
  selectedModule.value = module;
}

function handleModalClose() {
  newDialogDisplayed.value = false;
  editDialogDisplayed.value = false;
  editResourceDialogDisplayed.value = false;
  selectedModule.value = null;
}

onBeforeMount(() => {
  loadModuleList();
});
</script>

<style lang="scss" scoped>
.resource-chip {
  margin: 0.25rem;
}
</style>
