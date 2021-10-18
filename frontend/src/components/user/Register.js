import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register} from '../../actions/userActions'


export const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user;

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if( isAuthenticated ) {
            history.push('/');
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(register(user))
    }

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <MetaData title={'Register user'} />

            <div className="row wrapper">
                <div className="m-auto col-10 col-lg-5">
                    <form className="p-4 m-2 shadow-lg register-form" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register user</h1>

                        <div className="form-group">
                            <label htmlFor="email">Name: </label>
                            <input 
                                type="name" 
                                className="form-control" 
                                name="name"
                                value={name}
                                onChange={onChange} /> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email"
                                value={email}
                                onChange={onChange} 
                            /> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                value={password}
                                onChange={onChange} 
                            /> 
                        </div>

                        <button 
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Register
                        </button>

                    </form>

                </div>

            </div>
        </Fragment>
    )
}

export default Register;