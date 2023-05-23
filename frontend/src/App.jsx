import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import './pages/element.scss'

// import viteLogo from '/vite.svg'

function App() {
  const element = useRoutes(routes)

  return (
    element
  )
}

export default App