import axios from 'axios';

const setAuthInReqHeader = () => {
    if(localStorage.token) {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthInReqHeader;