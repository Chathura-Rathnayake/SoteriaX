import { useState } from "react";

const initialFormValues = {
  firstName: "",
  userEmail: "",
  lastName: "",
  userPhone: "",
  companyName: "",
  companyEmail: "",
  companyAddress: "",
  companyPhone: "",
  gender: "",
  supportType: "",
  birthday: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  //to update "values" as the form updates
  const [values, setValues] = useState(initialFormValues);
  //to check the form for errors
  const [errors, setErrors] = useState({});

  //check if the form values are valid
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // console.log("gender - ", fieldValues.gender);
    // console.log("firstname - ", fieldValues.firstName);
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";

    if ("userPhone" in fieldValues)
      //validate phone numbers - TODO
      temp.userPhone = fieldValues.userPhone ? "" : "This field is required.";

    if ("companyName" in fieldValues)
      temp.companyName = fieldValues.companyName
        ? ""
        : "This field is required.";

    if ("companyAddress" in fieldValues)
      temp.companyAddress = fieldValues.companyAddress
        ? ""
        : "This field is required.";

    if ("companyPhone" in fieldValues)
      //validate phone numbers - TODO
      temp.companyPhone = fieldValues.companyPhone
        ? ""
        : "This field is required.";

    if ("userEmail" in fieldValues) {
      temp.userEmail = fieldValues.userEmail ? "" : "This field is required.";
      if (fieldValues.userEmail)
        temp.userEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
          fieldValues.userEmail
        )
          ? ""
          : "Email is not valid.";
    }

    if ("companyEmail" in fieldValues) {
      temp.companyEmail = fieldValues.companyEmail
        ? ""
        : "This field is required.";
      if (fieldValues.companyEmail)
        temp.companyEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
          fieldValues.companyEmail
        )
          ? ""
          : "Email is not valid.";
    }

    if ("birthday" in fieldValues) {
      //checking the age > 18
      let today = new Date();
      let birthDate = new Date(fieldValues.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    //   console.log(age);

      if (fieldValues.birthday)
        temp.birthday =
          age >= 18 ? "" : "Age must be greater than or equal to 18";
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
      fieldValues.firstName &&
      fieldValues.userEmail &&
      fieldValues.lastName &&
      fieldValues.userPhone &&
      fieldValues.companyName &&
      fieldValues.companyEmail &&
      fieldValues.companyAddress &&
      fieldValues.companyPhone &&
      fieldValues.gender &&
      fieldValues.supportType &&
      fieldValues.birthday &&
      Object.values(errors).every((x) => x === "");
    return isValid;
  };

  return {
    handleInputValue,
    formIsValid,
    errors,
  };
};
