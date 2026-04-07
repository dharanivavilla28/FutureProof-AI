const roleSkills = {
  'Software Engineer': [
    'javascript', 'typescript', 'react', 'node.js', 'express', 'sql', 'docker', 'git',
  ],
  'Data Analyst': [
    'python', 'sql', 'excel', 'tableau', 'power bi', 'statistics', 'pandas',
  ],
  'Product Manager': [
    'roadmapping', 'stakeholder management', 'analytics', 'sql', 'agile', 'communication',
  ],
  'Machine Learning Engineer': [
    'python', 'tensorflow', 'pytorch', 'mlops', 'docker', 'kubernetes', 'sql',
  ],
  'Frontend Developer': [
    'javascript', 'typescript', 'react', 'html', 'css', 'testing', 'git',
  ],
}

const suggestedRoles = Object.keys(roleSkills)

module.exports = {
  roleSkills,
  suggestedRoles,
}
