<template>
  <InvitationFlow />
</template>

<script setup>
import InvitationFlow from '@/views/InvitationFlow.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: linear-gradient(145deg, #fff5f7 0%, #fce4ec 35%, #f3e5f5 65%, #fff8f0 100%);
  min-height: 100vh;
  color: #5a3a40;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}
</style>
