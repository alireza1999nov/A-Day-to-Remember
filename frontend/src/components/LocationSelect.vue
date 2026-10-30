<template>
  <div class="stage">
    <div class="letter-paper">
      <div class="section-title">کجا بریم؟ 🗺️</div>

      <div class="location-grid">
        <div
          v-for="loc in locations"
          :key="loc.id"
          class="loc-card"
          :class="{ selected: selectedId === loc.id }"
          @click="selectLocation(loc)"
        >
          <div class="img-wrap">
            <img :src="loc.image" :alt="loc.label" loading="lazy" />
          </div>
          <div class="label">{{ loc.label }}</div>
        </div>
      </div>

      <Transition name="field">
        <div v-if="showCustom" class="custom-field">
          <label>نظرتو بنویس ✍️</label>
          <textarea
            v-model="customNote"
            rows="2"
            placeholder="هر جایی که دوست داری..."
            maxlength="120"
          />
        </div>
      </Transition>

      <button
        class="btn-next"
        :class="{ active: canProceed }"
        :disabled="!canProceed"
        @click="goNext"
      >
        بریم مرحله بعد ➡️
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInvitationStore } from '@/stores/invitation'

const emit = defineEmits(['next'])
const store = useInvitationStore()

const locations = [
  {
    id: 'high',
    label: 'بالا بلندیاااا 🏔️',
    value: 'بالا بلندیاااا',
    image: 'https://blog.safartop.com/wp-content/uploads/2024/12/1-%DA%A9%D8%A7%D9%88%D8%B1-3.webp'
  },
  {
    id: 'cafe',
    label: 'کافه با صفا ☕',
    value: 'کافه با صفا',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=250&fit=crop'
  },
  {
    id: 'walk',
    label: 'پیاده روی عاشقانه 🍂',
    value: 'پیاده روی عاشقانه',
    image: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=400&h=250&fit=crop'
  },
  {
    id: 'custom',
    label: 'هر جا تو بگی ! ✨',
    value: 'هر جا تو بگی',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=250&fit=crop'
  }
]

const selectedId = ref(null)
const customNote = ref('')

const showCustom = computed(() => selectedId.value === 'custom')

const canProceed = computed(() => {
  if (!selectedId.value) return false
  if (selectedId.value === 'custom') {
    return customNote.value.trim().length > 0
  }
  return true
})

function selectLocation(loc) {
  selectedId.value = loc.id
  if (loc.id !== 'custom') {
    customNote.value = ''
  }
}

function goNext() {
  if (!canProceed.value) return

  const selected = locations.find(l => l.id === selectedId.value)
  const note = selectedId.value === 'custom' ? customNote.value.trim() : ''

  store.setLocation(selected.value, note)
  emit('next')
}
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
  margin-bottom: 20px;
}

.location-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 8px;
}

.loc-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(201, 123, 132, 0.14);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 2.5px solid transparent;
  position: relative;
}

.loc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 30px rgba(201, 123, 132, 0.22);
}

.loc-card.selected {
  border-color: #d4788a;
  transform: scale(1.03);
  box-shadow: 0 12px 28px rgba(212, 120, 138, 0.32);
}

.loc-card.selected::after {
  content: '✓';
  position: absolute;
  top: 8px;
  left: 8px;
  width: 22px;
  height: 22px;
  background: #d4788a;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.img-wrap {
  overflow: hidden;
  height: 92px;
}

.loc-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

.loc-card:hover img {
  transform: scale(1.07);
}

.loc-card .label {
  padding: 11px 6px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #5a3a40;
  line-height: 1.35;
}

.custom-field {
  margin-top: 16px;
}

.custom-field label {
  display: block;
  margin-bottom: 7px;
  font-size: 13px;
  color: #c97b84;
  font-weight: 500;
}

.custom-field textarea {
  width: 100%;
  border: 2px solid #f8c8d4;
  border-radius: 14px;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 14.5px;
  background: #fff;
  color: #5a3a40;
  outline: none;
  resize: none;
  transition: border-color 0.25s, box-shadow 0.25s;
  line-height: 1.5;
}

.custom-field textarea:focus {
  border-color: #d4788a;
  box-shadow: 0 0 0 4px rgba(212, 120, 138, 0.14);
}

.btn-next {
  width: 100%;
  margin-top: 20px;
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

.field-enter-active,
.field-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.field-enter-from,
.field-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 420px) {
  .location-grid {
    gap: 10px;
  }
  .img-wrap {
    height: 82px;
  }
  .loc-card .label {
    font-size: 12.5px;
    padding: 10px 4px;
  }
}
</style>
