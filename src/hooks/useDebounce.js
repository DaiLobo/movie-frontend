import { useEffect, useState } from "react";

const useDebounced = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect (() => {
      const interval = setInterval(() => {
        setDebouncedValue(value);
      }, delay)
  
      return () => { //quando fecha a pagina limpa o intervalo
        clearInterval(interval);
      }
    }, [value, delay])
  
    return debouncedValue;
  }

  export default useDebounced;