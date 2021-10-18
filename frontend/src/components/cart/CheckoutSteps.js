import React from 'react';
import { Link } from 'react-router-dom';

export const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="d-flex justify-content-center mt-5 step-wrap">
            {shipping ? <Link to="/shipping" className="float-right step">
                
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping</div>
                <div className="triangle-active"></div>

            </Link> : <Link to="#" disabled className="step">
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Shipping</div>
                <div className="triangle-incomplete"></div>
            </Link>}

            {confirmOrder ? <Link to="/orders/confirm" className="float-right step">
                
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>

            </Link> : <Link to="#" disabled className="step">
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Confirm Order</div>
                <div className="triangle-incomplete"></div>
            </Link>}

            {payment ? <Link to="/payment" className="float-right step">
                
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>

            </Link> : <Link to="#" disabled className="step">
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incomplete"></div>
            </Link>}
        
        </div>
    )
}

export default CheckoutSteps;
