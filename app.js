const dotenv = require('dotenv').config()
// Server Packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Authentication Packages
const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')

// Initialize Server
const app = express()

// Connect to MongoDB Atlas Database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Authentication Middleware
// Access Token must be verified against Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Get secret key from Auth0
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
  }),

  // Validate audience and issuer
  audience: process.env.AUTH0_API_IDENTIFIER,
  issuer: `https://${process.env.AUTH0_DOMAIN}`,
  algorithms: ['RS256']
})

// Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CORS Configuation
app.use((req, res, next) => {
  // Allowed client port
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_PORT)
  // Allowed HTTP verbs
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Next layer
  next()
})

// Routes
require('./controllers/projects.js')(app, checkJwt)
require('./controllers/articles.js')(app, checkJwt)

// Start Server
app.listen(process.env.PORT, () => {
  console.info(
    `🌎🚀 Server now listening on Port: ${process.env.PORT} | Environment: ${app.get('env')}`
  )
})