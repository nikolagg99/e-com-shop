import React, { Fragment, useEffect } from "react";

import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { createOrder, clearErrors } from "../../actions/orderActions";

export const Payment = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems, shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const orderStock = (e) => {
        e.preventDefault();

        console.log(order)
        dispatch(createOrder(order));
        
        history.push('/success');
        
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <CheckoutSteps shipping confirmOrder payment />

            <div className="row d-flex justify-content-between">
                <form className="col-12 col-lg-8 mt-5 paiment-wrap" onSubmit={orderStock}>
                    <h4 className="mb-3">Choose Payment Method</h4>
                    
                    <hr />
                    
                    <div>
                        <input type="radio" value="CashOnDelievery" name="CashOnDelievery" defaultChecked/> Cash on delievery<br/>
                        <input type="radio" value="paypal" name="paypal" disabled/> Paypal(In the making)
                    </div>

                    <hr />

                    <button 
                        className="btn btn-primary btn-block"
                    >
                        Order
                    </button>
                </form>
            </div>

        </Fragment>
    )
}
