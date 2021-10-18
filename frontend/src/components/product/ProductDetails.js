import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from 'react-bootstrap';

import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

const ProductDetails = ({ match }) => {
  
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const addItemsToCart = () => {
    dispatch(addToCart(match.params.id, quantity));
    alert.success('Item added to cart')
  }

  //Increase the quantity with button plus
  const increaseQtyStock = () => {
    const count = document.querySelector('.count')

    if( count.valueAsNumber >= product.stock ) {
      return;
    }

    const quantity = count.valueAsNumber + 1;
    setQuantity(quantity);

  }

  //Decrease the quantity with button minus
  const decreaseQtyStock = () => {
    const count = document.querySelector('.count')

    if( count.valueAsNumber <= 1 ) {
      return;
    }

    const quantity = count.valueAsNumber - 1;
    setQuantity(quantity);

  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={product.name} />
            <div className="row f-flex justify-content-around product-details-container">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause='hover' className="test">
                    {product.images && product.images.map(image => (
                        <Carousel.Item key={image.public_id}>
                            <img className="d-block w-100" src={image.url} alt={product.title}/>
                        </Carousel.Item>
                    ))}
                </Carousel>
              </div>

            
              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id"> Product no. {product._id}</p>

                <hr />

                <p id="product_price">${product.price}</p>
                
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQtyStock}>-</span>

                  <input
                    type="number"
                    className="count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQtyStock}>+</span>
                </div>

                <button
                  type="button"
                  id="add_to_cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled = {product.stock === 0}
                  onClick={addItemsToCart}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                    Status:
                    <span id="stock_status" className={product.stock>0 ? 'greenColor' : 'redColor'}>
                        {product.stock > 0 ? 'In Stock' : 'Out of stock'}
                    </span>
                </p>

                <hr />
                <h4 className="mt-2">Description: </h4>
                <p>{product.description}</p>

                <hr />

                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>

              </div>
              </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
