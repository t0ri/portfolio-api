const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String, required: true },
  technologies: { type: String, required: true },

  created: { type: String, required: true },
  
  img: { type: String, required: true },
  
  repoLink: { type: String, required: true },
  liveLink: { type: String, required: false },
  
  articleLink: { type: String, required: false },
  articleTitle: { type: String, required: false }
})

module.exports = mongoose.model('Project', ProjectSchema, 'Projects')