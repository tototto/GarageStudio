import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {createAlert} from '../../redux/actions/alertAction';
import axios from 'axios';

const Register = () => {

    const actionDispatcher = useDispatch();

    const [state, updateState] = useState({ 
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: ""
     });

    const uponChange = e => {
        updateState({...state, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();

        // If password mis-match
        if(state.password1 !== state.password2) {
            // Create & dispatch Alert to Redux-Store
            const alert = createAlert("Password do not match", "danger");
            actionDispatcher(alert);
        }
        // If password match, Create API req for Registration
        else {

            // 1. Build req header
            const ReqHeader = {
                headers: { 'Content-Type' : 'application/json' }
            }

            // 2. Build req body
            const ReqBody = JSON.stringify({ 
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password1
             });

             try {
                // 3. Hit Register API endpoint
                const res = await axios.post('http://localhost:5000/api/user/register', ReqBody, ReqHeader);
                console.log(res);

                // 4. Display Success and Redirect to Login
                const alert = createAlert("Registration Successful", "success");
                actionDispatcher(alert);

                // 5. Redirect
                window.location.href = "/";

             } catch (error) {
                 // Catch Axios API error if any
                 const errors = error.response.data.error;
                 errors.forEach(err => {
                    const alert = createAlert(err.msg, "warning");
                    actionDispatcher(alert);
                 })
             };
        }       
    }         

    
    return (
        <Fragment>
        <div className="reg-body">
            <div className="reg-form">
            <div className="container">
                <h1 className="well txt">Registration Form</h1>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={e => onSubmit(e)} >
                            <div className="col-sm-12">
                                <div className="row">

                                    <div className="col-sm-6 form-group">
                                        <label className="txt">First Name</label>
                                        <input name="firstName" type="text" placeholder="Enter First Name Here.." className="form-control" onChange={e => uponChange(e)} required/>
                                    </div>

                                    <div className="col-sm-6 form-group">
                                        <label className="txt">Last Name</label>
                                        <input name="lastName" type="text" placeholder="Enter Last Name Here.." className="form-control" onChange={e => uponChange(e)} required/>
                                    </div>

                                </div>		

                                <div className="form-group">
                                    <label className="txt">Email Address</label>
                                    <input name="email" type="text" placeholder="Enter Email Address Here.." className="form-control" onChange={e => uponChange(e)} required/>
                                </div>	

                                <div className="form-group">
                                    <label className="txt">Password</label>
                                    <input name="password1" type="password" placeholder="Enter Website Name Here.." className="form-control" onChange={e => uponChange(e)} minLength='6' required/>
                                </div>

                                <div className="form-group">
                                    <label className="txt">Re-enter Password</label>
                                    <input name="password2" type="password" placeholder="Enter Website Name Here.." className="form-control" onChange={e => uponChange(e)} minLength='6' required/>
                                </div>

                                <button type="submit" className="btn btn-lg btn-info">Submit</button>{' '}
                                <Link type="button" className="btn btn-lg btn-secondary" to="/">Back</Link>					
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Register;
