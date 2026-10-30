<template>
  <div class="envelope-stage">
    <div
      class="envelope-wrapper"
      :class="{ opened: isOpen }"
      @click="open"
    >
      <div class="envelope" :class="{ open: isOpen }">
        <!-- پشت پاکت -->
        <div class="envelope-back"></div>

        <!-- فلپ بالا -->
        <div class="envelope-flap">
          <div class="flap-inner"></div>
        </div>

        <!-- روی پاکت -->
        <div class="envelope-front">
          <div class="heart-seal" :class="{ hide: isOpen }">
            <span class="heart">💌</span>
          </div>
        </div>

        <!-- کاغذ داخل (فقط وقتی باز می‌شود کمی دیده می‌شود) -->
        <div class="letter-peek" :class="{ show: isOpen }"></div>
      </div>
    </div>

    <p class="tap-hint" :class="{ hide: isOpen }">
      روی پاکت بزن تا باز بشه
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['opened'])
const isOpen = ref(false)

function open() {
  if (isOpen.value) return
  isOpen.value = true

  setTimeout(() => {
    emit('opened')
  }, 950)
}
</script>

<style scoped>
.envelope-stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
  padding: 20px;
}

.envelope-wrapper {
  position: relative;
  width: 420px;
  height: 295px;
  cursor: pointer;
  perspective: 1600px;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.envelope-wrapper:hover:not(.opened) {
  transform: scale(1.045) translateY(-8px);
}

.envelope-wrapper:active:not(.opened) {
  transform: scale(0.97);
}

.envelope {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

/* پشت */
.envelope-back {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(155deg, #f9ced8 0%, #e99aab 45%, #d87f93 100%);
  border-radius: 16px;
  border: 1.5px solid rgba(180, 90, 105, 0.35);
  box-shadow:
    0 28px 65px rgba(201, 123, 132, 0.32),
    0 12px 28px rgba(0, 0, 0, 0.08),
    0 4px 10px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -2px 6px rgba(160, 70, 85, 0.12);
}

/* فلپ */
.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 148px;
  transform-origin: top center;
  transition: transform 0.95s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.14));
}

.flap-inner {
  width: 100%;
  height: 100%;
  background:
    linear-gradient(185deg, #fcdce6 0%, #f0a8b8 55%, #e48ea2 100%);
  clip-path: polygon(0 0, 50% 78%, 100% 0);
  border-radius: 16px 16px 0 0;
  border: 1.5px solid rgba(180, 90, 105, 0.3);
  border-bottom: none;
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 4px rgba(160, 70, 85, 0.08);
}

.envelope.open .envelope-flap {
  transform: rotateX(178deg);
}

/* روی پاکت */
.envelope-front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 190px;
  background:
    linear-gradient(180deg, #f5c0cd 0%, #e092a4 40%, #d07e91 100%);
  border-radius: 0 0 16px 16px;
  border: 1.5px solid rgba(180, 90, 105, 0.32);
  border-top: none;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 0 3px 8px rgba(160, 70, 85, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

/* خط ظریف بالای قسمت جلو (لبه تا) */
.envelope-front::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(180, 90, 105, 0.25) 20%,
    rgba(180, 90, 105, 0.25) 80%,
    transparent 100%
  );
}

/* مهر قلب */
.heart-seal {
  width: 74px;
  height: 74px;
  background: linear-gradient(145deg, #ffffff 0%, #fff5f7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(201, 123, 132, 0.2);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.14),
    0 4px 10px rgba(201, 123, 132, 0.15),
    0 0 0 7px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: sealPulse 2.6s ease-in-out infinite;
}

.heart-seal .heart {
  font-size: 36px;
  line-height: 1;
}

.heart-seal.hide {
  transform: scale(0);
  opacity: 0;
}

@keyframes sealPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.07); }
}

/* کاغذ داخل */
.letter-peek {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  height: 160px;
  background: linear-gradient(175deg, #fffefb 0%, #fff8f5 100%);
  border-radius: 10px;
  z-index: 2;
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
  border: 1px solid rgba(232, 160, 176, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 2px 8px rgba(201, 123, 132, 0.08);
}

.letter-peek.show {
  opacity: 1;
  transform: translateY(0);
}

/* راهنما */
.tap-hint {
  font-size: 15.5px;
  color: #c97b84;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  padding: 13px 28px;
  border-radius: 40px;
  box-shadow: 0 6px 20px rgba(201, 123, 132, 0.18);
  transition: all 0.5s ease;
  animation: hintFloat 2.2s ease-in-out infinite;
}

.tap-hint.hide {
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
}

@keyframes hintFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ریسپانسیو */
@media (max-width: 520px) {
  .envelope-wrapper {
    width: 320px;
    height: 225px;
  }
  .envelope-flap {
    height: 112px;
  }
  .envelope-front {
    height: 145px;
  }
  .heart-seal {
    width: 60px;
    height: 60px;
  }
  .heart-seal .heart {
    font-size: 30px;
  }
}

@media (max-width: 380px) {
  .envelope-wrapper {
    width: 280px;
    height: 197px;
  }
  .envelope-flap {
    height: 98px;
  }
  .envelope-front {
    height: 128px;
  }
}
</style>
