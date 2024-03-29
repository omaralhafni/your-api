import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../../api";
import { UserContext } from "../../../../context";
import { Input, Loader } from "../../../../components";
import { useForm, loginValidate } from "../../../../utils";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    setIsLoading(true);
    await loginApi(values, (res) => {
      setUserData(res);
      navigate("/dashboard/");
    });
    setIsLoading(false);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    loginValidate
  );

  return (
    <Loader loading={isLoading}>
      <form
        onSubmit={handleSubmit}
        className="flex-auto p-4 lg:px-10 py-10 pt-0"
      >
        <Input
          label="email"
          name="email"
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
        {/* <div>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="grid-password"
                    />
                    <span className="ml-2 text-sm font-semi bold text-black">
                        Remember me
                    </span>
                </label>
            </div> */}

        <div className="text-center mt-6">
          <button className="auth-btn" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </Loader>
  );
};

export default Login;
