<template>
  <Header />
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col>
          <RouterView />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import Header from '../components/admin-page/TheHeader.vue';
</script>

<style scoped></style>
