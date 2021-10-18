import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ match }) => {
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;
  const { error, isUpdated } = useSelector(state => state.order);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getSelectedOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order updated successfully!!!");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`;

  return (
    <Fragment>
      <MetaData title={`Process order #${order && order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-atound">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Order # {order._id}</h2>

                  <h4 className="mb-4">Shipping info</h4>
                  <p>
                    <b>Name: </b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone: </b> {shippingInfo && shippingInfo.phoneNumber}
                  </p>
                  <p>
                    <b>Address: </b> {shippingDetails}
                  </p>
                  <p>
                    <b>Amount: </b> ${totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Order Status: </h4>
                  <p 
                    className={order.orderStatus && String(order.orderStatus)
                        .includes('Delievered') ? "greenColor" : "redColor"}
                    >
                    <b>{orderStatus}</b>
                  </p>

                  <h4>Order Items:</h4>
                  <hr />

                  <div className="cart-item my-1">
                    <div className="cart-item my-1">
                      {orderItems &&
                        orderItems.map((item) => (
                          <div key={item.product} className="row mt-5">
                            <div className="col-4 col-lg-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                height="45"
                                width="65"
                              />
                            </div>

                            <div className="col-5 col-lg-5">
                              <Link to={`/products/${item.product}`}>
                                {item.name}
                              </Link>
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
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select 
                        className="form-control" 
                        name="status" 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delievered">Delievered</option>
                    </select>
                  </div>

                  <button 
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(order._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;