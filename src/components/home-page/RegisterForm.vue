<template>
  <h2>Create an Account</h2>
  <v-form
    ref="form"
    validate-on="input"
    @submit.prevent="registerUser">
    <v-card-text>
      <v-container>
        <v-row
          v-for="field in fields"
          key="field.key">
          <v-text-field
            v-if="field.type !== 'checkbox'"
            v-model="registerData[field.key]"
            :label="field.name"
            :rules="field.rules || []"
            :type="field.type"></v-text-field>
          <v-checkbox-btn
            v-else
            v-model="registerData[field.key]"
            :rules="field.rules || []"
            :label="field.name">
          </v-checkbox-btn>
        </v-row>
      </v-container>
    </v-card-text>
    <div class="submit-button">
      <v-btn
        type="submit"
        color="primary">
        Register
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="login-button">
      <p>
        Already have an account?
        <v-btn
          text
          @click="toggleLoginForm(true)">
          Log in
        </v-btn>
      </p>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../../stores/store.js';
import { register } from '../../services/api.js';

const { toggleLoginForm } = useStore();

const registerData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: false,
});

const form = ref(null);

const fields = ref([
  {
    name: 'First name',
    key: 'first_name',
    type: 'text',
    rules: [
      (value) => {
        if (value) return true;
        return 'First name is required.';
      },
      (value) => {
        if (value?.length >= 3 && value?.length < 20) return true;
        return 'First name must contain more than 3 characters.';
      },
      (value) => {
        if (value?.length <= 20) return true;
        return 'First name cannot be longer than 20 characters.';
      },
    ],
  },
  {
    name: 'Last name',
    key: 'last_name',
    type: 'text',
    rules: [
      (value) => {
        if (value) return true;
        return 'Last name is required.';
      },
      (value) => {
        if (value?.length >= 3 && value?.length < 20) return true;
        return 'Last name must contain more than 3 characters.';
      },
      (value) => {
        if (value?.length < 20) return true;
        return 'Last name cannot be longer than 20 characters.';
      },
    ],
  },
  {
    name: 'E-mail',
    key: 'email',
    type: 'email',
    rules: [
      (value) => {
        if (value) return true;
        return 'E-mail is required.';
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
  {
    name: 'I agree to Terms And Conditions.',
    key: 'terms',
    type: 'checkbox',
    rules: [
      (value) => {
        if (value) return true;
        return 'Please accept Terms And Conditions.';
      },
    ],
  },
]);

async function registerUser() {
  const { valid: validForm } = await form.value.validate();

  if (!validForm) return;

  const formattedData = { ...registerData.value };
  formattedData.terms && delete formattedData.terms;

  const response = await register(formattedData);
  if (response) {
    toggleLoginForm(true);
  }
}
</script>

<style scoped>
.submit-button {
  padding-bottom: 2rem;
}

.login-button {
  padding: 2rem 0 1rem 0;
}
</style>
