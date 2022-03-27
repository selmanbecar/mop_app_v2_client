import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";
import authService from "../Services/AuthService";


export const login = (email, password) => async (dispatch) => {

    const body = {email, password}

    try {
        const res = await authService.login(body)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res,

        });

    } catch (err) {
        const errors = err

        if (errors) {
            console.log(errors);
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};
export const register = (first_name, last_name, email, password) => async (dispatch) => {

    const body = {first_name, last_name, email, password}

    try {
        const res = await authService.register(body)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res,

        });

    } catch (err) {
        const errors = err

        if (errors) {
            console.log(errors);
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};


//LOGOUT / CLEAR PROFILE
export const logout = () => (dispatch) => {
    dispatch({type: LOGOUT});
};