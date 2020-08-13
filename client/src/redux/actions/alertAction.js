import { v4 as uuidv4 } from 'uuid';

export const createAlert = (msg, alertType) => {   
    
    // Create action Obj
    const createdAlert = {
        type: "SET_ALERT",
        payload: {
            id: uuidv4(),
            msg: msg,
            alertType: alertType
        }
    }

    return createdAlert;
}


