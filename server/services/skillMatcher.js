const { roleSkills } = require('../data/roleSkills')

function normalizeSkill(skill) {
  return String(skill || '').trim().toLowerCase()
}

function getRequiredSkillsForRole(role) {
  if (!role) return []
  return roleSkills[role] || []
}

function buildSkillGap(candidateSkills, requiredSkills) {
  const normalizedCandidate = new Set(candidateSkills.map(normalizeSkill))
  const matchingSkills = requiredSkills.filter((s) => normalizedCandidate.has(normalizeSkill(s)))
  const missingSkills = requiredSkills.filter((s) => !normalizedCandidate.has(normalizeSkill(s)))
  const matchPercentage = requiredSkills.length
    ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
    : 0

  return {
    matchingSkills,
    missingSkills,
    matchPercentage,
  }
}

module.exports = {
  getRequiredSkillsForRole,
  buildSkillGap,
}
