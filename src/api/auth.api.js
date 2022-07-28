import { toast } from 'react-toastify';
import API from './setupAxios';

// login function api
export const loginApi = async (loginData, cb) => {
    try {
        if (loginData?.email !== '' && loginData?.password !== '') {
            const { data } = await API.post("/users/login", loginData);

            localStorage.setItem('access_token', data?.token);
            toast.success("login success", {
                position: toast.POSITION.TOP_CENTER
            });
            cb?.({ isLogin: true, userId: data._id, userName: data.userName });

            return { success: true, data: data }
        }
    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}

// register function api
export const registerApi = async (registerData, cb) => {
    try {
        if (
            registerData?.email !== ''
            && registerData?.password !== ''
            && registerData?.userName !== ''
            && registerData?.firstName !== ''
            && registerData?.lastName !== ''
            && registerData?.passwordConfirmation !== ''
        ) {
            const { data } = await API.post("/users/register", registerData);

            localStorage.setItem('access_token', data?.token);

            toast.success("login success", {
                position: toast.POSITION.TOP_CENTER
            });


            cb?.({ isLogin: true, userId: data._id, userName: data.userName });

            return { success: true, data: data }
        }
    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}

// logout function api
export const logout = (cb) => {
    localStorage.clear();
    cb?.()
}