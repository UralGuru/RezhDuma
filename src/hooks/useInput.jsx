import { useState } from "react";

const useInput = (initial, required = false) => {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(null);

  return ({
    value, 
    error,
    onChange: e => setValue(e.target.value),
    onBlur: e => {
      if (!e.target.value && required) 
        setError('Необходимое поле')
      else 
        setError(null)
    }
  })
}

export default useInput;