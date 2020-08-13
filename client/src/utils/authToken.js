import axios from 'axios';
import setAuthInReqHeader from './setAuthHeader';
import {store} from '../App';
import {AuthUser,loginFailure} from '../redux/actions/loginAction';

const authUserToken = async () => {
    try {
        // 1. Build Auth header 
        setAuthInReqHeader();
        
        const res = await axios.get('http://localhost:5000/api/auth')
        store.dispatch(AuthUser(res.data));
        
        return res;

    } catch (error) {
        // Console log & Do nothing
        console.log(error);
        store.dispatch(loginFailure());
        return error;
    }
}

export default authUserToken;