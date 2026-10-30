<template>
  <div class="progress">
    <div
      v-for="n in total"
      :key="n"
      class="dot"
      :class="{
        active: n === current,
        done: n < current
      }"
    />
  </div>
</template>

<script setup>
defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 4
  }
})
</script>

<style scoped>
.progress {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 9px;
  z-index: 50;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(201, 123, 132, 0.28);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dot.active {
  background: #c97b84;
  width: 24px;
  border-radius: 10px;
}

.dot.done {
  background: #e8a0b0;
}
</style>
