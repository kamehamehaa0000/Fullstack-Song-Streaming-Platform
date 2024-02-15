import React from 'react'
import { useState } from 'react'
import TextInput from './shared/TextInput'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'
const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black dark:text-white">
      <div className="w-full flex items-center justify-center mb-8">
        <Icon icon="logos:spotify" className="text-6xl" />
      </div>

      <p className="font-semibold text-lg mb-8 text-center">
        Sign-Up for free, To start listening on{' '}
        <span className="text-green-500">Spotify</span>
      </p>

      <div className="max-w-md w-full p-6 bg-white text-black rounded-lg  sm:shadow-lg dark:bg-black dark:text-white ">
        <TextInput
          label={'Email Address'}
          placeholder={'Enter your email address'}
          type={'text'}
          value={email}
          onChange={setEmail}
        />
        <TextInput
          label={'Confirm Email Address'}
          placeholder={'Confirm your email address'}
          type={'text'}
          value={confirmEmail}
          onChange={setConfirmEmail}
        />
        <TextInput
          label={'What should we call you ?'}
          placeholder={'Enter your Username '}
          type={'text'}
          value={username}
          onChange={setUsername}
        />
        <TextInput
          label={'Create Password'}
          placeholder={'Enter a strong Password'}
          type="password"
          value={password}
          onChange={setPassword}
        />
        <TextInput
          label={'Confirm your Password'}
          placeholder={'Confirm your Password'}
          type="password"
          value={confirmPass}
          onChange={setConfirmPass}
        />
        <div className="flex items-center justify-between mt-4">
          <h5 className="text-sm hover:text-green-500">Forgot Password?</h5>
          <button className="px-4 py-2 text-white bg-green-500 rounded-full ">
            Sign Up
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold">Already have an account?</p>
        <NavLink to={'/login'}>
          <button className="px-5 py-2 border-2 border-black text-black rounded-full mt-4 bg-transparent hover:bg-green-500 hover:text-white dark:border-white dark:text-white">
            Login
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default SignUp
