import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

export const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //Calculate order prices
  const itemsPrice = cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 10;
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  const proceedToPayment = () => {
      const data = {
          itemsPrice: itemsPrice.toFixed(2),
          shippingPrice,
          totalPrice
      }

      sessionStorage.setItem('orderInfo', JSON.stringify(data));
      history.push('/payment');
  }

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between mb-5">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name: </b> {user && user.name}
          </p>
          <p>
            <b>Phone: </b> {shippingInfo.phoneNumber}
          </p>
          <p className="mb-4">
            <b>Address: </b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`}
          </p>

          <hr />

          <h4>Cart: </h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />

              <div className="my-1" >
                <div className="row">

                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="confirm" height="45" width="65" />
                  </div>

                  <div className="col-4 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} =<b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>

                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div>
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span>${itemsPrice}</span>
            </p>
            <p>
              Shipping: <span>${shippingPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span>${totalPrice}</span>
            </p>

            <hr />

            <button 
                className="btn btn-primary btn-block"
                onClick={proceedToPayment}
            >
                Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;