import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layouts/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";

export const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  //Increase the quantity with button plus
  const increaseQtyStock = (id, quantity, stock) => {
    const newQuantity = quantity + 1;

    if( newQuantity > stock ) {
      return;
    }

    dispatch(addToCart(id, newQuantity));

  }

  //Decrease the quantity with button minus
  const decreaseQtyStock = (id, quantity) => {
    const newQuantity = quantity - 1;

    if( newQuantity <= 1 ) {
      return;
    }

    dispatch(addToCart(id, newQuantity));

  }

  //
  const checkOutHandler = () => {
    history.push(`/login?redirect=shipping`);
  }

  return (
    <Fragment>
      <MetaData title={"Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5 ">Your cart is empty</h2>
      ) : (
        <Fragment>
          <h2 className="m-5 cart-title">
            Cart Items: <b>{cartItems.length}</b>
          </h2>

          <div className="row d-flex justify-content-between m-3">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />

                  <div className="cart-item" >
                    <div className="row cart-item-wrapper">

                      <div className="col-6 col-lg-3 item">
                        <img src={item.image} alt="Product" height="90" width="115" />
                      </div>

                      <div className="col-6 col-lg-3 item">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-6 col-lg-2 mt-4 mt-lg-0 item">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-6 col-lg-3 mt-4 mt-lg-0 item">
                        
                        <div className="d-inline quantity-container">
                          <span 
                            className="btn btn-danger minus" 
                            onClick={() => decreaseQtyStock(item.product, item.quantity)}
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control-count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span 
                            className="btn btn-primary plus"
                            onClick={() => increaseQtyStock(item.product, item.quantity, item.stock)}
                          >
                            +
                          </span>
                        </div>
                      
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0 item">
                        <i 
                          className="fa fa-trash btn btn-danger delete-from-cart"
                          onClick={() => removeCartItemHandler(item.product)}
                        >
                        </i>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4 p-4 order-summary">
              <div>
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal: <span>{cartItems.reduce((accumulator, item) => (accumulator + Number(item.quantity)), 0)} Units</span></p>
                <p>Total: <span>${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}</span></p>

                <hr />

                <button
                  className="btn btn-primary btn-block"
                  onClick={checkOutHandler}
                  >
                  Check Out
                </button>
              </div>

            </div>

          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
