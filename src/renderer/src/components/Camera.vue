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
  <main class="w-screen h-screen overflow-hidden">
    <video class="object-cover h-full"></video>
  </main>
</template>

<style></style>
