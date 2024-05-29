import { useState } from 'react'
import { Icon } from '@iconify/react'
import TextInput from './shared/TextInput'
import { NavLink, useNavigate } from 'react-router-dom'
import { makeUnauthenticatedPOSTrequest } from '../utils/apiCall'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
const Login = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['authToken'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dataToSend = {
    email,
    password,
  }
  const handleLogin = async () => {
    // if (dataToSend.email == '' || dataToSend.password == '') {
    //   return alert('Fill all fields')
    // }
    let response
    try {
      response = await makeUnauthenticatedPOSTrequest('/auth/login', dataToSend)
      const userData = response.data.data //user and token object
      if (response.data.success == true) {
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 7) //expires in 7 days from current date
        setCookie('authToken', userData.token, {
          path: '/',
          expires: expirationDate,
        })
        const userDets = JSON.stringify(response.data.data.user)
        setCookie('details', userDets, {
          path: '/',
          expires: expirationDate,
        })
        toast.success('Login Successfull!!')
        navigate('/home')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.message)
      } else {
        console.error('Unexpected error during login:', error)
        // Handle unexpected error in UI or perform other actions
      }
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black dark:text-white">
      <div className="w-full flex items-center justify-center mb-8">
        <Icon icon="logos:spotify" className="text-6xl" />
      </div>

      <p className="font-semibold text-lg mb-8 text-center">
        To continue, Log in to <span className="text-green-500">Spotify</span>
      </p>

      <div className="max-w-md w-full p-6 bg-white text-black rounded-lg  sm:shadow-lg dark:bg-black dark:text-white ">
        <TextInput
          label={'Email address'}
          placeholder={'Email address'}
          type={'text'}
          value={email}
          onChange={setEmail}
        />

        <TextInput
          label={'Password'}
          placeholder={'Password'}
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="flex items-center justify-between mt-4">
          <h5 className="text-sm hover:text-green-500">Forgot Password?</h5>
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-white bg-green-500 rounded-full "
          >
            Login
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold">Don't have an Account?</p>
        <NavLink to={'/signup'}>
          <button className="px-8 py-2 border-2 border-black text-black rounded-full mt-4 bg-transparent hover:bg-green-500 hover:text-white dark:border-white dark:text-white">
            SIGN UP FOR SPOTIFY
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Login
