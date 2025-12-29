import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='bg-blue-600 text-black text-3xl p-16 mt-16 flex justify-center items-center font-semibold underline'>Hellow there</p>
    </>
  )
}

export default App
