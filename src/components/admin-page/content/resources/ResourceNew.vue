<template>
  <v-dialog
    v-model="dialog"
    width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">New Resource</span>
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
                v-model="newResource[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                :type="field.type || 'text'"></v-text-field>
              <v-file-input
                v-if="field.type === 'file'"
                v-model="newResource[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                show-size>
              </v-file-input>
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
import { nextTick, ref, watch } from 'vue';
import { createResource } from '../../../../services/api.js';

const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const newResource = ref({
  display_name: null,
  file: null,
});

const fields = ref([
  {
    name: 'Display name',
    key: 'display_name',
    type: 'text',
  },
  {
    name: 'File',
    key: 'file',
    type: 'file',
    rules: [
      (value) => {
        if (value && value.length) return true;
        return 'File must be provided.';
      },
    ],
  },
]);

function close() {
  dialog.value = false;
  nextTick(() => {
    newResource.value = {};
    emit('closeModal');
  });
}

async function saveAndClose() {
  const { valid: validForm } = await form.value.validate();

  if (!validForm) return;

  const formData = new FormData();
  formData.append('display_name', newResource.value.display_name);
  formData.append('file', newResource.value.file[0]);

  await createResource(formData);

  emit('updateTable');
  close();
}

watch(dialog, (val) => {
  val || close();
});
</script>
