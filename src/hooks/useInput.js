import { useState } from "react";

const useInput = (validateFn) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isValueValid = validateFn(value);
  const hasError = isTouched & !isValueValid;

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValueValid,
    hasError,
    inputChangeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
