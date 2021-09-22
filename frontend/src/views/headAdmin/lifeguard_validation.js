import { useState } from "react";

const initialFormValues = {
  fname: "",
  lname: "",
  isPilot: "",
  email: "",
  NIC: "",
  phone: "",
  birthdate: "",
  gender: "",
  //passwordConfirm: "",
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

    if ("fname" in fieldValues) {
      temp.fname = fieldValues.fname ? "" : "This field is required.";

      //   if (fieldValues.password) {
      //     temp.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
      //       fieldValues.password
      //     )
      //       ? ""
      //       : "The password must contain at least 1 number, 1 uppercase letter , 1 lowercase letter and length of the password must be at least 8 characters";
      //   }
    }

    if ("lname" in fieldValues) {
      temp.lname = fieldValues.lname ? "" : "This field is required.";

      //   if (fieldValues.password) {
      //     temp.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
      //       fieldValues.password
      //     )
      //       ? ""
      //       : "The password must contain at least 1 number, 1 uppercase letter , 1 lowercase letter and length of the password must be at least 8 characters";
      //   }
    }

    if ("isPilot" in fieldValues) {
      temp.isPilot = fieldValues.isPilot ? "" : "This field is required.";

      //   if (fieldValues.password) {
      //     temp.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
      //       fieldValues.password
      //     )
      //       ? ""
      //       : "The password must contain at least 1 number, 1 uppercase letter , 1 lowercase letter and length of the password must be at least 8 characters";
      //   }
    }

    if ("gender" in fieldValues) {
      temp.gender = fieldValues.gender ? "" : "This field is required.";

      //   if (fieldValues.password) {
      //     temp.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
      //       fieldValues.password
      //     )
      //       ? ""
      //       : "The password must contain at least 1 number, 1 uppercase letter , 1 lowercase letter and length of the password must be at least 8 characters";
      //   }
    }

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";

      if (fieldValues.email) {
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
          fieldValues.email
        )
          ? ""
          : "Email must be a valid email";
      }
    }

    if ("NIC" in fieldValues) {
      temp.NIC = fieldValues.NIC ? "" : "This field is required.";

      // if (fieldValues.email) {
      //   temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
      //     fieldValues.email
      //   )
      //     ? ""
      //     : "Email must be a valid email";
      // }
    }

    if ("phone" in fieldValues) {
      temp.phone = fieldValues.phone ? "" : "This field is required.";

      if (fieldValues.phone) {
        temp.phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          fieldValues.phone
        )
          ? ""
          : "Phone number must be a valid number";
      }
    }

    if ("birthdate" in fieldValues) {
      //checking the age > 18
      let today = new Date();
      let birthDate = new Date(fieldValues.birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      //   console.log(age);
      if (fieldValues.birthdate)
        temp.birthdate =
          age >= 18 ? "" : "Age must be greater than or equal to 18";
    }

    // if ("passwordConfirm" in fieldValues) {
    //   temp.passwordConfirm = fieldValues.passwordConfirm
    //     ? ""
    //     : "This field is required.";
    // }

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
      fieldValues.fname &&
      fieldValues.lname &&
      fieldValues.isPilot &&
      fieldValues.email &&
      fieldValues.NIC &&
      fieldValues.phone &&
      fieldValues.birthdate &&
      fieldValues.gender &&
      //   fieldValues.passwordConfirm &&
      Object.values(errors).every((x) => x === "");
    return isValid;
  };

  return {
    handleInputValue,
    formIsValid,
    errors,
  };
};
