<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { onBeforeMount } from 'vue';

import { useStore } from './stores/store.js';
const { setUserInApp } = useStore();

onBeforeMount(() => setUserInApp());
</script>
