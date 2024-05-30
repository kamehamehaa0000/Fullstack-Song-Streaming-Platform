import React, { useEffect } from 'react'
import { useState } from 'react'
import TextInput from './shared/TextInput'
import { Icon } from '@iconify/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { makeUnauthenticatedPOSTrequest } from '../utils/apiCall.js'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  //for storing token on cookies
  const [cookie, setCookie, removeCookie] = useCookies(['userData'])
  const dataToSend = {
    firstName,
    lastName,
    email: email.trim(),
    username,
    password,
  }
  const clearAllInputs = () => {
    setFirstName('')
    setLastName('')
    setConfirmEmail('')
    setEmail('')
    setPassword('')
    setConfirmPass('')
    setUsername('')
  }
  const navigate = useNavigate()

  const handleSignUp = async () => {
    if (confirmEmail == email && confirmPass == password) {
      let response
      try {
        response = await makeUnauthenticatedPOSTrequest(
          '/auth/register',
          dataToSend
        )
        if (response.data.success == true) {
          const token = response.data.data.token

          const userDets = JSON.stringify(response.data.data.user)
          const expirationDate = new Date()
          expirationDate.setDate(expirationDate.getDate() + 7) //expires in 7 days from current date

          setCookie('authToken', token, {
            path: '/',
            expires: expirationDate,
          })
          setCookie('details', userDets, {
            path: '/',
            expires: expirationDate,
          })

          toast.success('Successfully Registered , Proceed to Login')
          clearAllInputs()
          navigate('/home')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.message)
        } else {
          console.error('Unexpected error during registeration:', error)
        }
      }
    } else {
      alert('Confirm your email and password')
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black dark:text-white">
      <div className="w-full flex items-center justify-center mb-8">
        <Icon icon="logos:spotify" className="text-6xl" />
      </div>

      <p className="font-semibold text-lg mb-8 text-center">
        Sign-Up for free, To start listening on{' '}
        <span className="text-green-500">Groove</span>
      </p>

      <div className="max-w-md w-full p-4 bg-white text-black rounded-lg  sm:shadow-lg dark:bg-black dark:text-white ">
        <div className="flex">
          <TextInput
            label={'First Name'}
            placeholder={'Enter your First Name'}
            type={'text'}
            value={firstName}
            onChange={setFirstName}
          />
          <TextInput
            label={'Last Name'}
            placeholder={'Enter your Last Name'}
            type={'text'}
            value={lastName}
            onChange={setLastName}
          />
        </div>
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
          <button
            className="relative w-[150px]  my-4  px-4 py-1 rounded-full bg-zinc-900 isolation-auto z-10 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold">Already have an account?</p>
        <NavLink to={'/login'}>
          <button className="relative w-[150px]  my-4  px-4 py-1 rounded-full bg-zinc-900 isolation-auto z-10 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
            Login
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default SignUp
