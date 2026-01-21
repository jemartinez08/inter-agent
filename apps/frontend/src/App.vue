<script setup lang="ts">
import SideBar from './components/SideBar.vue';
</script>

<template>
  <SideBar />
  <main class="content">
    <router-view />
  </main>
</template>

<style>
.content {
  height: 100vh;
  margin-left: 280px;
  padding: 0px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>
