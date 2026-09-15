export function calculateScore(total, correct) {
  if (![70, 80].includes(total) || !Number.isInteger(correct) || correct < 0 || correct > total) return null
  return { score: correct / total * 100, threshold: total * 0.6, remaining: Math.max(0, total * 0.6 - correct), passed: correct >= total * 0.6 }
}
