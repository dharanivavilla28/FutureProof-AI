const { mockJobs } = require('../data/mockJobs')

function normalize(skill) {
  return String(skill || '').trim().toLowerCase()
}

function rankJobs(candidateSkills, selectedRole) {
  const candidateSet = new Set(candidateSkills.map(normalize))
  const filtered = selectedRole
    ? mockJobs.filter((job) => job.role.toLowerCase() === selectedRole.toLowerCase())
    : mockJobs

  return filtered
    .map((job) => {
      const matches = job.requiredSkills.filter((skill) => candidateSet.has(normalize(skill)))
      const matchScore = job.requiredSkills.length
        ? Math.round((matches.length / job.requiredSkills.length) * 100)
        : 0

      return {
        ...job,
        matchedSkills: matches,
        matchScore,
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}

module.exports = {
  rankJobs,
}
