<template>
  <v-container>
    <v-toolbar
      :elevation="1"
      density="compact">
      <v-toolbar-title>Add new subscription</v-toolbar-title>
    </v-toolbar>
    <v-form
      ref="addSubscriptionForm"
      validate-on="input"
      @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-select
              v-model="newSubscription.product_id"
              :items="availableProducts"
              :rules="newSubscription.rules.product"
              item-title="title"
              item-value="id"
              label="Product"></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="newSubscription.expiration_date"
              :rules="newSubscription.rules.date"
              label="Expiration date"
              type="date"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
              color="success"
              @click="addSubscription">
              Subscribe
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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
  availableProducts: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(['updateTable', 'subscriptionAdded']);

const addSubscriptionForm = ref(null);

const newSubscription = ref({
  product_id: null,
  expiration_date: null,
  rules: {
    product: [
      (value) => {
        if (value) return true;
        return 'Product is required.';
      },
    ],
    date: [
      (value) => {
        if (value) return true;
        return 'Expiration date is required.';
      },
    ],
  },
});

async function addSubscription() {
  const { valid: validForm } = await addSubscriptionForm.value.validate();

  if (!validForm) return;

  const data = { ...newSubscription.value };
  data.user_id = props.user.id;
  data && data.rules && delete data.rules;

  await addUserSubscription(data || {});

  addSubscriptionForm.value.reset();

  emit('subscriptionAdded');
  emit('updateTable');
}
</script>

<style lang="scss" scoped></style>
