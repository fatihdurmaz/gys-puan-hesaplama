// Exam start in Turkey time (UTC+03:00).
export const EXAM_DATE = Date.parse('2026-11-28T10:00:00+03:00')
const EXAM_DAY_END = Date.parse('2026-11-29T00:00:00+03:00')
export function getCountdown(now = Date.now()) {
  const seconds = Math.max(0, Math.ceil((EXAM_DATE - now) / 1000))
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
    status: now < EXAM_DATE ? 'upcoming' : now < EXAM_DAY_END ? 'today' : 'past',
  }
}
