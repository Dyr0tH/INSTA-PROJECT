import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
const Login = () => {

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmitForm(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/api/auth/login', {
      username: emailOrUsername,
      email: emailOrUsername,
      password
    }, {withCredentials: true})
    .then(res => {
      console.log(res.data);

      if(res.status === 200){
        setEmailOrUsername('');
        setPassword('');
      }
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmitForm}>
          <input
          onChange={(e) => {setEmailOrUsername(e.target.value)}}
          value={emailOrUsername}

           type="text" placeholder='Enter username or email' />
          <input 
          onChange={(e) => {setPassword(e.target.value)}}
          value={password}
          type="password" name="" id="" placeholder='Enter password' />
          <button type="submit">Login</button>
        </form>

        <p>Already have an account ? <Link className='toggleAuthForm' to="/register">Register</Link></p>

      </div>
    </main>
  )
}

export default Login
