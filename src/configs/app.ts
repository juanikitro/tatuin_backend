import express from 'express'
import session from 'express-session'
import passport from 'passport'
import 'dotenv/config'

import apiEndpoints from '../routes/endpoints'
import authenticateToken from '../middlewares/authenticateToken'
import searchInRedis from '../middlewares/redisCache'
import { setUpGoogleAuth } from '../controllers/google_auth'

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT ?? 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: process.env.JWT_SECRET_KEY as string,
        resave: false,
        saveUninitialized: false,
    })
)

app.use(passport.initialize())
app.use(passport.session())

// Custom Middlewares
// app.use('/v1/api', authenticateToken); //TODO: Uncomment this line to enable authentication
app.use('/v1/api', searchInRedis)

// Set up Google Auth
setUpGoogleAuth()

// API Endpoints
apiEndpoints(app)

export default app
