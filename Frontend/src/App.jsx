import { useState } from 'react'
import Leave from './leave'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Leave/>
    </>
  )
}

export default App
