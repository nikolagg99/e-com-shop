import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

export const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title={'Successfully ordered'} />
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img 
                        className="my-5 img-fluid d-block mx-auto"
                        src="/images/success.png"
                        alt="Order Success"
                        width="200"
                        height="200"
                    />

                    <h2>Order sucess!!!!!!</h2>
                    <Link to="/orders/me">Orders</Link>

                </div>
            </div>
        </Fragment>
    )
}
