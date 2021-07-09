import React, { useState } from 'react';
import CounterHooks from './CounterHooks'
import Counter from './Counter'

export const ThemeContext = React.createContext()
// provider providing a value to everything inside of it
// consumer is consuming that value

function App() {
  const [theme, setTheme] = useState('red')
  return (
    <ThemeContext.Provider value={{ backgroundColor: theme }}>
      Counter
      <Counter  initialCount={0}/>
      CounterHooks
      <CounterHooks initialCount={0} />
      <button onClick={() => setTheme(prevTheme => {
        return prevTheme === 'red' ? 'blue' : 'red'
      })}>Toggle Theme
      </button>
    </ThemeContext.Provider>
  )
}

export default App;
