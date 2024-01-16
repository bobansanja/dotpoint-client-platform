<template>
  <h2>Login to Your Account</h2>
  <v-form
    ref="form"
    validate-on="input"
    @submit.prevent="loginUser">
    <v-card-text>
      <v-container>
        <v-row
          v-for="field in fields"
          key="field.key">
          <v-text-field
            v-model="loginData[field.key]"
            :label="field.name"
            :rules="field.rules || []"
            :type="field.type"></v-text-field>
        </v-row>
      </v-container>
    </v-card-text>
    <div class="submit-button">
      <v-btn
        type="submit"
        color="primary">
        Log in
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="register-button">
      <p>
        Don't have an account?
        <v-btn
          text
          @click="toggleRegisterForm(true)">
          Register
        </v-btn>
      </p>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../stores/store.js';
import { login } from '../../services/api.js';

const router = useRouter();
const { toggleLoginForm, toggleRegisterForm } = useStore();

const form = ref(null);

const loginData = ref({
  email: '',
  password: '',
});

const fields = ref([
  {
    name: 'E-mail',
    key: 'email',
    type: 'email',
    rules: [
      (value) => {
        if (value) return true;
        return 'Email is required.';
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;
        return 'E-mail must be valid.';
      },
    ],
  },
  {
    name: 'Password',
    key: 'password',
    type: 'password',
    rules: [
      (value) => {
        if (value) return true;
        return 'Password is required.';
      },
      (value) => {
        if (value?.length >= 4 && value?.length < 20) return true;
        return 'Password must contain more than 4 characters.';
      },
      (value) => {
        if (value?.length < 20) return true;
        return 'Password cannot be longer than 20 characters.';
      },
    ],
  },
]);

async function loginUser() {
  const { valid: validForm } = await form.value.validate();

  if (!validForm) return;

  const response = await login(loginData.value);
  if (response) {
    toggleLoginForm(false);
    router.push({ name: 'platform' });
  }
}
</script>

<style scoped>
.submit-button {
  padding-bottom: 2rem;
}

.register-button {
  padding: 2rem 0 1rem 0;
}
</style>
