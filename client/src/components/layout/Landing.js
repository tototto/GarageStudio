import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/logo.jpg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {createAlert} from '../../redux/actions/alertAction';
import {loginSuccess, loginFailure} from '../../redux/actions/loginAction';

const Landing = () => {

    const actionDispatcher = useDispatch();

    const [state, updateState] = useState({ 
        email: "",
        password: ""
     });

     const uponChange = e => {
        updateState({...state, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();

        // Construct API Request:

        // 1. Build header
        const ReqHeader = {
            headers: { 'Content-Type' : 'application/json' }
        } 

        // 2. Build req body
        const ReqBody = JSON.stringify({ 
            email: state.email,
            password: state.password
        });

        try {
            // 3. Hit Login API endpoint
            const res = await axios.post('http://localhost:5000/api/auth/login', ReqBody, ReqHeader);
            console.log(res);
            // 4. Dispatch Login Success Obj to Login Reducer
            const loginAction = loginSuccess(res.data)
            actionDispatcher(loginAction);

            return (<Redirect to="/profile"></Redirect>);
            
        } catch (error) {
            // Catch Axios API error if any
            const errors = error.response.data.error;
            errors.forEach(err => {
                const alert = createAlert(err.msg, "danger");
                actionDispatcher(alert);

                // Dispatch Login Fail Obj to Login Reducer
                const loginAction = loginFailure();
                actionDispatcher(loginAction);
            })
        }
    }

    return (
        <Fragment>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Garage Studio<br/> Login Page</h2>
                    <p>Login or register from here to access.</p>
                    <br/> <img src={logo} alt="logo"></img>

                </div>
            </div>

            <div className="main">
                <div className="col-md-6 col-sm-12"> 
                    <div className="login-form">
                        <form onSubmit={e => onSubmit(e)}>

                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" name="email" className="form-control" placeholder="Email User Name" onChange={e => uponChange(e)} required/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password" onChange={e => uponChange(e)} required/>
                            </div>

                            <button type="submit" className="btn btn-black">Login</button> {' '}
                            <Link type="submit" className="btn btn-secondary" to='/Register'>Register</Link>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Landing;
