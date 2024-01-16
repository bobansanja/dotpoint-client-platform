<template>
  <v-dialog
    v-model="dialog"
    max-width="30vw">
    <v-card class="card-container">
      <v-container>
        <v-row justify="space-around">
          <h2>Are you sure you want to delete</h2>
        </v-row>
        <v-row justify="space-around">
          <v-chip>{{ resourceTitle }}</v-chip>
        </v-row>
      </v-container>
      <v-card-actions class="card-actions">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="tonal"
          @click="deleteItem"
          >Delete</v-btn
        >
        <v-btn
          color="blue-darken-1"
          @click="close"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { nextTick, ref, watch } from 'vue';
import { deleteResource } from '../../../../services/api.js';

const props = defineProps({
  resourceTitle: {
    type: String,
    required: false,
    default: 'this resource',
  },
  resourceId: {
    type: Number,
    required: true,
    default: () => null,
  },
});
const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);

async function deleteItem() {
  await deleteResource(props.resourceId);
  emit('updateTable');
  close();
}

function close() {
  dialog.value = false;
  nextTick(() => emit('closeModal'));
}

watch(dialog, (val) => {
  val || close();
});
</script>

<style lang="scss" scoped>
.card-container {
  padding: 1.25rem;
}
.card-actions {
  margin-top: 1.5rem;
}
</style>
