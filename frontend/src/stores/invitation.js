import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInvitationStore = defineStore('invitation', () => {
  const location = ref(null)
  const locationNote = ref('')
  const date = ref('')
  const time = ref('')
  const isSubmitted = ref(false)
  const submitError = ref(null)

  function setLocation(loc, note = '') {
    location.value = loc
    locationNote.value = note
  }

  function setDate(d) {
    date.value = d
  }

  function setTime(t) {
    time.value = t
  }

  function reset() {
    location.value = null
    locationNote.value = ''
    date.value = ''
    time.value = ''
    isSubmitted.value = false
    submitError.value = null
  }

  async function submitInvitation(telegramId = '') {
    submitError.value = null

    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: location.value,
          locationNote: locationNote.value,
          date: date.value,
          time: time.value,
          telegramId: telegramId || ''
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'خطا در ثبت پاسخ')
      }

      isSubmitted.value = true
      return data
    } catch (error) {
      submitError.value = error.message
      throw error
    }
  }

  return {
    location,
    locationNote,
    date,
    time,
    isSubmitted,
    submitError,
    setLocation,
    setDate,
    setTime,
    reset,
    submitInvitation
  }
})
