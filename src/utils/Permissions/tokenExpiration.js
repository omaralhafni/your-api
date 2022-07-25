import jwt_decode from "jwt-decode";

export const checkTokenExpiration = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
        if (token && jwt_decode(token)?.exp < Date.now() / 1000) {
            localStorage.clear();
            return { isLogin: false, userId: "", userName: "" };
        } else {
            return {
                isLogin: true,
                userId: jwt_decode(token)?.id,
                userName: jwt_decode(token)?.userName
            };
        }
    } else {
        return { isLogin: false, userId: "", userName: "" };
    }
};