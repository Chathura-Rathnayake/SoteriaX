import { useState } from "react";

const initialFormValues = {
  password: "",
  passwordConfirm: "",
  formSubmitted: false,
  success: false,
};

export const usePasswordValidation = () => {
  //to update "values" as the form updates
  const [values, setValues] = useState(initialFormValues);
  //to check the form for errors
  const [errors, setErrors] = useState({});

  //check if the form values are valid
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required.";

      if (fieldValues.password) {
        temp.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
          fieldValues.password
        )
          ? ""
          : "The password must contain at least 1 number, 1 uppercase letter , 1 lowercase letter and length of the password must be at least 8 characters";
      }
    }

    if ("passwordConfirm" in fieldValues) {
      temp.passwordConfirm = fieldValues.passwordConfirm
        ? ""
        : "This field is required.";
    }

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  //check if the form values return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.password &&
      fieldValues.passwordConfirm &&
      Object.values(errors).every((x) => x === "");
    return isValid;
  };

  return {
    handleInputValue,
    formIsValid,
    errors,
  };
};
