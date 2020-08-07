const Article = require('../models/articles')

module.exports = (app, checkJwt) => {
  // RETURN ALL ARTICLES
  app.get('/articles', (req, res) => {
    // Get all articles
    Article.find({})
      .then((articles) => {
        // If 0 articles are found
        if (Object.keys(articles).length === 0) {
          // Respond Not Found, return message
          res.status(404).send({ message: 'No articles found' })
        } else {
          // Respond OK, return articles
          res.status(200).json(articles)
        }
      })
    .catch((err) => {
      // Respond Server Error, return error message
      res.status(500).send({ message: err.message })
      new Error(err.message)
    })
  })


  // CREATE A NEW ARTICLE
  app.post('/articles', checkJwt, (req, res) => {
    // Create new Article object
    const article = new Article(req.body)
    // Save project to DB
    article.save()
      .then(() => {
        // Respond OK, return project._id
        res.status(201).send({ message: 'New article created', id: article._id })
    })
    .catch((err) => {
      // Respond Server Error, return error message
      res.status(500).send({ message: err.message })
      new Error(err.message)
    })
  })


  // UPDATE ONE ARTICLE
  app.put('/articles/:id', checkJwt, (req, res) => {
    // Find a Article by `id` passed through request parameters
    Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
      // Respond OK, return updated project
      .then((article) => res.status(200).json({ article }))
      .catch((error) => {
        // Respond Server Error, return error message
        res.status(500).send({ message: err.message })
        new Error(error.message)
      })
  })


  // DELETE ONE ARTICLE
  app.delete('/articles/:id', checkJwt, (req, res) => {
    // Find a Article by `id` passed through request parameters
    Article.findByIdAndRemove({ _id: req.params.id })
      // Respond OK, return message
      .then(() => res.status(200).send({ message: 'Article successfully deleted' }))
      .catch((err) => {
        // Respond Server Error, return error message
        res.status(500).send({ message: err.message })
        new Error(err.message)
      })
  })
}