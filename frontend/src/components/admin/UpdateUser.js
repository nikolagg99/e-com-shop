import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUser, getUserDetails} from '../../actions/userActions'
import Sidebar from "./Sidebar";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = ({ match, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails);

    const userId = match.params.id
    useEffect(() => {

        if( user && user._id !== userId ){
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isUpdated) {
            alert.success('User updated successfully!!!!!');

            history.push('/admin/users');

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, isUpdated, user, history, userId])

    const submitHandler = (e) => {
        e.preventDefault();

        user.name = name;
        user.email = email;
        user.role = role;

        dispatch(updateUser(user._id, user))
    }

    return (
        <Fragment>
      <MetaData title={`Update user #${user.id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
              <div className="col-10 col-lg-5">
                  <form className="shadow-lg" onSubmit={submitHandler}>
                      <h1 className="mt-2 mb-5">Update User</h1>

                      <div className="form-group">
                          <label htmlFor="name">
                            Name: 
                          </label>
                          <input
                            type="name"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                          <label htmlFor="email">
                            Email: 
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                          <label htmlFor="role">
                            Role: 
                          </label>
                          <select
                            className="from-control"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                          </select>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-block mt-4 mb-3"
                      >
                          Update
                      </button>
                  </form>

              </div>

          </div>
        </div>
      </div>
    </Fragment>
    )
}

export default UpdateUser
