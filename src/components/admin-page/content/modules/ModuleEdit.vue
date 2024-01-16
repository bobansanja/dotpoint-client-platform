<template>
  <v-dialog
    v-if="formattedModule"
    v-model="dialog"
    width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Module</span>
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
                v-model="formattedModule[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                :type="field.type || 'text'"
                @update:modelValue="handleInputChange($event, field.key)"></v-text-field>
              <v-textarea
                v-if="field.type === 'textarea'"
                v-model="formattedModule[field.key]"
                :label="field.name"
                @update:modelValue="handleInputChange($event, field.key)"></v-textarea>
              <v-select
                v-if="field.type === 'select'"
                v-model="formattedModule[field.key]"
                :items="productList"
                item-title="title"
                item-value="id"
                :label="field.name"
                return-object
                @update:modelValue="handleInputChange($event, field.key, 'select')"></v-select>
              <v-sheet
                v-if="field.type === 'chips'"
                class="resources-container">
                <h3>{{ field.name }}</h3>
                <v-chip
                  v-for="chip in formattedModule[field.key]"
                  :key="chip.id"
                  class="resource-chip">
                  {{ chip.display_name }}
                </v-chip>
              </v-sheet>
              <v-checkbox-btn
                v-if="field.type === 'checkbox'"
                v-model="formattedModule[field.key]"
                :label="field.name"
                @update:modelValue="handleInputChange($event, field.key, 'checkbox')">
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
import { nextTick, onMounted, ref, watch } from 'vue';
import { getProducts, updateModule } from '../../../../services/api.js';

const props = defineProps({
  module: {
    type: Object,
    required: true,
    default: () => {},
  },
  moduleId: {
    type: Number,
    required: true,
    default: () => null,
  },
});
const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const productList = ref([]);

const initialModuleDetails = ref({});
const formattedModule = ref(null);
const editedFields = ref({});

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
    name: 'Assigned to Product',
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
    name: 'Resources',
    key: 'resources',
    type: 'chips',
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

function handleInputChange(value, key, inputType) {
  const initialFieldValue = initialModuleDetails.value[key];
  const editedFieldValue = value === -1 ? null : value;

  if (initialFieldValue === editedFieldValue) {
    delete editedFields.value[key];
    return;
  }

  if (inputType === 'checkbox') editedFields.value[key] = +editedFieldValue;
  else if (inputType === 'select') editedFields.value[key] = editedFieldValue?.id;
  else editedFields.value[key] = editedFieldValue;
}

const setInitialData = () => {
  formattedModule.value = { ...props.module };
  formattedModule.value.active = !!formattedModule.value.active;

  initialModuleDetails.value = JSON.parse(JSON.stringify(props.module));
};

async function loadProductList() {
  const response = await getProducts();
  productList.value = [...response?.free_products, ...response?.subscription_products] || [];
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedFields.value = {};
    emit('closeModal');
  });
}

async function saveAndClose() {
  const { valid: validForm } = await form.value.validate();

  if (!Object.keys(editedFields.value).length || !validForm) return;

  const data = { ...initialModuleDetails.value, ...editedFields.value };
  data && data.product && delete data.product;
  data && data.resources && delete data.resources;

  await updateModule(props.moduleId, data || {});

  emit('updateTable');
  close();
}

watch(dialog, (val) => {
  val || close();
});

onMounted(() => {
  setInitialData();
  loadProductList();
});
</script>

<style lang="scss" scoped>
.resources-container {
  padding: 0.5rem 0.25rem 1rem 0.25rem;

  h3 {
    padding-bottom: 0.75rem;
  }

  .resource-chip {
    margin: 0.25rem;
  }
}
</style>
