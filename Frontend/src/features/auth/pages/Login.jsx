import { useState } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import { userAuth } from '../hooks/userAuth'

const Login = () => {

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const { handleLogin, loading } = userAuth();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (emailOrUsername === '' || password === '') {
      console.log('fill both fields...')
    }
    else {
      await handleLogin(emailOrUsername, password)
      navigate('/')
    }
  }

  if(loading){
    return (
      <main> Loading... </main>
    )
  }


  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmitForm}>
          <input
            onChange={(e) => { setEmailOrUsername(e.target.value) }}
            value={emailOrUsername}

            type="text" placeholder='Enter username or email' />
          <input
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            type="password" name="" id="" placeholder='Enter password' />

          {
            loading ? <button type="submit" className='button primary-button'>Logging you in...</button> : <button type="submit" className='button primary-button'>Login</button>
          }


        </form>

        <p>Already have an account ? <Link className='toggleAuthForm' to="/register">Register</Link></p>

      </div>
    </main>
  )
}

export default Login
