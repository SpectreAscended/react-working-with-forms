import React from 'react';
import useFormInput from '../hooks/useFormInput';

const BasicForm = () => {
  const {
    enteredValue: enteredFirstName,
    inputHasError: firstNameHasError,
    changeEnteredValueHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    valueIsValid: firstNameIsValid,
    resetValues: resetFirstName,
  } = useFormInput(value => value.trim() !== '');

  const {
    enteredValue: enteredLastName,
    inputHasError: lastNameHasError,
    changeEnteredValueHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    valueIsValid: lastNameIsValid,
    resetValues: resetLastName,
  } = useFormInput(value => value.trim() !== '');

  const {
    enteredValue: enteredEmail,
    inputHasError: emailHasError,
    changeEnteredValueHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    valueIsValid: emailIsValid,
    resetValues: resetEmail,
  } = useFormInput(value => {
    const trimmedValue = value.trim();
    return (
      trimmedValue.includes('@') &&
      trimmedValue.includes('.') &&
      trimmedValue.length > 4
    );
  });

  let formIsValid = false;

  formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const submitFormHandler = e => {
    e.preventDefault();

    if (!formIsValid) return;

    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredEmail);
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const inputClassHandler = invalidInput => {
    return `form-control ${invalidInput ? 'invalid' : ''}`;
  };

  const firstNameClasses = inputClassHandler(firstNameHasError);
  const lastNameClasses = inputClassHandler(lastNameHasError);
  const emailClasses = inputClassHandler(emailHasError);

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameHasError && (
            <p className="error-text">First name cannot be empty</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
          {lastNameHasError && (
            <p className="error-text">Last name cannot be empty</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email address</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
