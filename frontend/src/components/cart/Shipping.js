import React, { Fragment, useState } from "react";

import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

export const Shipping = ({ history }) => {

    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingInfo({ address, city, phoneNumber, postalCode}));
        history.push('/orders/confirm');
    }

    return (
        <Fragment>
            <MetaData title={'Shipping info'} />

            <CheckoutSteps shipping/>

            <div className="row">
                <div className="col-10 col-lg-5 inner-container">
                    <form className="shadow-lg shipping-form" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping info</h1>
                        
                        <div className="form-group">
                            <label htmlFor="address">Address: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number: </label>
                            <input
                                type="phone"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Next
                        </button>

                    </form>
                </div>

            </div>
        </Fragment>
    )
}
