const axios = require('axios')
const FormData = require('form-data')

async function parseResumeSkills({ file, text, fastApiUrl, fallbackExtractor }) {
  if (file) {
    const formData = new FormData()
    formData.append('file', file.buffer, { filename: file.originalname })

    const aiRes = await axios.post(`${fastApiUrl}/analyze-resume`, formData, {
      headers: formData.getHeaders(),
    })
    return aiRes.data.found || []
  }

  if (text) {
    return fallbackExtractor(text)
  }

  return []
}

module.exports = {
  parseResumeSkills,
}
