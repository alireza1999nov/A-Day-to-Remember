<template>
  <div class="invitation-flow">
    <!-- Particles & Background همیشه حاضر -->
    <Particles />
    <Background :dimmed="currentStage !== 'envelope'" />

    <!-- Progress -->
    <ProgressDots
      v-if="currentStage !== 'envelope'"
      :current="stageNumber"
      :total="4"
    />

    <!-- مراحل -->
    <Transition name="stage" mode="out-in">
      <Envelope
        v-if="currentStage === 'envelope'"
        key="envelope"
        @opened="goTo('letter')"
      />

      <Letter
        v-else-if="currentStage === 'letter'"
        key="letter"
        @accepted="onAccepted"
      />

      <LocationSelect
        v-else-if="currentStage === 'location'"
        key="location"
        @next="goTo('time')"
      />

      <TimeSelect
        v-else-if="currentStage === 'time'"
        key="time"
        @next="goTo('summary')"
      />

      <Summary
        v-else-if="currentStage === 'summary'"
        key="summary"
      />
    </Transition>

    <!-- Confetti -->
    <Confetti ref="confettiRef" />

    <!-- Music -->
    <audio ref="bgMusic" loop preload="auto">
      <source
        src="https://dn721904.ca.archive.org/0/items/jamendo-448379/01-1870874-Makis%20Hager-Sincerely%20Yours%20_Soft%20and%20Romantic%20Piano_.mp3"
        type="audio/mpeg"
      />
    </audio>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import Particles from '@/components/Particles.vue'
import Background from '@/components/Background.vue'
import ProgressDots from '@/components/ProgressDots.vue'
import Envelope from '@/components/Envelope.vue'
import Letter from '@/components/Letter.vue'
import LocationSelect from '@/components/LocationSelect.vue'
import TimeSelect from '@/components/TimeSelect.vue'
import Summary from '@/components/Summary.vue'
import Confetti from '@/components/Confetti.vue'

const currentStage = ref('envelope')
const confettiRef = ref(null)
const bgMusic = ref(null)

const stageNumber = computed(() => {
  const map = { letter: 1, location: 2, time: 3, summary: 4 }
  return map[currentStage.value] || 0
})

function goTo(stage) {
  currentStage.value = stage
}

function onAccepted() {
  // پخش موسیقی
  if (bgMusic.value) {
    bgMusic.value.currentTime = 0
    bgMusic.value.play().catch(() => {})
  }
  // confetti
  confettiRef.value?.launch()
  // کمی تأخیر برای حس بهتر
  setTimeout(() => {
    goTo('location')
  }, 1400)
}

// برای قطع موسیقی از Summary
function stopMusic() {
  if (bgMusic.value) {
    bgMusic.value.pause()
    bgMusic.value.currentTime = 0
  }
}

provide('stopMusic', stopMusic)
provide('launchConfetti', () => confettiRef.value?.launch())
</script>

<style scoped>
.invitation-flow {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Transition بین مراحل */
.stage-enter-active,
.stage-leave-active {
  transition: all 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.stage-enter-from {
  opacity: 0;
  transform: translateY(36px) scale(0.97);
}

.stage-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
</style>
