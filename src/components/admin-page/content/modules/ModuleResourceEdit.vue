<template>
  <v-dialog
    v-if="module"
    v-model="dialog"
    width="70vw">
    <v-card>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Module Resources</span>
        </v-card-title>

        <v-form
          ref="assignResourceForm"
          validate-on="input"
          @submit.prevent>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="5">
                  <v-select
                    v-model="newResource.resource_id"
                    :items="availableResourceList"
                    :rules="newResource.rules"
                    item-title="display_name"
                    item-value="id"
                    label="Resource"></v-select>
                </v-col>
                <v-col cols="3">
                  <v-btn
                    color="success"
                    @click="assignResource">
                    Add resource
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { differenceBy } from 'lodash-es';
import { nextTick, onMounted, ref, watch } from 'vue';
import { getResources, assignResourceToModule } from '../../../../services/api.js';

const props = defineProps({
  module: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const assignResourceForm = ref(null);

const allResourceList = ref([]);
const availableResourceList = ref([]);

const newResource = ref({
  resource_id: null,
  rules: [
    (value) => {
      if (value) return true;
      return 'Resource is required.';
    },
  ],
});

async function loadResourceList() {
  const response = await getResources();
  allResourceList.value = [...response] || [];
  availableResourceList.value = differenceBy(allResourceList.value, props.module.resources, 'id');
}

async function assignResource() {
  const { valid: validForm } = await assignResourceForm.value.validate();

  if (!validForm) return;

  const data = { ...newResource.value };
  data.module_id = props.module.id;
  data && data.rules && delete data.rules;

  await assignResourceToModule(data || {});

  emit('updateTable');
}

function close() {
  dialog.value = false;
  nextTick(() => {
    newResource.value.resource_id = null;
    emit('closeModal');
  });
}

watch(dialog, (val) => {
  val || close();
});

onMounted(() => {
  loadResourceList();
});
</script>

<style lang="scss" scoped></style>
