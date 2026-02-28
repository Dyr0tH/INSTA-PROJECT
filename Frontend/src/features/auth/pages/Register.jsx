import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleformSubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:3000/api/auth/register', {
      username,
      email,
      password
    }, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        if(res.status === '200'){
          setUsername('')
          setEmail('')
          setPassword('')
        }
      })
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

          <button type="submit">Register</button>
        </form>

        <p>Already have an account ? <Link className='toggleAuthForm' to="/login">Login</Link></p>

      </div>

    </main>
  )
}

export default Register
