<template>
  <v-sheet
    min-height="70vh"
    rounded="lg">
    <v-card>
      <v-card-title>
        {{ activeModule?.name }}
      </v-card-title>
      <v-card-text>
        {{ activeModule?.description }}
      </v-card-text>

      <v-container>
        <v-row
          v-for="resource in activeModule?.resources">
          <div
              v-if="resource.file_type === 'VIDEO'"
              class="resource-video__row">
            <video
                class="resource-video__row"
                id="player"
                playsinline
                controls>
              <source
                  :src="`${baseUrl}${resource.path}`"
                  type="video/mp4" />
            </video>
          </div>
          <div
            v-if="resource.file_type === 'IMAGE'"
            class="resource-image__row">
            <a
              :href="`${baseUrl}${resource.path}`"
              data-caption="resource.display_name"
              data-fancybox
            >
              <img
                :src="`${baseUrl}${resource.path}`"
                width="200" height="150" alt="" />
            </a>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import { storeToRefs } from 'pinia';
import { usePlatformStore } from '../../../stores/platformStore.js';
const { activeModule } = storeToRefs(usePlatformStore());

import Plyr from 'plyr';
const player = ref();

const baseUrl = ref('http://localhost:3000');
const dialog = ref(false);

onMounted(() => {
  player.value = new Plyr('#player');
});

</script>
<style lang="scss" scoped>
.resource-video__row {
  width: 80%;
  max-height: 40%;

  video {

  }
}
</style>
