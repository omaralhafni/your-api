import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchUserProfileData,
  updateUserProfileData,
  uploadImage,
} from "../../../api";
import { DisplayInput, Loader } from "../../../components";
import { UserContext } from "../../../context";
import { useForm } from "../../../utils";
import "./index.css";

const { REACT_APP_URL_V1 } = process.env;

const Profile = () => {
  const [saveBtn, setSaveBtn] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userData: { userName },
  } = useContext(UserContext);

  const { origin } = window.location;

  // save changes data for user
  const save = async () => {
    let savedValues = values;

    if (typeof savedValues.profileImage !== "string") {
      const { data } = await uploadImage(savedValues.profileImage);
      savedValues.profileImage = data;
    }

    const { data } = await updateUserProfileData(savedValues);
    setValues(data);
    setSaveBtn(false);
  };

  // form hook handle values
  const { values, handleChange, handleSubmit, setValues } = useForm(save);

  // fetch data for user
  const fetchData = useCallback(async () => {
    const { data } = await fetchUserProfileData();
    setValues(data);
    setIsLoading(false);
  }, [setValues]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // control handle change values for inputs
  const handleChangeValues = (e) => {
    !saveBtn && setSaveBtn(true);
    handleChange(e);
  };

  // handle click copy
  const handleCopy = (paramLink) => {
    navigator.clipboard.writeText(paramLink);
    toast.success("Copied!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <Loader loading={isLoading}>
      <div className="w-full h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative h-auto bg-gray-400 dark:bg-gray-700 rounded-md pt-24 pb-8 px-5 lg:px-16 shadow-md hover:shadow-lg transition flex flex-col items-center"
        >
          <div className="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition">
            <img
              className="w-full h-full rounded-full"
              src={
                typeof values?.profileImage == "string" ||
                typeof values?.profileImage == "undefined"
                  ? values?.profileImage === "" ||
                    values?.profileImage === "undefined"
                    ? "/assets/images/user.png"
                    : values?.profileImage
                  : URL.createObjectURL(values?.profileImage)
              }
              alt="user profile"
            />
            <label htmlFor="profile_images">
              <IoIosAddCircleOutline
                type="file"
                className="text-white bottom-0 right-3 absolute w-6 h-6 bg-gray-500 rounded-full cursor-pointer"
              />
              <input
                type="file"
                className="hidden"
                id="profile_images"
                name="profileImage"
                onChange={handleChangeValues}
              />
            </label>
          </div>

          <DisplayInput
            name="userName"
            label="user name:"
            values={values}
            handleChange={handleChangeValues}
          />

          <DisplayInput
            name="email"
            label="email:"
            values={values}
            handleChange={handleChangeValues}
          />

          <DisplayInput
            name="firstName"
            label="first name:"
            values={values}
            handleChange={handleChangeValues}
          />

          <DisplayInput
            name="lastName"
            label="last name:"
            values={values}
            handleChange={handleChangeValues}
          />

          <p
            className="text-gray-600 cursor-pointer"
            onClick={() => setChangePass(!changePass)}
          >
            shang password
          </p>

          {changePass && (
            <DisplayInput
              name="password"
              label="password:"
              values={values}
              handleChange={handleChangeValues}
            />
          )}

          {saveBtn && (
            <button type="submit" className="btn-success">
              Search
            </button>
          )}

          <div>
            <label className="display-input-label">Your web page : </label>
            <Link
              to={`/public/${userName}`}
              target="_blank"
              className="link-paragraph"
              // onClick={() => handleCopy(values?.userName)}
            >
              {origin}/public/{userName}
            </Link>
          </div>
          <div>
            <label className="display-input-label">Your API Link : </label>
            <p
              className="link-paragraph"
              onClick={() =>
                handleCopy(`${REACT_APP_URL_V1}products/${values?.userName}`)
              }
            >
              {REACT_APP_URL_V1}products/{values?.userName}
            </p>
          </div>
        </form>
      </div>
    </Loader>
  );
};

export default Profile;
