import express from 'express'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

dotenv.config({
  path: './.env',
})
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import { User } from './models/user.model.js'

app.use(express.json())

///////////////-DATABASE-CONNECTION-/////////
connectDB()

/////////////////-Passport-jwt setup-////////////////////

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub })
      if (!user || (user.tokens && user.tokens.includes(jwt_payload.token))) {
        // Token is either invalid or revoked
        return done(null, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  })
)
////////////////////////--ROUTES//////////////////////////////
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>')
})
import userRouter from './routes/user.routes.js'
import songRoutes from './routes/song.routes.js'
import playlistRoutes from './routes/playlist.routes.js'
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/songs', songRoutes)
app.use('/api/v1/playlist', playlistRoutes)

/////////////////////////////////////////////////////////
app.listen(process.env.PORT, (req, res) => {
  console.log('server is running on port ', process.env.PORT || 3000)
})
