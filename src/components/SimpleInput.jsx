import React, { useState } from 'react';

import useInput from '../hooks/useInput';

const SimpleInput = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => {
    const trimmedValue = value.trim();
    return (
      trimmedValue.includes('@') &&
      trimmedValue.includes('.') & (trimmedValue.length > 4)
    );
  });

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // const inputInvalidHandler = (inputValid, inputTouched) => {
  //   return !inputValid && inputTouched;
  // };

  // const enteredEmailIsValid =
  //   enteredEmail.trim().includes('@') &&
  //   enteredEmail.trim().includes('.') &&
  //   enteredEmail.trim().length > 4;

  // const emailInputIsInvalid = inputInvalidHandler(
  //   enteredEmailIsValid,
  //   enteredEmailTouched
  // );

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // const emailInputChangeHandler = e => {
  //   setEnteredEmailTouched(true);
  //   setEnteredEmail(e.target.value.trim());
  // };

  // const emailInputBlurHandler = () => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = e => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) return;
    console.log(enteredName, enteredEmail);
    resetNameInput();
    resetEmailInput();
  };

  const inputClassHandler = invalidInput => {
    return `form-control ${invalidInput ? 'invalid' : ''}`;
  };

  const nameInputClasses = inputClassHandler(nameInputHasError);

  const emailInputClasses = inputClassHandler(emailInputHasError);

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email address</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
