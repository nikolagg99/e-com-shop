import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";

import { useDispatch, useSelector } from "react-redux";
import { getSelectedOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector(state => state.orderDetails)

  const {
    shippingInfo,
    orderItems,
    user,
    totalPrice,
    orderStatus,
  } = order

  useEffect(() => {
    console.log(match.params.id)
    dispatch(getSelectedOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`;

  return (
    <Fragment>
      <MetaData title={`Order ${order.id} Details`} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between mb-5">
            <div className="col-12 col-lg-8 mt-5 order-detils">
              <h1 className="my-5">Order {order.id}</h1>
              <h4 className="mb-4">Shipping Info</h4>

              <p>
                <b>Name: </b> {user && user.name}
              </p>
              <p>
                <b>Phone: </b> {shippingInfo && shippingInfo.phoneNumber}
              </p>
              <p className="mb-4">
                <b>Address:</b> {shippingDetails}
              </p>
              <p>
                <b>Amount: </b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Order status</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Delievered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items: </h4>

              <hr />

              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row mt-5">
                      <div className="col-4 col-lg-2">
                        <img src={item.image} alt={item.name} height="45" width="65" />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
