import React, { Fragment,useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import MetaData from './layouts/MetaData';
import Product from './product/Product';
import Loader from './layouts/Loader';

import { useDispatch, useSelector} from 'react-redux';
import { getProducts } from '../actions/productActions';
import { useAlert } from 'react-alert';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {

        if(error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category));

    }, [dispatch,alert, error, keyword, currentPage, price, category])
    
    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if(keyword) {
        count = filteredProductsCount;
    }

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={"Best Online Brand"}/>
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row wrap-filter">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-12 col-md-3 mt-5 mb-5 m-auto filter">
                                        <div className="px-5">
                                            <Range 
                                                marks ={{
                                                    1 : `$1`,
                                                    1000 : `$1000`
                                                }}
                                                min = {1}
                                                max = {1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>

                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{cursor: 'pointer',
                                                                    listStyleType: 'none'
                                                                }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}

                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-9 mt-7 m-auto filtered-product">
                                        <div className="row">
                                                {
                                                    products && products.map(product =>(
                                                        <Product key={product._id} product={product} col={4}/>            
                                                    ))
                                                }
                                        </div>


                                    </div>
                                </Fragment>
                            ): (
                                products && products.map(product =>(
                                    <Product key={product._id} product={product} col={3}/>            
                                ))
                            )}   
                        </div>
                    </section>

                    {resultsPerPage <= count && (
                        <div className="d-flex justify-content-center mb-5 mt-5">
                        <Pagination
                            className="pagination"
                            activePage = { currentPage }
                            itemsCountPerPage = { resultsPerPage }
                            totalItemsCount = { productsCount }
                            onChange = { setCurrentPageNumber } 
                            nextPageText = { '⟩' }
                            prevPageText = { '⟨' }
                            firstPageText = { '«' }
                            lastPageText = { '»' } 
                            itemClass = "page-item"
                            linkClass = "page-link"
                        />

                    </div>
                    )}        
                </Fragment>
            )}   
        </Fragment>
    )
}

export default Home
