import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {
    setMode(mode)
    const newHistory = [...history]

    if (replace) {
      newHistory.pop()
      setHistory(prev => ([...prev, newHistory]))
    }
    // add newly set mode to copy of history
    newHistory.push(mode);
    // update "history" to copy of itself
    setHistory(newHistory)
  }


  const back = () => {
    // check if there IS a history
    if (history.length > 1) {
      // create copy of history
      const newHistory = [...history]
      // remove last element of that copy
      newHistory.pop()
      // create a reference to last element
      const lastElement = newHistory[newHistory.length - 1];
      // set MODE to last element of that copy
      setMode(lastElement)
      // set history to copy of history
      setHistory(newHistory)
    }
  }

  return { mode, transition, back };
};