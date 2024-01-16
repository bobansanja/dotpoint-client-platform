<template>
  <v-data-table
    :headers="headers"
    :items="resourceList"
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
            New Resource
          </v-btn>
        </v-col>
      </v-toolbar>
    </template>
    <template v-slot:item.file_type="{ item }">
      <v-chip>
        {{ item.file_type }}
      </v-chip>
    </template>
    <template v-slot:item.editAction="{ item }">
      <v-icon
        size="small"
        class="me-4"
        @click="openEditDialog(item)">
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:item.deleteAction="{ item }">
      <v-icon
        size="small"
        class="me-4"
        @click="openDeleteDialog(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="loadResourceList">
        Reload data
      </v-btn>
    </template>
  </v-data-table>
  <ResourceNew
    v-if="newDialogDisplayed"
    @closeModal="handleModalClose"
    @updateTable="loadResourceList" />
  <ResourceEdit
    v-if="editDialogDisplayed"
    :resource="selectedResource"
    :resource-id="selectedResource.id"
    @closeModal="handleModalClose"
    @updateTable="loadResourceList" />
  <ResourceDelete
    v-if="deleteDialogDisplayed"
    :resource-title="selectedResource.original_name"
    :resource-id="selectedResource.id"
    @closeModal="handleModalClose"
    @updateTable="loadResourceList" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getResources } from '../../../../services/api.js';
import ResourceNew from './ResourceNew.vue';
import ResourceEdit from './ResourceEdit.vue';
import ResourceDelete from './ResourceDelete.vue';

const selectedResource = ref(null);

const newDialogDisplayed = ref(false);
const editDialogDisplayed = ref(false);
const deleteDialogDisplayed = ref(false);

const resourceList = ref([]);
const search = ref('');
const headers = ref([
  {
    title: 'Id',
    align: 'start',
    key: 'id',
  },
  { title: 'Name', key: 'name' },
  { title: 'Display name', key: 'display_name' },
  { title: 'Original name', key: 'original_name' },
  { title: 'File type', key: 'file_type', sortable: false },
  { title: 'Edit', key: 'editAction', sortable: false },
  { title: 'Delete', key: 'deleteAction', sortable: false },
]);

async function loadResourceList() {
  const response = await getResources();
  resourceList.value = [...response] || [];
}

function openNewDialog() {
  editDialogDisplayed.value = false;
  deleteDialogDisplayed.value = false;

  newDialogDisplayed.value = true;
}

function openEditDialog(resource) {
  deleteDialogDisplayed.value = false;
  newDialogDisplayed.value = false;

  editDialogDisplayed.value = true;
  selectedResource.value = resource;
}

function openDeleteDialog(resource) {
  editDialogDisplayed.value = false;
  newDialogDisplayed.value = false;

  deleteDialogDisplayed.value = true;
  selectedResource.value = resource;
}

function handleModalClose() {
  newDialogDisplayed.value = false;
  editDialogDisplayed.value = false;
  deleteDialogDisplayed.value = false;
  selectedResource.value = null;
}

onBeforeMount(() => {
  loadResourceList();
});
</script>

<style lang="scss" scoped>
.resource-chip {
  margin: 0.25rem;
}
</style>
