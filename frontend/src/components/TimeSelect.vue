<template>
  <div class="stage">
    <div class="letter-paper">
      <div class="section-title">کی بریم؟ 📅🕐</div>

      <p class="time-label" style="margin-top: 0">روز و تاریخ رو انتخاب کن</p>

      <div class="weekday-grid">
        <button
          v-for="day in days"
          :key="day.id"
          class="wd-btn"
          :class="{ selected: selectedDayId === day.id }"
          @click="selectDay(day)"
        >
          {{ day.label }}
          <small>{{ day.dateText }}{{ day.isToday ? ' (امروز)' : '' }}</small>
        </button>
      </div>

      <p class="time-label">ساعت پیشنهادی (غروب قشنگه 🌅)</p>

      <div class="time-grid">
        <button
          v-for="t in timeSlots"
          :key="t.value"
          class="time-btn"
          :class="{ selected: selectedTime === t.value && !customTime }"
          @click="selectTime(t.value)"
        >
          {{ t.value }}
          <small>{{ t.label }}</small>
        </button>
      </div>

      <div class="custom-field">
        <label>زمان پیشنهادی خودت ✍️</label>
        <input
          v-model="customTime"
          type="text"
          placeholder="مثلاً ۱۹:۱۵ یا هر ساعتی"
          @input="onCustomInput"
        />
      </div>

      <button
        class="btn-next"
        :class="{ active: canProceed }"
        :disabled="!canProceed"
        @click="goNext"
      >
        ثبت و ببین نتیجه 🎉
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInvitationStore } from '@/stores/invitation'
import { getUpcomingDays } from '@/composables/useJalaliDates'

const emit = defineEmits(['next'])
const store = useInvitationStore()

const days = ref([])
const selectedDayId = ref(null)
const selectedDayFull = ref('')
const selectedTime = ref(null)
const customTime = ref('')

const timeSlots = [
  { value: '۱۶:۰۰', label: 'بعدازظهر' },
  { value: '۱۷:۰۰', label: 'غروب خورشید 🌅' },
  { value: '۱۸:۳۰', label: 'عصر' },
  { value: '۲۰:۰۰', label: 'شب' }
]

const canProceed = computed(() => {
  const hasDay = !!selectedDayId.value
  const hasTime = !!selectedTime.value || customTime.value.trim().length > 0
  return hasDay && hasTime
})

function selectDay(day) {
  selectedDayId.value = day.id
  selectedDayFull.value = day.full
}

function selectTime(value) {
  selectedTime.value = value
  customTime.value = ''
}

function onCustomInput() {
  if (customTime.value.trim()) {
    selectedTime.value = null
  }
}

function goNext() {
  if (!canProceed.value) return

  const finalTime = customTime.value.trim() || selectedTime.value || '۱۷:۰۰'
  const finalDate = selectedDayFull.value || '؟'

  store.setDate(finalDate)
  store.setTime(finalTime)
  emit('next')
}

onMounted(() => {
  days.value = getUpcomingDays(7)
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
  font-size: 19px;
  font-weight: 600;
  color: #c97b84;
  margin-bottom: 18px;
}

.time-label {
  text-align: center;
  font-size: 13px;
  color: #9a7a80;
  margin: 16px 0 10px;
}

.weekday-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-bottom: 6px;
}

.wd-btn {
  background: #fff;
  border: 2px solid #f8c8d4;
  border-radius: 14px;
  padding: 12px 6px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
  line-height: 1.45;
  color: #5a3a40;
}

.wd-btn small {
  display: block;
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
  font-weight: 400;
}

.wd-btn:hover {
  border-color: #e8a0b0;
  background: #ffd6e0;
  transform: translateY(-2px);
}

.wd-btn.selected {
  background: linear-gradient(135deg, #e88a9c, #d4788a);
  color: white;
  border-color: transparent;
  box-shadow: 0 6px 16px rgba(212, 120, 138, 0.35);
  transform: scale(1.03);
}

.wd-btn.selected small {
  opacity: 0.9;
}

.time-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.time-btn {
  background: #fff;
  border: 2px solid #f8c8d4;
  border-radius: 14px;
  padding: 13px 8px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  color: #5a3a40;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
}

.time-btn small {
  display: block;
  font-size: 11px;
  opacity: 0.8;
  margin-top: 3px;
  font-weight: 400;
}

.time-btn:hover {
  border-color: #e8a0b0;
  background: #ffd6e0;
  transform: translateY(-2px);
}

.time-btn.selected {
  background: linear-gradient(135deg, #e88a9c, #d4788a);
  color: white;
  border-color: transparent;
  box-shadow: 0 7px 18px rgba(212, 120, 138, 0.35);
  transform: scale(1.03);
}

.time-btn.selected small {
  opacity: 0.9;
}

.custom-field {
  margin-top: 4px;
}

.custom-field label {
  display: block;
  margin-bottom: 7px;
  font-size: 13px;
  color: #c97b84;
  font-weight: 500;
}

.custom-field input {
  width: 100%;
  border: 2px solid #f8c8d4;
  border-radius: 14px;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 14.5px;
  background: #fff;
  color: #5a3a40;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.custom-field input:focus {
  border-color: #d4788a;
  box-shadow: 0 0 0 4px rgba(212, 120, 138, 0.14);
}

.btn-next {
  width: 100%;
  margin-top: 18px;
  background: linear-gradient(135deg, #e88a9c, #d4788a);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 50px;
  font-family: inherit;
  font-size: 15.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(212, 120, 138, 0.32);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.42;
  pointer-events: none;
}

.btn-next.active {
  opacity: 1;
  pointer-events: auto;
}

.btn-next.active:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(212, 120, 138, 0.42);
}

.btn-next.active:active {
  transform: scale(0.97);
}

@media (max-width: 420px) {
  .weekday-grid,
  .time-grid {
    gap: 8px;
  }
  .wd-btn {
    padding: 10px 4px;
    font-size: 13px;
  }
  .time-btn {
    padding: 11px 6px;
    font-size: 14px;
  }
}
</style>
