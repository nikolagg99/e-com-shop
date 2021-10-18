import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword} from '../../actions/userActions'

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";


const UpdatePassword = ({history}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setNewPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isUpdated) {
            alert.success('Password updated successfully!!!!!');
            dispatch(loadUser());

            history.push('/me');

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        user.oldPassword = oldPassword;
        user.password = password;
        dispatch(updatePassword(user))
    }

    return (
       <Fragment>
           <MetaData title="Change user password" />

           <div className="row rounded ">
               <div className="col-10 col-lg-5 change-pass-wrap">
                   <form className="shadow-lg p-3 mt-5 change-pass-form" onSubmit={submitHandler}>
                       <h1 className="mt-2 mb-5">
                            Update Password
                       </h1>
                       <div className="form-group">
                            <label htmlFor="oldPass">Old Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />  
                       </div>
                       <div className="form-group">
                            <label htmlFor="newPass">Old Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />  
                       </div>
                       <button
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false}
                        >
                           Submit change
                       </button>
                   </form>

               </div>

           </div>
       </Fragment>
    )
}

export default UpdatePassword
