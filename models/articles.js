const mongoose = require('mongoose')

const ArticlesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
})

module.exports = mongoose.model('Article', ArticlesSchema, 'Articles')