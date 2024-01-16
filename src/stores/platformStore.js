import { ref } from 'vue';
import { defineStore } from 'pinia';
import { isBoolean } from 'lodash-es';

export const usePlatformStore = defineStore('platformStore', () => {
  const productsDrawerDisplayed = ref(false);
  const toggleProductsDrawer = (form, val) => {
    productsDrawerDisplayed.value = isBoolean(val) ? val : !productsDrawerDisplayed.value;
  };

  const freeProducts = ref([]);

  const setFreeProducts = (products) => {
    const prodList = products || [];
    const formattedProducts = prodList.filter((prod) => prod.modules && prod.modules.length);

    freeProducts.value = formattedProducts;

    if (formattedProducts.length && formattedProducts[0].modules.length)
      setActiveModule(formattedProducts[0].modules[0]);
  };

  const subscriptionProducts = ref([]);

  const setSubscriptionProducts = (products) => {
    const prodList = products || [];
    const formattedProducts = prodList.filter((prod) => prod.modules && prod.modules.length);

    subscriptionProducts.value = formattedProducts;

    if (
      !freeProducts.value.length &&
      formattedProducts.length &&
      formattedProducts[0].modules.length
    )
      setActiveModule(formattedProducts[0].modules[0]);
  };

  const activeModule = ref(null);
  const setActiveModule = (module) => {
    activeModule.value = module || null;
  };

  return {
    productsDrawerDisplayed,
    toggleProductsDrawer,
    freeProducts,
    setFreeProducts,
    subscriptionProducts,
    setSubscriptionProducts,
    activeModule,
    setActiveModule,
  };
});
