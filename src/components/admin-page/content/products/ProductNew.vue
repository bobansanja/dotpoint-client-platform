<template>
  <v-dialog
    v-model="dialog"
    width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">New Product</span>
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
                v-model="newProduct[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                :type="field.type || 'text'"></v-text-field>
              <v-checkbox-btn
                v-if="field.type === 'checkbox'"
                v-model="newProduct[field.key]"
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
import { nextTick, ref, watch } from 'vue';
import { createProduct } from '../../../../services/api.js';

const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const newProduct = ref({
  title: null,
  unique_name: null,
  position: null,
  subscription_required: null,
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

function close() {
  dialog.value = false;
  nextTick(() => {
    newProduct.value = {};
    emit('closeModal');
  });
}

async function saveAndClose() {
  const { valid: validForm } = await form.value.validate();

  if (!validForm) return;

  const formattedData = { ...newProduct.value };
  formattedData.position = formattedData.position || 1000000;
  formattedData.subscription_required = +formattedData.subscription_required;
  formattedData.active = +formattedData.active;

  await createProduct(formattedData || {});

  emit('updateTable');
  close();
}

watch(dialog, (val) => {
  val || close();
});
</script>
