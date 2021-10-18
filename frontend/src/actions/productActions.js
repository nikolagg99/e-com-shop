import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CLEAR_ERRORS

} from '../constants/productConstants'


//Get all products function
export const getProducts = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST})

        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

        if(category) {
            link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;

        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Get product details function
export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCTS_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch(error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response.data.message 
        })
    }
}

//New product - ADMIN
export const createProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        for (var pair of productData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch(error) {
        console.log(error.response);
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Update product - ADMIN
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
       
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        console.log(error.response);
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Delete product - ADMIN
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST})

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        console.log(error.response);
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Get product details function - ADMIN
export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST})

        const { data } = await axios.get(`/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch(error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message 
        })
    }
}

//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}