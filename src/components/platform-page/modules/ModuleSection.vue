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
                  :src="resource.fileUrl"
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

import Plyr from 'plyr';
import axios from 'axios';
import { ref } from 'vue';

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
</script>
