import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';

const Profile = () => {

    const { user, loading } = useSelector( state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'User profile'} />

                <h2 className="mt-5 ml-5 profile_heading">Profile</h2>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-5 user-info-content">
                        <h4>Name: </h4>
                        <p>{user.name}</p>

                        <h4>Email: </h4>
                        <p>{user.email}</p>

                        <h4>Joined on: </h4>
                        <p>{String(user.createdAt).substring(0, 10)}</p>

                        {user.role !== 'admin' && (
                            <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                My Orders
                            </Link>
                        )}  

                        <Link to="/password/update" className="btn btn-danger btn-block mt-5">
                            Change password
                        </Link>

                        <Link to="/me/update" className="btn btn-primary btn-block my-5">
                            Edit Profile
                        </Link>

                    </div>
                </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
