<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="3"><Sidebar /></v-col>
        <v-col><ModuleSection /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import Sidebar from '../TheSidebar.vue';
import ModuleSection from './ModuleSection.vue';
</script>

<style scoped></style>
