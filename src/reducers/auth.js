import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT
} from "../actions/types.js";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
};

export default function foo(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_FAIL:
        case LOGOUT:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };

        default:
            return state;
    }
}