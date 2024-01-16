<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="user.products">
      <template v-slot:top>
        <v-toolbar
          :elevation="1"
          density="compact">
          <v-toolbar-title>Existing subscriptions</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.unique_name="{ item }">
        <v-chip>
          {{ item.unique_name }}
        </v-chip>
      </template>
      <template v-slot:item.deleteAction="{ item }">
        <v-icon
          size="small"
          class="me-4"
          @click="removeSubscription(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <template v-slot:bottom> </template>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { addUserSubscription } from '../../../services/api.js';

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const emit = defineEmits(['updateTable']);

const userProductList = ref([]);
const headers = ref([
  {
    title: 'Id',
    align: 'start',
    key: 'id',
  },
  { title: 'Unique name', key: 'unique_name' },
  { title: 'Title', key: 'title' },
  { title: 'Remove', key: 'deleteAction', sortable: false },
  { title: 'Expiration date', key: 'expiration_date', sortable: false },
  { title: 'Edit', key: 'editAction', sortable: false },
]);

async function removeSubscription(item) {
  // console.log('item', item);
  // await addUserSubscription(data || {});
  //
  // emit('updateTable');
}
</script>

<style lang="scss" scoped></style>
