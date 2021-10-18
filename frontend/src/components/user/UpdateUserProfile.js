import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser} from '../../actions/userActions'

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateUserProfile = ({history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {

        if( user ) {
            setName(user.name);
            setEmail(user.email);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isUpdated) {
            alert.success('User updated successfully!!!!!');
            dispatch(loadUser());

            history.push('/me');

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated, user])

    const submitHandler = (e) => {
        e.preventDefault();
        user.name = name;
        user.email = email;
        dispatch(updateProfile(user))
    }

    return (
        <Fragment>
            <MetaData title={'Update User Profile'} />

            <div className="row">
                <div className="col-10 col-lg-5 mt-5 update-user-wrap">
                    <form className="shadow-lg p-3 update-user-form" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update User Profile</h1>

                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="name"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>
                            Update
                        </button>
                    </form>

                </div>

            </div>
        </Fragment>
    )
}

export default UpdateUserProfile
