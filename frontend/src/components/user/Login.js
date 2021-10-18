import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors} from '../../actions/userActions'

const Login = ( { history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : "/"

    useEffect(() => {

        if( isAuthenticated ) {
            history.push(redirect);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title='Login' />
                        
                        <div className="row wrapper p-2">
                            <div className="col-10 col-lg-5 p-4 mx-auto">
                                <form className="rounded shadow-lg p-4 login-form" onSubmit={submitHandler}>
                                    <h1 className="mb-3">
                                        Login
                                    </h1>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className='from-group'>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type='password'
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <Link to="/password/forgot" className="float-right- mb-4">Forgot Password?</Link>

                                    <button
                                        id="login_btn"
                                        type="submit"
                                        className="btn btn-block py-6"
                                    >
                                        Login
                                    </button>

                                    <Link to="/register" className="float-right pb-2 mt-3">New User???</Link>

                                </form>
                            </div>
                        </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
