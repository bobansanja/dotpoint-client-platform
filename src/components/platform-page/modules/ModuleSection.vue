<template>
  <v-sheet
    min-height="70vh"
    rounded="lg">
    <v-card-title>
      <h2>{{ activeModule?.product?.title }}</h2>
      <h3>{{ activeModule?.title }}</h3>
    </v-card-title>
    <v-card-text>
      {{ activeModule?.description }}
    </v-card-text>

    <v-container>
      <div
          v-for="video in videoResources">
        <div class="resource-video__row">
          <video
              id="player"
              v-if="video.path"
              :src="`${baseUrl}${video.path}`"
              playsinline
              controls>
          </video>
        </div>
      </div>
    </v-container>

    <v-container>
    <h2 v-if="imageResources?.length">Images</h2>
    <div
        class="images-container">
      <div
          v-for="image in imageResources">
        <div class="resource-image__row">
          <a
            :href="`${baseUrl}${image.path}`"
            data-caption="resource.display_name"
            data-fancybox
          >
            <img
              :src="`${baseUrl}${image.path}`"
              width="200" height="150" alt="" />
          </a>
        </div>
      </div>
    </div>
    </v-container>

    <v-container>
      <h2 v-if="pdfResources?.length">PDF Files</h2>
      <div
          class="pdf-container">
        <div
            v-for="pdf in pdfResources">
          <div class="resource-pdf__row">
              <embed
                  :src="`${baseUrl}${pdf.path}`"
                  type="application/pdf"
                  width="100%"
                  height="100%"
              />
          </div>
        </div>
      </div>
    </v-container>

  </v-sheet>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { storeToRefs } from 'pinia';

import { usePlatformStore } from '../../../stores/platformStore.js';
import { useStore } from '../../../stores/store.js';
const { activeModule } = storeToRefs(usePlatformStore());
const { baseUrl } = useStore();

import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
const player = ref(null);

import { Fancybox } from "@fancyapps/ui";
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const dialog = ref(false);

const videoResources = computed(() =>
  activeModule.value?.resources?.filter((resource) => resource.file_type === 'VIDEO'));

const imageResources = computed(() =>
  activeModule.value?.resources?.filter((resource) => resource.file_type === 'IMAGE'));

const pdfResources = computed(() =>
  activeModule.value?.resources?.filter((resource) => resource.file_type === 'PDF'));

onMounted(() => {
  setTimeout(() => player.value = new Plyr('#player'), 2000);
  Fancybox.bind('[data-fancybox]', {});
});
</script>

<style lang="scss" scoped>
.resource-video__row {
  video {
    border-radius: 1rem;
    margin-left: 5%;
    width: 90%;
    max-height: 40rem;
  }
}

.images-container {
  display:flex;
  flex-flow: row wrap;
}

.resource-image__row {
  margin: 1rem;
}

.pdf-container {
  margin-top: 2rem;
}

.resource-pdf__row {
  width: 90%;
  height: 40rem;
  margin-left: 5%;
}
</style>
