<template>
  <div class="stage">
    <div class="letter-paper">
      <div class="letter-title">💌 دعوت‌نامه رسمی</div>

      <div class="letter-text">
        <span v-for="(char, i) in displayedChars" :key="i">{{ char === '\n' ? '\n' : char }}</span>
        <span v-if="isTyping" class="cursor"></span>
      </div>

      <div class="stickers">
        <span>☕</span>
        <span>🥰</span>
        <span>🌸</span>
        <span>✨</span>
      </div>

      <div class="buttons-row" ref="btnRow">
        <button class="btn btn-yes" @click="handleYes">
          آره 💖
        </button>

        <button
          class="btn btn-no"
          ref="noBtn"
          :style="noBtnStyle"
          @mouseenter="onNoHover"
          @touchstart.prevent="onNoTouch"
          @click.prevent="onNoClick"
        >
          نه 🙈
        </button>
      </div>

      <div class="hint-msg" :class="{ show: hintVisible }">
        {{ currentHint }}
      </div>

      <div class="pleading" :class="{ show: showPlead }">
        😌✨
      </div>
    </div>

    <Transition name="wise">
      <div v-if="showWise" class="wise-msg">
        انتخاب عاقلانه‌ای بود 😌
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['accepted'])

const fullText = 'شنیدم دوست داری با من بیای\nیه تابی بخوریم !!'
const displayedChars = ref([])
const isTyping = ref(true)

const noClicks = ref(0)
const noBtnStyle = ref({})
const noBtn = ref(null)
const btnRow = ref(null)
const hintVisible = ref(false)
const currentHint = ref('')
const showPlead = ref(false)
const showWise = ref(false)
const noHidden = ref(false)

const hints = [
  '',
  '',
  'این دکمه بیشتر جنبه تزئیناتی داره... بهتره سراغ گزینه اصلی بری.',
  'جالبه. هنوز اصرار داری؟ گزینه سمت چپ خیلی منطقی‌تر به نظر می‌رسه.',
  'دارم کم‌کم به این نتیجه می‌رسم که شیطنتت بیشتر از مخالفتته.',
  'با این سرعت فرار کردن، احتمالاً باید برات مسیر فرار طراحی کنم.',
  'آخرین باره که این دکمه رو می‌بینی. بعد از این فقط یک گزینه باقی می‌مونه.',
  'خب... دیگه تموم شد. فقط «آره» مونده.'
]

function typeText() {
  let i = 0
  displayedChars.value = []

  function type() {
    if (i < fullText.length) {
      displayedChars.value.push(fullText[i])
      i++
      setTimeout(type, 48 + Math.random() * 28)
    } else {
      isTyping.value = false
    }
  }

  setTimeout(type, 380)
}

function moveNoButton() {
  if (noHidden.value || !noBtn.value || !btnRow.value) return

  const row = btnRow.value.getBoundingClientRect()
  const btn = noBtn.value.getBoundingClientRect()

  const maxX = Math.max(row.width - btn.width - 20, 40)
  const maxY = 90

  const x = (Math.random() * maxX) - (maxX / 2)
  const y = (Math.random() * maxY) - 30

  noBtnStyle.value = {
    position: 'absolute',
    transform: `translate(${x}px, ${y}px)`,
    transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }
}

function handleNoInteraction() {
  noClicks.value++

  if (noClicks.value >= 3 && noClicks.value <= 7) {
    currentHint.value = hints[noClicks.value] || hints[7]
    hintVisible.value = true
  }

  if (noClicks.value >= 6) {
    showPlead.value = true
  }

  if (noClicks.value >= 8) {
    currentHint.value = hints[7]
    noHidden.value = true
    noBtnStyle.value = { display: 'none' }
  }

  moveNoButton()
}

function onNoHover() {
  handleNoInteraction()
}

function onNoTouch() {
  handleNoInteraction()
}

function onNoClick() {
  handleNoInteraction()
}

function handleYes() {
  showWise.value = true

  setTimeout(() => {
    showWise.value = false
    emit('accepted')
  }, 1300)
}

onMounted(() => {
  typeText()
})
</script>

<style scoped>
.stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: relative;
}

.letter-paper {
  background: linear-gradient(175deg, #fffefb 0%, #fff7f9 100%);
  border-radius: 22px;
  padding: 34px 28px 30px;
  box-shadow:
    0 28px 55px rgba(201, 123, 132, 0.22),
    0 10px 24px rgba(0, 0, 0, 0.04),
    inset 0 0 0 1px rgba(232, 160, 176, 0.25);
  max-width: 460px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.letter-paper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #f8c8d4, #e6d5f2, #f5e6c8, #f8c8d4);
  background-size: 200% 100%;
  animation: shimmer 4.5s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.letter-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #c97b84;
  margin-bottom: 18px;
  letter-spacing: -0.2px;
}

.letter-text {
  font-size: 17.5px;
  line-height: 2.1;
  text-align: center;
  min-height: 78px;
  color: #5a3a40;
  white-space: pre-line;
  margin-bottom: 8px;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.15em;
  background: #c97b84;
  margin-right: 2px;
  vertical-align: middle;
  animation: blink 0.75s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.stickers {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 20px 0 26px;
  font-size: 30px;
}

.stickers span {
  display: inline-block;
  animation: floatSticker 3.4s ease-in-out infinite;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.08));
  transition: transform 0.3s;
}

.stickers span:hover {
  transform: scale(1.22) rotate(6deg);
}

.stickers span:nth-child(2) { animation-delay: 0.5s; }
.stickers span:nth-child(3) { animation-delay: 1s; }
.stickers span:nth-child(4) { animation-delay: 1.5s; }

@keyframes floatSticker {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-8px) rotate(4deg); }
}

.buttons-row {
  display: flex;
  gap: 18px;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 64px;
}

.btn {
  border: none;
  border-radius: 50px;
  padding: 15px 36px;
  font-family: inherit;
  font-size: 16.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
  flex-shrink: 0;
}

.btn-yes {
  background: linear-gradient(135deg, #e88a9c, #d4788a);
  color: white;
  box-shadow: 0 10px 26px rgba(212, 120, 138, 0.4);
  order: 1;
}

.btn-yes:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 14px 32px rgba(212, 120, 138, 0.5);
}

.btn-yes:active {
  transform: scale(0.96);
}

.btn-no {
  background: #f3e6e9;
  color: #9a7a80;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;
  order: 2;
}

.hint-msg {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #c97b84;
  min-height: 22px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.4s ease;
  line-height: 1.6;
  padding: 0 8px;
}

.hint-msg.show {
  opacity: 1;
  transform: translateY(0);
}

.pleading {
  text-align: center;
  margin-top: 10px;
  font-size: 24px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pleading.show {
  opacity: 1;
  transform: scale(1);
}

.wise-msg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  padding: 28px 36px;
  border-radius: 18px;
  font-size: 20px;
  font-weight: 600;
  color: #c97b84;
  box-shadow: 0 18px 45px rgba(201, 123, 132, 0.25);
  z-index: 60;
  text-align: center;
}

.wise-enter-active,
.wise-leave-active {
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.wise-enter-from,
.wise-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.86);
}

@media (max-width: 480px) {
  .letter-paper {
    padding: 28px 20px 24px;
  }
  .btn {
    padding: 13px 28px;
    font-size: 15.5px;
  }
  .letter-text {
    font-size: 16.5px;
  }
}
</style>
