// actions/bookingActions.js
import { BOOKING_REQUEST, BOOKING_SUCCESS, BOOKING_FAILURE } from '../constants/bookingConstant'
import axios from 'axios';

export const bookAppointment = (bookingData) => async (dispatch) => {
    try {
        dispatch({ type: BOOKING_REQUEST });

        // Replace with your API endpoint
        const { data } = await axios.post('/api/booking', bookingData);

        dispatch({
            type: BOOKING_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: BOOKING_FAILURE,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message
        });
    }
};
