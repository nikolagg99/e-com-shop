import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav className="sidebar-nav" id="sidebar">
                <ul>
                    <li className="pt-2">
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dasboard</Link>
                    </li>
                
                    <li className="pt-3">
                        <a 
                            id="product-menu"
                            href="#productSubmenu"
                            data-toggle="collapse"
                            aria-expanded="false"
                            className="dropdown-toggle p-1"
                        >
                            <i className="fa fa-product-hunt"></i> Products
                        </a>
                        <ul className="collapse list-unstyled menu-items pl-4" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="pt-3">
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li className="pt-3">
                        <Link to="/admin/users"><i className="fa fa-star"></i> Users</Link>
                    </li>
                </ul>
            </nav> 
        </div>
    )
}

export default Sidebar
