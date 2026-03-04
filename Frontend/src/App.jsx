import { useState } from 'react'
import { AppRoutes } from './AppRoutes'
import './shared/global.scss'
import { AuthProvider } from './features/auth/auth.context'
import { BrowserRouter } from 'react-router'
import { PostContextProvider } from './features/post/post.context'
function App() {

  return (
    <>
      <AuthProvider>
        <PostContextProvider>
          <AppRoutes />
        </PostContextProvider>
      </AuthProvider>
    </>
  )
}

export default App
