<script setup lang="ts">
const setTitle = (title: string) => window.api.setTitle(title);
</script>

<template>
  <h1>hello,world!</h1>
  <button @click="setTitle('Camera APP')">更改标题</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
