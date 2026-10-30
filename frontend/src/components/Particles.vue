<template>
  <div class="particles" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="particle"
      :style="p.style"
    >
      {{ p.emoji }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emojis = ['💕', '💗', '🌸', '✨', '🦋', '🌺', '💖', '🌷', '🤍']
const particles = ref([])

onMounted(() => {
  for (let i = 0; i < 16; i++) {
    particles.value.push({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      style: {
        left: Math.random() * 100 + '%',
        fontSize: 13 + Math.random() * 13 + 'px',
        animationDuration: 10 + Math.random() * 11 + 's',
        animationDelay: Math.random() * 9 + 's'
      }
    })
  }
})
</script>

<style scoped>
.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  bottom: -40px;
  opacity: 0;
  animation: floatUp linear infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.07));
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.55);
    opacity: 0;
  }
  8% {
    opacity: 0.65;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-110vh) rotate(340deg) scale(1.05);
    opacity: 0;
  }
}
</style>
