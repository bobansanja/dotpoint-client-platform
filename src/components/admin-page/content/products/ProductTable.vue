<template>
  <v-data-table
    :headers="headers"
    :items="productList"
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
            New Product
          </v-btn>
        </v-col>
      </v-toolbar>
    </template>
    <template v-slot:item.modules="{ item }">
      <v-chip
        v-for="module in item.modules.slice(0, 2)"
        class="module-chip">
        {{ module.title }}
      </v-chip>
      <v-chip
        v-if="item.modules.length > 2"
        class="module-chip">
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
    <template v-slot:item.subscription_required="{ item }">
      <v-icon
        size="small"
        class="me-2"
        :color="!!item.subscription_required ? 'green' : 'red'"
        :icon="!!item.subscription_required ? 'mdi-check-bold' : 'mdi-close-thick'">
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-4"
        @click="openEditDialog(item)">
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="loadProductList">
        Reload data
      </v-btn>
    </template>
  </v-data-table>
  <ProductNew
    v-if="newDialogDisplayed"
    @closeModal="handleModalClose"
    @updateTable="loadProductList" />
  <ProductEdit
    v-if="editDialogDisplayed"
    :product="selectedProduct"
    :product-id="selectedProduct.id"
    @closeModal="handleModalClose"
    @updateTable="loadProductList" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getProducts } from '../../../../services/api.js';
import ProductNew from './ProductNew.vue';
import ProductEdit from './ProductEdit.vue';

const selectedProduct = ref(null);
const newDialogDisplayed = ref(false);
const editDialogDisplayed = ref(false);

const productList = ref([]);
const search = ref('');
const headers = ref([
  {
    title: 'Id',
    align: 'start',
    key: 'id',
  },
  { title: 'Title', key: 'title' },
  { title: 'Unique name', key: 'unique_name' },
  { title: 'Modules', key: 'modules', sortable: false },
  { title: 'Position', key: 'position' },
  { title: 'Subscription required', key: 'subscription_required' },
  { title: 'Active', key: 'active' },
  { title: 'Edit', key: 'actions', sortable: false },
]);

async function loadProductList() {
  const response = await getProducts();
  productList.value = [...response?.free_products, ...response?.subscription_products] || [];
}

function openNewDialog() {
  editDialogDisplayed.value = false;
  newDialogDisplayed.value = true;
}

function openEditDialog(product) {
  newDialogDisplayed.value = false;

  editDialogDisplayed.value = true;
  selectedProduct.value = product;
}

function handleModalClose() {
  newDialogDisplayed.value = false;
  editDialogDisplayed.value = false;
  selectedProduct.value = null;
}

onBeforeMount(() => {
  loadProductList();
});
</script>

<style lang="scss" scoped>
.module-chip {
  margin: 0 0.25rem;
}
</style>
