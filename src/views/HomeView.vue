<template>
  <v-main class="main">
    <div class="platform-version">v.1.0.3</div>
    <UserDialog />
  </v-main>
</template>

<script setup>
import UserDialog from '../components/home-page/UserDialog.vue';

import { onMounted } from 'vue';
import { useStore } from '../stores/store.js';
const { toggleLoginForm } = useStore();

onMounted(() => toggleLoginForm(true));
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;

  .platform-version {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 3.75rem;
    height: 1.5rem;
    padding: 0 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
}
</style>
