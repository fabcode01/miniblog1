
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// controlar a autenticacao do usuario
import { onAuthStateChanged } from 'firebase/auth'

//contexts
import { AuthProvider } from './context/AuthContext'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//hooks
import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'

//pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import CreatePost from './pages/createPost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'


function App() {
  const [count, setCount] = useState(0)

  const [user, setUser] = useState(undefined)
  const { auth } = useAuth()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }
  
 

  return (
    <>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/posts/:id' element={<Post/>} />

              <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />

              <Route path='/register' element={!user ? <Cadastro /> : <Navigate to='/'/>} />

              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login'/>} />

              

              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login'/>} />

              <Route path='dashboard/posts/edit/:id' element={user ? <EditPost /> : <Navigate to='/login'/>} />

             

              <Route path='/search' element={<Search/>} />

             

              
              
            </Routes>
          </div>
          <Footer />

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
