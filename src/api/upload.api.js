import { toast } from 'react-toastify';
import API from './setupAxios';

// upload image api
export const uploadImage = async (imgData) => {
    try {
        const formData = new FormData()
        formData.append('image', imgData)
        const { data } = await API.post("/upload", formData);

        return { success: true, data: data }

    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}
