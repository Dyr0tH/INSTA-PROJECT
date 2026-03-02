import React, { useState } from 'react'
import { Link } from 'react-router'
import { userAuth } from '../hooks/userAuth';
import '../styles/form.scss'
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleRegister, loading } = userAuth();

  const handleformSubmit = async (e) => {
    e.preventDefault()
    handleRegister(username, email, password);
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form
          onSubmit={handleformSubmit}
        >

          <input
            onChange={(e) => { setEmail(e.target.value) }}
            value={email}
            type="text"
            name=""
            id=""
            placeholder='Enter email' />

          <input
            onChange={(e) => { setUsername(e.target.value) }}
            value={username}
            type="text"
            name="" id=""
            placeholder='Enter a username' />

          <input
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            type="password"
            name="" id=""
            placeholder='Enter password' />

          {
            loading ?
              <button type="submit" className='button primary-button'>Getting you registered...</button> 
              :
              <button type="submit" className='button primary-button'>Register</button>
          }
        </form>

        <p>Already have an account ? <Link className='toggleAuthForm' to="/login">Login</Link></p>

      </div>

    </main>
  )
}

export default Register
