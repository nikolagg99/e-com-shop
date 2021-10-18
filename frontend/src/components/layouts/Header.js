import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { logout } from '../../actions/userActions';

import Search from './Search';

import '../../App.css';

const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logout successfully!!!')
    }
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img className="logo-img" src="/images/logo.png" alt="img not found!!!"/>
                        </Link>
                        <p className="e-shop px-1 pt-3">E-COM SHOP</p>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{textDecoration: 'none'}}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1 btn-primary p-1 px-3 rounded">{cartItems.length}</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white pr-5 mt-1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>{ user && user.name }</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                
                                {user && user.role === 'admin' && (
                                   <Link className="dropdown-item" to="/dashboard">
                                   Dashboard
                               </Link>
                                )}
                                
                                 <Link className="dropdown-item" to="orders/me">
                                        Orders
                                    </Link>

                                <Link className="dropdown-item" to="/me">
                                    Profile
                                </Link>

                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>

                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                    
                </div>

            </nav>
        </Fragment>
    )
}

export default Header
