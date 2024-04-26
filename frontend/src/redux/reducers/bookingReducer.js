// reducers/bookingReducer.js
import { BOOKING_REQUEST, BOOKING_SUCCESS, BOOKING_FAILURE } from '../constants/bookingConstant';

const initialState = {
    loading: false,
    bookingInfo: null,
    error: ''
};

export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKING_REQUEST:
            return { ...state, loading: true };
        case BOOKING_SUCCESS:
            return { ...state, loading: false, bookingInfo: action.payload };
        case BOOKING_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
