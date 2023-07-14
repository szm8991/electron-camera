<script setup lang="ts">
import { useConfigStore } from '@renderer/stores/useConfigStore';
import { onMounted, ref } from 'vue';
const { config } = useConfigStore();

const videoPlayer = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const constraints = {
    audio: true,
    video: true,
  } as MediaStreamConstraints;

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    videoPlayer.value!.srcObject = stream;
    videoPlayer.value!.play();
  });
});
</script>

<template>
  <section
    class="w-screen h-screen overflow-hidden"
    :class="{ 'rounded-full': config.rounded }"
    :style="`border:solid ${config.borderWidth} ${config.borderColor}`"
  >
    <video
      class="object-cover h-full"
      :class="{ 'rounded-full': config.rounded }"
      ref="videoPlayer"
    ></video>
  </section>
</template>

<style scoped></style>
