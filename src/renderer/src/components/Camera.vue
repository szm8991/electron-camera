<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  const constraints = {
    audio: true,
    video: true,
  } as MediaStreamConstraints;

  const video = document.querySelector('video')!;

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
});
</script>

<template>
  <main>
    <video></video>
  </main>
</template>

<style></style>
