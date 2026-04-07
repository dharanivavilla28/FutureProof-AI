const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: String,
  location: String,
  skills_required: [{ type: String }],
  salary_min: Number,
  salary_max: Number,
  date_posted: { type: Date, default: Date.now },
  source: String // LinkedIn, Indeed, etc.
});

module.exports = mongoose.model('Job', JobSchema);
