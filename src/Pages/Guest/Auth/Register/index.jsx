import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../../../api";
import { UserContext } from "../../../../context";
import { Input, Loader } from "../../../../components";
import { registerValidate, useForm } from "../../../../utils";

const Register = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    setIsLoading(true);
    await registerApi(values, (res) => {
      setUserData(res);
      navigate("/dashboard/");
    });
    setIsLoading(false);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    registerValidate
  );

  return (
    <Loader loading={isLoading}>
      <form
        onSubmit={handleSubmit}
        className="flex-auto p-4 lg:px-10 py-10 pt-0"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="User Name"
            name="userName"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Input
            label="First Name"
            name="firstName"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Input
            label="password"
            name="password"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
          <Input
            label="Confirmation Password "
            name="passwordConfirmation"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
        </div>

        <div className="text-center mt-6">
          <button className="auth-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </Loader>
  );
};

export default Register;
