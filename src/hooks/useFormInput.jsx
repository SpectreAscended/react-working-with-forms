import { useReducer } from 'react';

const defaultFormState = {
  enteredValue: '',
  inputTouched: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'ENTERED_VALUE':
      return { ...state, enteredValue: action.value };

    case 'INPUT_TOUCHED': {
      return { ...state, inputTouched: true };
    }

    case 'INPUT_BLUR': {
      return {
        inputTouched: false,
        enteredValue: '',
      };
    }

    default:
      return defaultFormState;
  }
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
    dispatchFormState({ type: 'INPUT_TOUCHED' });
  };

  const resetValues = () => {
    // setEnteredValue('');
    dispatchFormState({ type: 'INPUT_BLUR' });
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
