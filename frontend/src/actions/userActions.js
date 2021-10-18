import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

//Login 
export const login = (email, password) => async ( dsipatch ) => {
    try {
        dsipatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

        dsipatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dsipatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Register user
export const register = (userData) => async ( dsipatch ) => {
    try {
        dsipatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        
        const { data } = await axios.post('/api/v1/register', userData, config)
   
        dsipatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dsipatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async ( dsipatch ) => {
    try {
        dsipatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')
   
        dsipatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dsipatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Logout user
export const logout = () => async ( dsipatch ) => {
    try {

        await axios.get('/api/v1/logout')
   
        dsipatch({
            type: LOGOUT_SUCCESS
        })

    } catch(error) {
        dsipatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update user profile
export const updateProfile = (userData) => async ( dsipatch ) => {
    try {
        dsipatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.put('/api/v1/me/update', userData, config)
   
        dsipatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dsipatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update password
export const updatePassword = (passwords) => async ( dsipatch ) => {
    try {
        dsipatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.put('/api/v1/password/update', passwords, config)
   
        dsipatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dsipatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//All Users - ADMIN
export const allUsers = () => async ( dsipatch ) => {
    try {
        dsipatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')
   
        dsipatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch(error) {
        dsipatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update user - ADMIN
export const updateUser = (id, userData) => async ( dsipatch ) => {
    try {
        dsipatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config)
   
        dsipatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dsipatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get user details - ADMIN
export const getUserDetails = (id) => async ( dsipatch ) => {
    try {
        dsipatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/user/${id}`)
   
        dsipatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dsipatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete user - ADMIN
export const deleteUser = (id) => async ( dsipatch ) => {
    try {
        dsipatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)
   
        dsipatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dsipatch({
            type: DELETE_USER_FAIL,
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