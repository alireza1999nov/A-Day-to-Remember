<template>
  <div class="first-bg" :class="{ dimmed }">
    <div class="poem-clear" :class="{ dimmed }">
      <span>بوی خوش تو هر که ز باد صبا شنید</span>
      <span>از یار آشنا سخن آشنا شنید</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dimmed: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.first-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 50% 18%, rgba(255, 220, 230, 0.38) 0%, transparent 55%),
    radial-gradient(ellipse at 18% 82%, rgba(230, 200, 240, 0.22) 0%, transparent 50%),
    radial-gradient(ellipse at 82% 70%, rgba(255, 200, 210, 0.18) 0%, transparent 45%),
    linear-gradient(180deg, rgba(255, 245, 247, 0.6) 0%, rgba(252, 228, 236, 0.5) 40%, rgba(243, 229, 245, 0.65) 100%),
    url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1600&q=85') center/cover no-repeat;
  transition: opacity 1.1s ease;
}

.first-bg.dimmed {
  opacity: 0.16;
}

.first-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.55;
}

.first-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 28%, rgba(90, 40, 50, 0.2) 100%);
  pointer-events: none;
}

.poem-clear {
  position: fixed;
  top: 4.5%;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
  pointer-events: none;
  font-family: 'Noto Nastaliq Urdu', 'Vazirmatn', serif;
  font-size: clamp(17px, 4.2vw, 26px);
  line-height: 2.55;
  color: #6b2f3a;
  text-shadow:
    0 1px 3px rgba(255, 255, 255, 1),
    0 0 22px rgba(255, 245, 247, 0.95),
    0 0 42px rgba(255, 220, 230, 0.55);
  padding: 10px 18px;
  transition: opacity 0.95s ease;
}

.poem-clear.dimmed {
  opacity: 0.1;
}

.poem-clear span {
  display: block;
  margin: 12px 0;
  animation: poemFloat 7.5s ease-in-out infinite;
  letter-spacing: 0.4px;
}

.poem-clear span:nth-child(2) {
  animation-delay: 1.5s;
}

@keyframes poemFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-9px) scale(1.02);
    opacity: 1;
  }
}
</style>
