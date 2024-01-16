import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { isBoolean, toLower } from 'lodash-es';
import {
  removeItemFromStorage,
  getItemFromStorage,
  setItemToStorage,
} from '../services/storage.js';
import { useRouter } from 'vue-router';

export const useStore = defineStore('store', () => {
  const router = useRouter();

  const loginFormDisplayed = ref(false);
  const toggleLoginForm = (val) => {
    if (registerFormDisplayed.value) toggleRegisterForm(false);
    loginFormDisplayed.value = isBoolean(val) ? val : !loginFormDisplayed.value;
  };

  const registerFormDisplayed = ref(false);
  const toggleRegisterForm = (val) => {
    if (loginFormDisplayed.value) toggleLoginForm(false);
    registerFormDisplayed.value = isBoolean(val) ? val : !registerFormDisplayed.value;
  };

  const user = ref(null);
  const setUser = (data) => {
    user.value = data || null;

    if (user) setItemToStorage('dotpoint_user', data);
  };
  const setUserInApp = () => {
    user.value = getItemFromStorage('dotpoint_user') || null;
  };
  const removeUser = () => {
    user.value = null;
    removeItemFromStorage('dotpoint_user');
  };

  const isAdminUser = computed(
    () => user.value && user.value.type && toLower(user.value.type) === 'admin',
  );

  const logoutUser = () => {
    removeUser();
    router.push({ name: 'home' });
  };

  return {
    user,
    setUser,
    setUserInApp,
    removeUser,
    loginFormDisplayed,
    toggleLoginForm,
    registerFormDisplayed,
    toggleRegisterForm,
    isAdminUser,
    logoutUser,
  };
});
