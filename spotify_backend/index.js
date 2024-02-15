import express, { Router } from 'express'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
dotenv.config({
  path: './.env',
})
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import { User } from './models/user.model.js'
const app = express()
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
      console.log(user)
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
import authRoutes from './routes/auth.route.js'
import songRoutes from './routes/song.route.js'
import playlistRoutes from './routes/playlist.route.js'
app.use('/auth', authRoutes)
app.use('/song', songRoutes)
app.use('/playlist', playlistRoutes)

/////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('server is running on port ', process.env.PORT || 3000)
})
