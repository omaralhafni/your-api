import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { fetchUserProfileData, updateUserProfileData, uploadImage } from "../../api";
import { DisplayInput, Spinner } from "../../components";
import { useForm } from "../../utils";
import "./index.css";

const Profile = () => {
    const [saveBtn, setSaveBtn] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const save = async () => {
        let savedValues = values;

        if (typeof savedValues.profileImage !== "string") {
            const { data } = await uploadImage(savedValues.profileImage);
            savedValues.profileImage = data
        }

        const { data } = await updateUserProfileData(savedValues);
        setValues(data)
        setSaveBtn(false)
    }
    const {
        values,
        handleChange,
        handleSubmit,
        setValues,
    } = useForm(save);

    const fetchData = useCallback(async () => {
        const { data } = await fetchUserProfileData();
        setValues(data)
        setIsLoading(true)
    }, [setValues])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const handleChangeValues = (e) => {
        !saveBtn && setSaveBtn(true);
        handleChange(e);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {isLoading ?
                <form onSubmit={handleSubmit} className="relative w-96 h-auto bg-gray-400 dark:bg-gray-700 rounded-md pt-24 pb-8 px-5 lg:px-16 shadow-md hover:shadow-lg transition flex flex-col items-center">
                    <div className="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition">
                        {values?.profileImage && <img
                            className="w-full h-full rounded-full"
                            src={typeof values?.profileImage == 'string' ? values?.profileImage : URL.createObjectURL(values?.profileImage)}
                            // src="https://rairaksa.github.io/assets/img/rai.jpg"
                            alt="user profile"
                        />}
                        <label htmlFor="profile_images" className="">
                            <IoIosAddCircleOutline type="file" className="text-white bottom-0 right-3 absolute w-6 h-6 bg-gray-500 rounded-full cursor-pointer" />
                            <input
                                id="profile_images"
                                name="profileImage"
                                onChange={handleChangeValues}
                                type="file"
                                className="hidden"
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

                    <p className="text-gray-600 cursor-pointer" onClick={() => setChangePass(!changePass)} >shang password</p>

                    {changePass && <DisplayInput
                        name="password"
                        label="password:"
                        values={values}
                        handleChange={handleChangeValues}
                    />}

                    {saveBtn &&
                        <button
                            type="submit"
                            className="btn-success"
                        >Search</button>
                    }
                </form>
                :
                <Spinner color="#334155" />
            }

        </div>
    )
}

export default Profile;