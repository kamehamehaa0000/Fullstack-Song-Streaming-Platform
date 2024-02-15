import jwt from 'jsonwebtoken'
const getToken = async (email, user) => {
  const token = await jwt.sign({ identifier: user._id }, process.env.JWT_SECRET)
  return token
}
export default getToken
