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
// name case validation
const nameValidation = (value, handleError) => {
  if (value === "") {
    handleError({ name: "product name is required" });
  } else if (value.length < 2) {
    handleError({ name: "product name must be 2 or more characters" });
  } else {
    handleError({ name: "" });
  }
};
// description case validation
const descriptionValidation = (value, handleError) => {
  if (value === "") {
    handleError({ description: "description is required" });
  } else if (value.length < 20) {
    handleError({ description: "description must be 20 or more characters" });
  } else {
    handleError({ description: "" });
  }
};
// category case validation
const categoryValidation = (value, handleError) => {
  if (value === "") {
    handleError({ category: "category is required" });
  } else if (value.length < 2) {
    handleError({ category: "category must be 2 or more characters" });
  } else {
    handleError({ category: "" });
  }
};

// add product validator
export const productValidate = (name, value, values, handleError) => {
  // let errors = {};
  switch (name) {
    case "submit":
      submitValidation(values, handleError);
      break;
    case "name":
      nameValidation(value, handleError);
      break;
    case "description":
      descriptionValidation(value, handleError);
      break;
    case "category":
      categoryValidation(value, handleError);
      break;

    default:
      handleError({ name: "", description: "", category: "" });
      break;
  }
};
