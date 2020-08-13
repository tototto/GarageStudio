const InitialState = {
    loggedIn: false,
    user: null,
    token: localStorage.getItem('token')
}

export const loginReducer = (state=InitialState, action) => {
    switch(action.type){

        case "LOGIN_SUCCESS": 
            localStorage.setItem('token', action.payload.token);
            return {...state, loggedIn: true, token: localStorage.getItem('token')}

        case "AUTH_SUCESS":
            return {...state, loggedIn: true, user: action.payload, token: localStorage.getItem('token')}

        case "LOGIN_FAILURE":
            localStorage.removeItem('token');
            return {...state, loggedIn: false, user: null, token: null};

        default: return state;
    }
}