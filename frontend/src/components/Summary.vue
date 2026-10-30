<template>
  <div class="stage">
    <div class="letter-paper">
      <div class="section-title">📜</div>

      <div class="summary-box">
        <div class="summary-item">
          <span class="label">دعوت</span>
          <span class="value">پذیرفته شد ✅</span>
        </div>
        <div class="summary-item">
          <span class="label">لوکیشن</span>
          <span class="value">{{ locationDisplay }}</span>
        </div>
        <div class="summary-item">
          <span class="label">تاریخ</span>
          <span class="value">{{ store.date || '—' }}</span>
        </div>
        <div class="summary-item">
          <span class="label">ساعت</span>
          <span class="value">{{ store.time || '—' }}</span>
        </div>
      </div>

      <div class="funny-quote">
        {{ randomQuote }}
      </div>

      <div class="stickers">
        <span>🥳</span>
        <span>💕</span>
        <span>🥹</span>
        <span>✨</span>
      </div>

      <div
        class="telegram-box"
        :class="{ disabled: !telegramId }"
        @click="openTelegram"
      >
        <template v-if="telegramId">
          یالا اسکرین رو بشات 🥳
          <br />
          به تلگرامم بفرستش ✈️
        </template>
        <template v-else>
          آیدی تلگرام مشخص نشده
          <br />
          <small>لینک باید شامل ?tg=username باشد</small>
        </template>
      </div>

      <p v-if="submitStatus" class="submit-status" :class="submitStatus.type">
        {{ submitStatus.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const launchConfetti = inject('launchConfetti', () => {})
const stopMusic = inject('stopMusic', () => {})

const quotes = [
  'حالا دیگه رسمی شد! قرارداد امضا شد، حق انصراف نداری 😎📜',
  'این صفحه رو نگه دار، روز محاکمه به کار میاد 😂⚖️',
  'تبریک! تو الان عضو باشگاه قرارهای قشنگ شدی 🎟️✨',
  'قول می‌دم اگه بیای، پشیمون نشی... وگرنه خودم پشیمون می‌شم 🥹💕',
  'از این لحظه به بعد، سرنوشت‌مون به هم گره خورده! 🔗😌',
  'این دعوت‌نامه ارزش تاریخی داره، آرشیوش کن 🗂️💕'
]

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
const telegramId = ref('')
const submitStatus = ref(null)

const locationDisplay = computed(() => {
  if (!store.location) return '—'
  if (store.location.includes('هر جا تو بگی') && store.locationNote) {
    return `هر جا تو بگی: ${store.locationNote}`
  }
  return store.location
})

function extractTelegramId() {
  const params = new URLSearchParams(window.location.search)
  const tg = params.get('tg') || params.get('telegram') || ''
  // فقط حروف، عدد، آندرلاین (یوزرنیم معتبر تلگرام)
  const cleaned = tg.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 32)
  telegramId.value = cleaned
}

async function trySubmitToBackend() {
  // ثبت پاسخ اختیاری است — اگر بک‌اند در دسترس نبود، خطا نشان نمی‌دهیم
  if (!store.location || !store.date || !store.time) return

  try {
    await store.submitInvitation(telegramId.value)
    submitStatus.value = {
      type: 'success',
      message: 'پاسخ دعوت ثبت شد'
    }
  } catch {
    // عمداً ساکت می‌مانیم تا تجربه کاربری خراب نشود
    // (چون ممکن است فقط فرانت روی Netlify باشد)
  }
}

function openTelegram() {
  if (!telegramId.value) return

  stopMusic()
  window.open(`https://t.me/${telegramId.value}`, '_blank')
}

onMounted(() => {
  extractTelegramId()
  launchConfetti()
  trySubmitToBackend()
})
</script>

<style scoped>
.stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px 40px;
}

.letter-paper {
  background: linear-gradient(175deg, #fffefb 0%, #fff7f9 100%);
  border-radius: 22px;
  padding: 30px 24px 26px;
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

.section-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 14px;
}

.summary-box {
  background: #fff;
  border-radius: 16px;
  padding: 14px 12px;
  box-shadow: 0 10px 26px rgba(201, 123, 132, 0.14);
  margin-bottom: 14px;
  border: 2px dashed #e8a0b0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 4px;
  border-bottom: 1px solid #f5e0e5;
  font-size: 14.5px;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item .label {
  color: #9a7a80;
}

.summary-item .value {
  font-weight: 600;
  color: #c97b84;
  text-align: left;
  max-width: 62%;
  line-height: 1.4;
}

.funny-quote {
  text-align: center;
  font-size: 14.5px;
  line-height: 1.85;
  background: linear-gradient(135deg, #fff5f7, #fce4ec);
  border-radius: 14px;
  padding: 14px;
  margin: 14px 0;
  border: 1px solid #f8c8d4;
  color: #5a3a40;
}

.stickers {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 12px 0 8px;
  font-size: 28px;
}

.stickers span {
  display: inline-block;
  animation: floatSticker 3.2s ease-in-out infinite;
}

.stickers span:nth-child(2) { animation-delay: 0.5s; }
.stickers span:nth-child(3) { animation-delay: 1s; }
.stickers span:nth-child(4) { animation-delay: 1.5s; }

@keyframes floatSticker {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-7px) rotate(4deg); }
}

.telegram-box {
  margin-top: 10px;
  border-radius: 16px;
  padding: 16px 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 600;
  font-size: 15.5px;
  user-select: none;
  background: linear-gradient(135deg, #2AABEE, #229ED9);
  color: white;
  box-shadow: 0 10px 24px rgba(42, 171, 238, 0.35);
  line-height: 1.55;
}

.telegram-box:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 0 14px 32px rgba(42, 171, 238, 0.45);
}

.telegram-box:active:not(.disabled) {
  transform: scale(0.97);
}

.telegram-box.disabled {
  background: #c5c5c5;
  box-shadow: none;
  cursor: not-allowed;
  font-size: 14px;
}

.telegram-box.disabled small {
  font-weight: 400;
  opacity: 0.9;
  font-size: 12px;
}

.submit-status {
  text-align: center;
  margin-top: 12px;
  font-size: 13px;
}

.submit-status.success {
  color: #2e7d4f;
}
</style>
