export const loginSuccess = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
     };
}

export const loginFailure = () => {
    return {
        type: "LOGIN_FAILURE",
     };
}

export const AuthUser = (data) => {
    return {
        type: "AUTH_SUCESS",
        payload: data
    }
}