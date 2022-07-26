import { toast } from 'react-toastify';
import API from './setupAxios';

// fetch products data 
export const fetchProductsForUser = async (userName, query) => {
    try {
        const numPages = query?.numPages ? `pageNumber=${query?.numPages}` : '';
        const keyword = query?.keyword ? `&keyword=${query?.keyword}` : '';

        const { data } = await API.get(`/products/${userName}?${numPages}${keyword}`);

        return { success: true, data: data }

    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}

// fetch single products data 
export const fetchSingleProductsForUser = async (userName, productId) => {
    try {
        const { data } = await API.get(`/products/${userName}/${productId}`);
        return { success: true, data: data }

    } catch (error) {
        const { response: { data: { message } } } = error;
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return { success: false, data: message }
    }
}

// create product
export const createProductApi = async (recordData) => {
    try {
        const { data } = await API.post("/products", recordData);

        toast.success("Record added successfully", {
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

// update product
export const updateProductApi = async (id, recordData) => {
    try {
        const { data } = await API.put(`/products/${id}`, recordData);

        toast.success("updated record successfully", {
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

// delete product
export const deleteProductApi = async (id) => {
    try {
        const { data } = await API.delete(`/products/${id}`);

        toast.success("Deleted successfully", {
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
