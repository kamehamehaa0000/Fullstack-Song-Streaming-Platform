import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import getToken from '../util/getToken.util.js'
import passport from 'passport'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body
  if (!email || !password || !firstName || !lastName || !username) {
    throw new Error('All credentials are req')
  }

  try {
    const user = await User.findOne({ email }) //check if already exist
    if (user) {
      return res
        .status(403)
        .json({ error: 'A user with these credential already exist' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    //creating new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    })
    //removing password from new user to send in response
    const createdUser = await User.findById(newUser._id).select('-password')

    //creating refresh token
    const token = await getToken(email, newUser)

    return res.status(200).json({ user: createdUser, token: token })
  } catch (error) {
    return res.status(500).json({ error: 'error while registering user' })
  }
})
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw new Error('Please enter both email and password fields.')
    }

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Invalid Credentials.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid Credentials')
    }

    const token = await getToken(email, user)

    return res
      .status(200)
      .json({ user: { _id: user._id, email: user.email }, token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error during login.' })
  }
})
// router.post('/logout', (req, res) => {
//   //client side logout approach used
//   //client need to remove the BearerToken from headers in client side
//   return res.status(200).json({ message: 'Logout Successful' })
// })
router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Add the current token to the blacklist (you need to implement this part)
    // This can be a database, cache, or any storage to keep track of revoked tokens

    // For demonstration purposes, you can create a simple array to store revoked tokens

    console.log(req.user.tokens)
    if (!req.user.tokens) {
      req.user.tokens = []
    }

    // Add the current token to the blacklist
    req.user.tokens.push(req.headers.authorization.split(' ')[1])
    console.log(req.user.tokens)
    // Respond with a success message
    return res.status(200).json({ message: 'Logout successful' })
  }
)
export default router
