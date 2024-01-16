<template>
  <v-dialog
    v-model="dialog"
    width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">New Module</span>
      </v-card-title>

      <v-form
        ref="form"
        validate-on="input"
        @submit.prevent>
        <v-card-text>
          <v-container>
            <v-row
              v-for="field in fields"
              key="field.key">
              <v-text-field
                v-if="field.type === 'text' || field.type === 'number'"
                v-model="newModule[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                :type="field.type || 'text'"></v-text-field>
              <v-textarea
                v-if="field.type === 'textarea'"
                v-model="newModule[field.key]"
                :label="field.name"></v-textarea>
              <v-select
                v-if="field.type === 'select'"
                v-model="newModule[field.key]"
                :items="productList"
                item-title="title"
                item-value="id"
                :label="field.name"></v-select>
              <v-checkbox-btn
                v-if="field.type === 'checkbox'"
                v-model="newModule[field.key]"
                :label="field.name">
              </v-checkbox-btn>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="saveAndClose">
            Save and close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="close">
            Close
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { isNumber } from 'lodash-es';
import { nextTick, onBeforeMount, ref, watch } from 'vue';
import { createModule, getProducts } from '../../../../services/api.js';

const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const productList = ref([]);

const newModule = ref({
  title: null,
  unique_name: null,
  description: null,
  product_id: null,
  position: null,
  active: null,
});

const fields = ref([
  {
    name: 'Title',
    key: 'title',
    type: 'text',
    rules: [
      (value) => {
        if (value) return true;
        return 'Title is required.';
      },
    ],
  },
  {
    name: 'Unique Name',
    key: 'unique_name',
    type: 'text',
    rules: [
      (value) => {
        if (value) return true;
        return 'Unique name is required.';
      },
    ],
  },
  {
    name: 'Description',
    key: 'description',
    type: 'textarea',
  },
  {
    name: 'Product',
    key: 'product_id',
    type: 'select',
    rules: [
      (value) => {
        if (value) return true;
        return 'Product is required.';
      },
    ],
  },
  {
    name: 'Position',
    key: 'position',
    type: 'number',
    rules: [
      (value) => {
        if (isNumber(+value)) return true;
        return 'Position must be a number.';
      },
    ],
  },
  {
    name: 'Active',
    key: 'active',
    type: 'checkbox',
  },
]);

async function loadProductList() {
  const response = await getProducts();
  productList.value = [...response?.free_products, ...response?.subscription_products] || [];
}

function close() {
  dialog.value = false;
  nextTick(() => {
    newModule.value = {};
    emit('closeModal');
  });
}

async function saveAndClose() {
  const { valid: validForm } = await form.value.validate();

  if (!validForm) return;

  const formattedData = { ...newModule.value };
  formattedData.description = !formattedData.description && '';
  formattedData.position = formattedData.position || 1000000;
  formattedData.active = +formattedData.active;

  await createModule(formattedData || {});

  emit('updateTable');
  close();
}

watch(dialog, (val) => {
  val || close();
});

onBeforeMount(() => {
  loadProductList();
});
</script>
