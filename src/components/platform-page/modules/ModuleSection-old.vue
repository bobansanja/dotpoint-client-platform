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

      <div>
        <a
            data-fancybox
            href="https://lipsum.app/id/1/1600x1200"
            data-caption="Hello world"
        >
          <img src="https://lipsum.app/id/1/200x150" width="200" height="150" alt="" />
        </a>
        <a
            data-fancybox
            href="https://lipsum.app/id/2/1600x1200"
            data-caption="Second single image"
        >
          <img src="https://lipsum.app/id/2/200x150" width="200" height="150" alt="" />
        </a>
        <a
            data-fancybox
            href="https://api.dotpoint.click/static/e574d997-2d39-4c10-9626-29da359d9836.jpg"
            data-caption="Third single image"
        >
          <img src="https://lipsum.app/id/3/200x150" width="200" height="150" alt="" />
        </a>
      </div>

      <embed
          src="http://localhost:3000/static/f5880fa1-c1db-4787-bfe7-6e7906e66f50.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
      />


      <v-list>
        <v-list-item
          v-for="resource in activeModule?.resources"
          :key="resource.id">
          {{ resource.name }}
          <v-btn @click="openVideoDialog">Open Video Dialog</v-btn>

          <v-dialog
            v-model="dialog"
            max-width="800">
            <v-card>
              <v-card-title>{{ activeModule?.name }}</v-card-title>
              <v-card-subtitle>{{ resource.name }}</v-card-subtitle>

              <video
                id="player"
                playsinline
                controls>
                <source
                  :src="`http://localhost:3000${resource.path}`"
                  type="video/mp4" />
              </video>

              <v-card-actions>
                <v-btn @click="closeVideoDialog">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlatformStore } from '../../../stores/platformStore.js';
const { activeModule } = storeToRefs(usePlatformStore());

import { Fancybox } from "@fancyapps/ui";
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import Plyr from 'plyr';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getResource } from "../../../services/api.js";

const dialog = ref(false);

const openVideoDialog = async () => {
  // Fetch video source from the provided URL
  const videoSource = await getVideoSource();

  // Open the dialog
  dialog.value = true;

  // Initialize Plyr player
  const player = new Plyr('#plyr-player', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
  });

  // Set video source for Plyr player
  player.source = {
    type: 'video',
    sources: [
      {
        src: videoSource,
        type: 'video/mp4',
      },
    ],
  };
};

const pdfDoc = ref(null);

const closeVideoDialog = () => {
  // Close the dialog
  dialog.value = false;

  // Destroy Plyr player when the dialog is closed
  const player = Plyr.setup('#plyr-player')[0];
  if (player) {
    player.destroy();
  }
};

const getVideoSource = async () => {
  try {
    // Fetch video URL from the provided API
    const response = await axios.get(
      'https://www.youtube.com/watch?v=S2TaAcwC_zI&list=RDS2TaAcwC_zI&index=1',
    );
    return response.data.videoUrl;
  } catch (error) {
    console.error('Error fetching video source:', error);
  }
};

const getPdf = async () => {
  // try {
  //   // Fetch video URL from the provided API
  //   const response = await getResource('/static/f5880fa1-c1db-4787-bfe7-6e7906e66f50.pdf');
  //   const reader = document.getElementById('pdfreader');
  //   reader.setAttribute('src', )
  //   console.log('pdf', response);
  // } catch (error) {
  //   console.error('Error fetching pdf:', error);
  // }
};

onMounted(() => {
  Fancybox.bind('[data-fancybox]', {});
  getPdf();
});
</script>
