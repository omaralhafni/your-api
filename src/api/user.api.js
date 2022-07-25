import { toast } from 'react-toastify';
import API from './setupAxios';

// fetch user profile data 
export const fetchUserProfileData = async () => {
    try {
        const { data } = await API.get("/users/profile");

        return { success: true, data: data }

    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}
// update user Profile data 
export const updateUserProfileData = async (userData) => {
    try {
        const { data } = await API.put("/users/profile", userData);

        toast.success("update user data success", {
            position: toast.POSITION.TOP_CENTER
        });

        return { success: true, data: data }

    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}