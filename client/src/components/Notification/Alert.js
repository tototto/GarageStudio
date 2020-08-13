import {useSelector} from 'react-redux';
import React from 'react';

const Alert = () => {
    // Get the state of Alert Reducer from Redux-Store
    const allAlertMsg = useSelector(state => state.alertReducer);
    
    // For each AlertMsg print Alert Banner
    return allAlertMsg.map(eachAlert => 
        // Render JSX for each Alert
        <div key={eachAlert.id} className={`alert alert-${eachAlert.alertType} alert-dismissible fade show`} role="alert">
            {eachAlert.msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        // End of JSX
    );
}
export default Alert;