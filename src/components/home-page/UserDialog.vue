<template>
  <v-dialog
    v-model="dialog"
    width="85vw"
    persistent>
    <v-card>
      <v-container align="center">
        <div class="logo">
          <v-img src="logo.png"></v-img>
        </div>
        <LoginForm v-if="loginFormDisplayed" />
        <RegisterForm v-else-if="registerFormDisplayed" />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

import { storeToRefs } from 'pinia';
import { useStore } from '../../stores/store.js';
const { loginFormDisplayed, registerFormDisplayed } = storeToRefs(useStore());

const dialog = ref(true);
</script>

<style scoped>
.logo {
  width: 5rem;
  height: 5rem;
  margin: 1rem 0 2rem 0;
}
</style>
