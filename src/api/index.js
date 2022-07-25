import { loginApi, registerApi, logout } from "./auth.api";
import { uploadImage } from "./upload.api";
import { createProductApi, deleteProductApi, updateProductApi } from "./products.api";
import { fetchUserProfileData, updateUserProfileData } from "./user.api";


export {
    loginApi,
    registerApi,
    logout,

    fetchUserProfileData,
    updateUserProfileData,

    createProductApi,
    deleteProductApi,
    updateProductApi,

    uploadImage,
}