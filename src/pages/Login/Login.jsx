import styles from './Login.module.css'

import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login, error: authError, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')


    const user = {
      email,
      password
    }

    const res = await login(user)

   
  }

  useEffect(() => {
    setError(authError)
  }, [authError])


  return (

      <div className={styles.login}>
        <h1>Entre na sua conta</h1>
        <p>Faça o login para poder utilizar o blog</p>
        <form onSubmit={handleSubmit}>


          <label>
            <span>Email:</span>
            <input
              type="Email"
              name="displayEmail"
              required
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </label>

          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="displayPassword"
              required
              placeholder='senha'

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />



            {!loading && <button className='btn'>Entrar</button>}
            {loading && <button className='btn' disabled>Aguarde...</button>}

            {error && <p className='error'>{error}</p>}

          </label>

        </form>
      </div>
   
  )
}

export default Login