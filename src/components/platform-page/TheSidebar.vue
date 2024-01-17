<template>
  <v-sheet
    class="platform-sidebar"
    rounded="lg">
    <v-list rounded="lg">
      <v-list-item
        v-for="freeProduct in freeProducts"
        :key="freeProduct.id"
        :title="freeProduct.title"
        link>
        <v-list rounded="lg">
          <v-list-item
            v-for="freeModule in freeProduct.modules"
            :key="freeModule.id"
            :title="freeModule.title"
            link
            @click="loadModule(freeModule.id)"></v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
    <v-divider class="my-2"></v-divider>
    <v-list rounded="lg">
      <v-list-item
        v-for="subProduct in subscriptionProducts"
        :key="subProduct.id"
        :title="subProduct.title"
        link>
        <v-list rounded="lg">
          <v-list-item
            v-for="subModule in subProduct.modules"
            :key="subModule.id"
            :title="subModule.title"
            link
            @click="loadModule(subModule.id)"></v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { sortBy } from 'lodash-es';
import { usePlatformStore } from '../../stores/platformStore.js';
import { getProducts, getSingleModule } from '../../services/api.js';
const { freeProducts, subscriptionProducts } = storeToRefs(usePlatformStore());
const { setFreeProducts, setSubscriptionProducts, setActiveModule } = usePlatformStore();

async function loadProducts() {
  const response = await getProducts();

  setFreeProducts(sortBy([...response?.free_products], 'position'));
  setSubscriptionProducts(sortBy([...response?.subscription_products], 'position'));
}

async function loadModule(id) {
  const response = await getSingleModule(id);
  setActiveModule(response);
}
onBeforeMount(() => {
  loadProducts();
});
</script>

<style lang="scss" scoped>
.platform-sidebar {
  min-height: 70vh;
}
</style>
