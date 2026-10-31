import dayjs from 'dayjs'
import jalaliday from 'jalaliday'

dayjs.extend(jalaliday)
dayjs.locale('fa')

const weekDays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']
const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
]

/**
 * برمی‌گرداند چند روز آینده به صورت شمسی (پیش‌فرض ۶ روز)
 */
export function getUpcomingDays(count = 6) {
  const days = []
  const today = dayjs().calendar('jalali')

  for (let i = 0; i < count; i++) {
    const d = today.add(i, 'day')
    const weekDayIndex = d.day() // 0 = Sunday in dayjs
    // در تقویم جلالی با jalaliday، day() همچنان بر اساس میلادی است
    // برای نام روز هفته از همان استفاده می‌کنیم

    days.push({
      id: d.format('YYYY-MM-DD'),
      label: weekDays[weekDayIndex],
      dateText: `${d.date()} ${months[d.month()]}`,
      full: `${weekDays[weekDayIndex]} ${d.date()} ${months[d.month()]}`,
      isToday: i === 0
    })
  }

  return days
}

export function formatJalali(date) {
  const d = dayjs(date).calendar('jalali')
  return `${weekDays[d.day()]} ${d.date()} ${months[d.month()]}`
}
