import React, { useState, useContext } from 'react';
import { ThemeContext } from './App'
export default function CounterHooks(props) {
  // the state function returns the state as an array: the first
  // value is the actual state, the second a function to set that state.
  const [count, setCount] = useState(props.initialCount)
  const style = useContext(ThemeContext)
  return  (
    <>
      <button style={style} onClick={() => setCount(prevCount => count -1)}>-</button>
      <span>{count}</span>
      <button style={style} onClick={() => setCount(prevCount => count + 1)}>+</button>
    </>
  )
}
