import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import getToken from '../util/getToken.util.js'
import { asyncHandler } from '../util/asyncHandler.js'
import { ApiError } from '../util/ApiError.js'
import { ApiResponse } from '../util/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body
  try {
    if (!email || !password || !firstName || !lastName || !username) {
      throw new ApiError(400, 'All fields are Required')
    }
    //check if user already exist
    const user = await User.findOne({ email })
    if (user) {
      throw new ApiError(409, 'User with email or username already exists')
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

    //if user not created
    if (!createdUser) {
      throw new ApiError(500, 'Something went wrong while registering the user')
    }

    //creating refresh token
    const token = await getToken(email, newUser)

    //   return res.status(200).json({ user: createdUser, token: token })
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: createdUser, token: token },
          'User registered Successfully'
        )
      )
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(error.statusCode, {}, error.message))
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      throw new ApiError(400, 'username and email both are required')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(404, 'User does not exist')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new ApiError(401, 'Invalid user credentials')
    }

    const token = await getToken(email, user)
    console.log(await getToken(email, user))
    return res.status(200).json(
      new ApiResponse(200, {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        },
        token,
      })
    )
  } catch (error) {
    // return res
    //   .status(200)
    //   .json({ user: { _id: user._id, email: user.email }, token })
    return res
      .status(500)
      .json(new ApiResponse(error.statusCode, {}, error.message))
  }
})

export { registerUser, loginUser }
