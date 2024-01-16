<template>
  <v-tabs
    bg-color="grey-lighten-5"
    color="green-darken-2"
    class="configuration-tabs">
    <v-tab
      v-for="tab in tabs"
      :key="tab"
      :to="{ name: tab.path }"
      :text="tab.title"
      variant="text"
      class="configuration-tab"
      ripple></v-tab>
  </v-tabs>
  <v-divider></v-divider>
  <RouterView />
</template>
<script setup>
const tabs = [
  {
    title: 'Appearance',
    path: 'admin-configuration-appearance',
  },
  {
    title: 'E-mail Templates',
    path: 'admin-configuration-templates',
  },
];
</script>
<style lang="scss" scoped>
.configuration-tabs {
  height: 3.5rem;

  .configuration-tab {
    font-size: medium;

    :deep(.v-tab__slider) {
      top: 1.5rem;
    }
  }
}
</style>
