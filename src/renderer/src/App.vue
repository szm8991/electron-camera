<script setup lang="ts">
import { CameraFive, InnerShadowTopLeft, Setting as SettingIcon } from '@icon-park/vue-next';
import Camera from './components/Camera.vue';
import Setting from './components/Setting.vue';
import useDrag from './hooks/useDrag';
import { useConfigStore } from './stores/useConfigStore';
const { config } = useConfigStore();

const { drag } = useDrag();
drag.run();

const quit = () => window.api.quit();

const changeRound = () => {
  config.rounded = !config.rounded;
  if (config.rounded) {
    window.api.setWindowMaxSize({ width: 350, height: 320 });
    window.api.setWindowSize({ aspectRatio: 1, width: 350, height: 320 });
  } else {
    window.api.setWindowMaxSize({ width: 500, height: 320 });
    window.api.setWindowSize({ aspectRatio: 16 / 9, width: 500, height: 320 });
  }
};
</script>

<template>
  <!-- async setup() 必须与 Suspense 内置组件组合使用 -->
  <Suspense>
    <main class="relative group" @contextmenu="quit">
      <SettingIcon
        theme="outline"
        size="24"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer z-10 group-hover:block"
        v-if="config.page == 'camera'"
        @click="config.page = 'setting'"
      />
      <CameraFive
        theme="outline"
        size="24"
        class="absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer z-10 group-hover:block"
        v-if="config.page == 'setting'"
        @click="config.page = 'camera'"
      />
      <!-- 切换圆角 -->
      <InnerShadowTopLeft
        theme="outline"
        size="24"
        class="absolute left-1/2 -translate-x-1/2 mt-3 bottom-3 text-white opacity-80 cursor-pointer z-10 group-hover:block"
        v-if="config.page == 'camera'"
        @click="changeRound"
      />
      <Camera v-if="config.page == 'camera'" />
      <Setting v-else />
    </main>
  </Suspense>
</template>

<style scoped></style>
