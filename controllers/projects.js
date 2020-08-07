const Project = require('../models/projects')

module.exports = (app, checkJwt) => {
  // RETURN ALL PROJECTS
  app.get('/projects', checkJwt, (req, res) => {
    // Get all Projects
    Project.find({})
      .then((projects) => {
        // If 0 projects are found
        if (Object.keys(projects).length === 0) {
          // Respond Not Found, return message
          res.status(404).send({ message: 'No projects found' })
        }
        // Respond OK, return projects
        res.status(200).json(projects)
      })
    .catch((err) => {
      // Respond Server Error, return error message
      res.status(500).send({ message: err.message })
      new Error(err.message)
    })
  })


  // CREATE A NEW PROJECT
  app.post('/projects', checkJwt, (req, res) => {
    // Create new Project object
    const project = new Project(req.body)
    // Save project to DB
    project.save()
      .then(() => {
        // Respond OK, return project._id
        res.status(201).send({ message: 'New project created', id: project._id })
    })
    .catch((err) => {
      // Respond Server Error, return error message
      res.status(500).send({ message: err.message })
      new Error(err.message)
    })
  })


  // RETURN ONE PROJECT
  app.get('/projects/:id', checkJwt, (req, res) => {
    // Find a Project by `id` passed through request parameters
    Project.findById(req.params.id)
      .then((project) => {
        // If a project is not found
        if (project === null) {
          // Respond Not Found, return message
          res.status(404).send({ message: 'No project found'})
        } else {
          // Respond OK, return project
          res.status(200).json({ project }).end()
        }
      })
      .catch((err) => {
        // Respond Server Error, return error message
        res.status(500).send({ message: err.message })
        new Error(err.message)
      })
  })


  // UPDATE ONE PROJECT
  app.put('/projects/:id', checkJwt, (req, res) => {
    // Find a Project by `id` passed through request parameters
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
      // Respond OK, return updated project
      .then((project) => res.status(200).json({ project }))
      .catch((error) => {
        // Respond Server Error, return error message
        res.status(500).send({ message: err.message })
        new Error(error.message)
      })
  })


  // DELETE ONE PROJECT
  app.delete('/projects/:id', checkJwt, (req, res) => {
    // Find a Project by `id` passed through request parameters
    Project.findByIdAndRemove({ _id: req.params.id })
      // Respond OK, return message
      .then(() => res.status(200).send({ message: 'Project successfully deleted' }))
      .catch((err) => {
        // Respond Server Error, return error message
        res.status(500).send({ message: err.message })
        new Error(err.message)
      })
  })
}