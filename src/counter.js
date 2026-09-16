export function setupCalculationCounter({ element, getCalculation }) {
  let timer
  let lastCounted = null
  let revision = 0
  const endpoint = new URL('sayac.php', document.baseURI)

  async function request(method) {
    const response = await fetch(endpoint, { method, cache: 'no-store' })
    if (!response.ok) throw new Error('Sayaç isteği başarısız.')
    const data = await response.json()
    if (!Number.isSafeInteger(data.toplamHesaplama) || data.toplamHesaplama < 0) {
      throw new Error('Geçersiz sayaç yanıtı.')
    }
    return data.toplamHesaplama
  }

  function showCount(count) {
    element.textContent = count.toLocaleString('tr-TR')
    element.closest('.calculation-count').hidden = false
  }

  // A delayed initial read must not overwrite a more recent increment.
  request('GET').then(count => {
    if (revision === 0) showCount(count)
  }).catch(() => {})

  function cancel() {
    clearTimeout(timer)
  }

  function schedule() {
    cancel()
    const calculation = getCalculation()
    if (!calculation || calculation === lastCounted) return
    timer = setTimeout(async () => {
      lastCounted = calculation
      const currentRevision = ++revision
      try {
        const count = await request('POST')
        if (currentRevision === revision) showCount(count)
      } catch {
        // Keep score calculation usable even if the counter is unavailable.
      }
    }, 1000)
  }

  return { schedule, cancel }
}
