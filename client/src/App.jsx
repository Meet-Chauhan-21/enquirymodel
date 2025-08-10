import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Enquiry from './components/Enquiry'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <ThemeToggle />
        <Enquiry />
      </div>
    </ThemeProvider>
  )
}

export default App
