<template>
  <v-tabs
    bg-color="grey-lighten-5"
    color="green-darken-2"
    class="content-tabs">
    <v-tab
      v-for="tab in tabs"
      :key="tab"
      :to="{ name: tab.path }"
      :text="tab.title"
      variant="text"
      class="content-tab"
      ripple></v-tab>
  </v-tabs>
  <v-divider></v-divider>
  <RouterView />
</template>
<script setup>
const tabs = [
  {
    title: 'Products',
    path: 'admin-content-products',
  },
  {
    title: 'Modules',
    path: 'admin-content-modules',
  },
  {
    title: 'Resources',
    path: 'admin-content-resources',
  },
];
</script>
<style lang="scss" scoped>
.content-tabs {
  height: 3.5rem;

  .content-tab {
    font-size: medium;

    :deep(.v-tab__slider) {
      top: 1.5rem;
    }
  }
}
</style>
