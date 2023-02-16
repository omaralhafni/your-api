// submit case validation
const submitValidation = (values, handleError) => {
  if (!values.email) {
    handleError({ email: "Email address is required" });
  }
  if (!values.password) {
    handleError({
      email: "Email address is required",
      password: "Password is required",
    });
  }
};
// user Name case validation
const UserNameValidation = (value, handleError) => {
  if (value === "") {
    handleError({ userName: "User name is required" });
  } else if (value.length < 2) {
    handleError({ userName: "User name must be 2 or more characters" });
  } else {
    handleError({ userName: "" });
  }
};
// email case validation
const emailValidation = (value, handleError) => {
  if (value === "") {
    handleError({ email: "Email address is required" });
  } else if (value.length < 2) {
    handleError({ email: "Use user name or email format" });
  } else {
    handleError({ email: "" });
  }
};
// first Name validation
const firstNameValidation = (value, handleError) => {
  if (value === "") {
    handleError({ firstName: "First name is required" });
  } else if (value.length < 2) {
    handleError({ firstName: "First name must be 2 or more characters" });
  } else {
    handleError({ firstName: "" });
  }
};
// last Name validation
const lastNameValidation = (value, handleError) => {
  if (value === "") {
    handleError({ lastName: "Last name is required" });
  } else if (value.length < 2) {
    handleError({ lastName: "Last name must be 2 or more characters" });
  } else {
    handleError({ lastName: "" });
  }
};
// login password validation
const passwordLoginValidation = (value, handleError) => {
  if (value === "") {
    handleError({ password: "Password is required" });
  } else if (value.length < 8) {
    handleError({ password: "Password must be 8 or more characters" });
  } else {
    handleError({ password: "" });
  }
};
// register password validation
const passwordRegisterValidation = (value, handleError) => {
  if (value === "") {
    handleError({ password: "Password is required" });
  } else if (
    value.length < 8 &&
    !/^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%./^&*()_+<>,~`"':;]{8,}$/.test(value)
  ) {
    handleError({
      password:
        "Password should be 8 digits length at least, contains at least one Capital letter, contains at least one number.",
    });
  } else {
    handleError({ password: "" });
  }
};
// confirm password validation
const confirmPasswordValidation = (value, values, handleError) => {
  if (value === "") {
    handleError({ passwordConfirmation: "Confirm password is required" });
  } else if (values.password !== value) {
    handleError({ passwordConfirmation: "Password does not match" });
  } else {
    handleError({ passwordConfirmation: "" });
  }
};

// register validator
export const registerValidate = (name, value, values, handleError) => {
  // let errors = {};
  switch (name) {
    case "submit":
      submitValidation(values, handleError);
      break;

    case "userName":
      UserNameValidation(value, handleError);
      break;

    case "email":
      emailValidation(value, handleError);
      break;

    case "firstName":
      firstNameValidation(value, handleError);
      break;

    case "lastName":
      lastNameValidation(value, handleError);
      break;

    case "password":
      passwordRegisterValidation(value, handleError);
      break;

    case "passwordConfirmation":
      confirmPasswordValidation(value, values, handleError);
      break;

    default:
      handleError({ email: "", password: "" });
      break;
  }
};

// login validator
export const loginValidate = (name, value, values, handleError) => {
  // let errors = {};
  switch (name) {
    case "submit":
      submitValidation(values, handleError);
      break;
    case "email":
      emailValidation(value, handleError);
      break;
    case "password":
      passwordLoginValidation(value, handleError);
      break;

    default:
      handleError({ email: "", password: "" });
      break;
  }
};
