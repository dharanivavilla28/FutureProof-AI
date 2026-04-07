const crypto = require('crypto')

const memoryCache = new Map()
const CACHE_TTL_MS = 1000 * 60 * 30

function createAnalysisKey({ role, fileBuffer, text }) {
  const payload = fileBuffer ? fileBuffer : Buffer.from(String(text || ''))
  const hash = crypto.createHash('sha256').update(payload).digest('hex')
  return `resume-analysis:${String(role || '').toLowerCase()}:${hash}`
}

function getCachedAnalysis(key) {
  const item = memoryCache.get(key)
  if (!item) return null
  if (Date.now() > item.expiresAt) {
    memoryCache.delete(key)
    return null
  }
  return item.value
}

function setCachedAnalysis(key, value) {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  })
}

module.exports = {
  createAnalysisKey,
  getCachedAnalysis,
  setCachedAnalysis,
}
