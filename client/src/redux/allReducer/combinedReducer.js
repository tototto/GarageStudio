import { combineReducers } from 'redux';
import { alertReducer } from '../reducer/alertReducer';
import { loginReducer } from '../reducer/loginReducer';

const combinedReducer = combineReducers({
    // List of each Redux-Reducer here
    alertReducer,
    loginReducer
});

export default combinedReducer;