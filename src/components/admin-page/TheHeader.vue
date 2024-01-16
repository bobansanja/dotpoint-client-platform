<template>
  <v-app-bar
    color="green-darken-2"
    prominent>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-btn
        :to="{ name: 'platform' }"
        variant="elevated">
        <v-icon>mdi-chevron-left</v-icon>
        <span>Back to Platform</span>
      </v-btn>
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
import { useStore } from '../../stores/store.js';
const { logoutUser } = useStore();

const routes = [
  {
    name: 'Configuration',
    path: 'admin-configuration',
  },
  {
    name: 'Content',
    path: 'admin-content',
  },
  {
    name: 'Users',
    path: 'admin-users',
  },
];
</script>
