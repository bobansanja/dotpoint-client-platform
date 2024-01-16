<template>
  <v-app-bar prominent>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-btn
        v-if="isAdminUser"
        :to="{ name: 'admin' }"
        variant="elevated">
        <v-icon>mdi-cog</v-icon>
        <span>Configure Platform</span>
      </v-btn>
      <v-avatar
        v-else
        class="me-4"
        color="grey-darken-1"
        size="32"></v-avatar>
      <v-spacer></v-spacer>
      <v-btn
        v-for="route in routes"
        :key="route"
        :to="{ name: route.path }"
        :text="route.name"
        variant="text"></v-btn>
      <v-btn
        :to="{ name: 'home' }"
        variant="elevated"
        @click="logoutUser">
        <v-icon>mdi-logout</v-icon>
        <span>Log out</span>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '../../stores/store.js';
const { logoutUser } = useStore();
const { isAdminUser } = storeToRefs(useStore());

const routes = [
  {
    name: 'Products',
    path: 'platform-products',
  },
  {
    name: 'Profile',
    path: 'platform-user-profile',
  },
  {
    name: 'Account',
    path: 'platform-user-account',
  },
];
</script>
