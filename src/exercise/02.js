// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue ='') {
  const [state, setState] = React.useState(
    () => localStorage.getItem(key) || defaultValue
     )
     React.useEffect(() => {
      // your side-effect code here.
      // this is where you can make HTTP requests or interact with browser APIs.
      localStorage.setItem(key,state)
    },[key, state])
    return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
 
  const [name, setName] = useLocalStorageState(initialName)


  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
