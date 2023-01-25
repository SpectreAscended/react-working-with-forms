import { useReducer } from 'react';

const defaultFormState = {
  enteredValue: '',
  inputTouched: false,
};

const formReducer = (state, action) => {
  if (action.type === 'ENTERED_VALUE') {
    return { ...state, enteredValue: action.value };
  }

  if (action.type === 'INPUT_TOUCHED') {
    return { ...state, inputTouched: action.boolean };
  }

  return defaultFormState;
};

const useFormInput = validateInput => {
  // validateInput will be our validation function, passed in as an argument to our useFormInput call in the form.

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    defaultFormState
  );

  const valueIsValid = validateInput(formState.enteredValue);

  const inputHasError = !valueIsValid && formState.inputTouched;

  const changeEnteredValueHandler = e => {
    dispatchFormState({ type: 'ENTERED_VALUE', value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatchFormState({ type: 'INPUT_TOUCHED', boolean: true });
  };

  const resetValues = () => {
    setEnteredValue('');
    dispatchFormState({ type: 'INPUT_TOUCHED', boolean: false });
  };

  return {
    enteredValue: formState.enteredValue,
    inputHasError,
    valueIsValid,
    changeEnteredValueHandler,
    inputBlurHandler,
    resetValues,
  };
};

export default useFormInput;
