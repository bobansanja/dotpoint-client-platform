<template>
  <v-dialog
    v-if="formattedResource"
    v-model="dialog"
    width="40vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Resource</span>
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
                v-if="field.type === 'text'"
                v-model="formattedResource[field.key]"
                :label="field.name"
                :rules="field.rules || []"
                :type="field.type || 'text'"
                @update:modelValue="handleInputChange($event, field.key)"></v-text-field>
              <v-sheet
                v-if="field.type === 'chip'"
                class="resource-chip-container">
                <h3>{{ field.name }}</h3>
                <v-chip class="resource-chip">
                  {{ formattedResource[field.key] }}
                </v-chip>
              </v-sheet>
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
import { nextTick, onMounted, ref, watch } from 'vue';
import { updateResource } from '../../../../services/api.js';

const props = defineProps({
  resource: {
    type: Object,
    required: true,
    default: () => {},
  },
  resourceId: {
    type: Number,
    required: true,
    default: () => null,
  },
});
const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const initialResourceDetails = ref({});
const formattedResource = ref(null);
const editedFields = ref({});

const fields = ref([
  {
    name: 'Display name',
    key: 'display_name',
    type: 'text',
    rules: [
      (value) => {
        if (value) return true;
        return 'Display name is required.';
      },
    ],
  },
  {
    name: 'Name',
    key: 'name',
    type: 'chip',
  },
  {
    name: 'Original Name',
    key: 'original_name',
    type: 'chip',
  },
  {
    name: 'Path',
    key: 'path',
    type: 'chip',
  },
  {
    name: 'File type',
    key: 'file_type',
    type: 'chip',
  },
]);

function handleInputChange(value, key) {
  const initialFieldValue = initialResourceDetails.value[key];
  const editedFieldValue = value === -1 ? null : value;

  if (initialFieldValue === editedFieldValue) {
    delete editedFields.value[key];
    return;
  }
  editedFields.value[key] = editedFieldValue;
}

const setInitialData = () => {
  formattedResource.value = { ...props.resource };
  initialResourceDetails.value = JSON.parse(JSON.stringify(props.resource));
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

  await updateResource(props.resourceId, { ...editedFields.value } || {});

  emit('updateTable');
  close();
}

watch(dialog, (val) => {
  val || close();
});

onMounted(() => {
  setInitialData();
});
</script>

<style lang="scss" scoped>
.resource-chip-container {
  padding: 0.25rem 0.25rem 0.75rem 0.25rem;

  h3 {
    padding-bottom: 0.375rem;
  }

  .resource-chip {
    margin: 0.25rem;
  }
}
</style>
