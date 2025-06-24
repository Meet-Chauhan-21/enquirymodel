import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h2 className='text-2xl bg-red-200 text-semibold p-5' >Hello, Welcome to my tailwind css project</h2>
      </div>
    </>
  )
}

export default App
