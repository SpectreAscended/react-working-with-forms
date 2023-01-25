import React, { useState } from 'react';

const useFormInput = validateInput => {
  // validateInput will be our validation function, passed in as an argument to our useFormInput call in the form.

  const [enteredValue, setEnteredValue] = useState('');
  const [inputTouched, setInputTouched] = useState(false);

  const valueIsValid = validateInput(enteredValue);

  const inputHasError = !valueIsValid && inputTouched;

  const changeEnteredValueHandler = e => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setInputTouched(true);
  };

  const resetValues = () => {
    setEnteredValue('');
    setInputTouched(false);
  };

  return {
    enteredValue,
    inputHasError,
    valueIsValid,
    changeEnteredValueHandler,
    inputBlurHandler,
    resetValues,
  };
};

export default useFormInput;
