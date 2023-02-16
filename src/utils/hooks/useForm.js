import { useState } from "react";

export const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleError = (values) => {
    setErrors({ ...errors, ...values });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    validate && validate("submit", "", values, handleError);
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    const { name, value, type, files } = event.target;
    validate && validate(name, value, values, handleError);
    type === "file"
      ? setValues((values) => ({ ...values, [name]: files[0] }))
      : setValues((values) => ({ ...values, [name]: value }));
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
  };
};
