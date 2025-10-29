<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="subscriptions">
      <template v-slot:top>
        <v-toolbar
          :elevation="1"
          density="compact">
          <v-toolbar-title>Existing subscriptions</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.product_unique_name="{ item }">
        <v-chip>
          {{ item.product_unique_name }}
        </v-chip>
      </template>
      <template v-slot:item.deleteAction="{ item }">
        <v-icon
          size="small"
          class="me-4"
          @click="deleteSubscription(item)">
          mdi-delete
        </v-icon>
      </template>
<!--      <template v-slot:item.editAction="{ item }">-->
<!--        <v-icon-->
<!--          size="small"-->
<!--          class="me-4"-->
<!--          @click="editSubscription(item)">-->
<!--          mdi-pencil-->
<!--        </v-icon>-->
<!--      </template>-->
    </v-data-table>
    <template v-slot:bottom> </template>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { removeUserSubscription } from '../../../services/api.js';

const props = defineProps({
  subscriptions: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(['updateTable', 'subscriptionUpdate']);

const headers = ref([
  {
    title: 'Id',
    align: 'start',
    key: 'product_id',
  },
  { title: 'Unique name', key: 'product_unique_name' },
  { title: 'Title', key: 'product_title' },
  { title: 'Expiration date', key: 'expiration_date', sortable: false },
  { title: 'Remove', key: 'deleteAction', sortable: false },
  // { title: 'Edit', key: 'editAction', sortable: false },
]);

async function deleteSubscription(item) {
  await removeUserSubscription(item.user_id, item.product_id);

  emit('subscriptionUpdate');
  emit('updateTable');
}

// async function editSubscription(item) {
  // const data = { ...item.value.expiration_date };
  // await updateUserSubscription(item.id, data || {});
  //
  // await loadUserSubscriptions();
  //
  // emit('updateSubscriptionList');
  // emit('updateTable');
// }
</script>

<style lang="scss" scoped></style>
