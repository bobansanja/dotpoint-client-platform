<template>
  <v-dialog
    v-if="formattedProduct"
    v-model="dialog"
    width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Product</span>
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
                v-model="formattedProduct[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                :type="field.type || 'text'"
                @update:modelValue="handleInputChange($event, field.key)"></v-text-field>
              <v-sheet
                v-if="field.type === 'chips'"
                class="modules-container">
                <h3>{{ field.name }}</h3>
                <v-chip
                  v-for="chip in formattedProduct[field.key]"
                  :key="chip.id"
                  class="module-chip">
                  {{ chip.title }}
                </v-chip>
              </v-sheet>
              <v-checkbox-btn
                v-if="field.type === 'checkbox'"
                v-model="formattedProduct[field.key]"
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
import { updateProduct } from '../../../../services/api.js';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {},
  },
  productId: {
    type: Number,
    required: true,
    default: () => null,
  },
});
const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const initialProductDetails = ref({});
const formattedProduct = ref(null);
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
    name: 'Modules',
    key: 'modules',
    type: 'chips',
  },
  {
    name: 'Subscription Required',
    key: 'subscription_required',
    type: 'checkbox',
  },
  {
    name: 'Active',
    key: 'active',
    type: 'checkbox',
  },
]);

function handleInputChange(value, key, inputType) {
  const initialFieldValue = initialProductDetails.value[key];
  const editedFieldValue = value === -1 ? null : value;

  if (initialFieldValue === editedFieldValue) {
    delete editedFields.value[key];
    return;
  }

  editedFields.value[key] = inputType === 'checkbox' ? +editedFieldValue : editedFieldValue;
}

const seInitialData = () => {
  formattedProduct.value = { ...props.product };
  formattedProduct.value.subscription_required = !!formattedProduct.value.subscription_required;
  formattedProduct.value.active = !!formattedProduct.value.active;

  initialProductDetails.value = JSON.parse(JSON.stringify(props.product));
};

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

  const data = { ...initialProductDetails.value, ...editedFields.value };
  data && data.modules && delete data.modules;

  await updateProduct(props.productId, data || {});

  emit('updateTable');
  close();
}

watch(dialog, (val) => {
  val || close();
});

onMounted(() => {
  seInitialData();
});
</script>

<style lang="scss" scoped>
.modules-container {
  padding: 0.5rem 0.25rem 1rem 0.25rem;

  h3 {
    padding-bottom: 0.75rem;
  }

  .module-chip {
    margin: 0.25rem;
  }
}
</style>
