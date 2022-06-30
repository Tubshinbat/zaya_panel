import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_BOOKING",
  };
};

// CREATE BOOKING

export const createBooking = (data) => {
  return function (dispatch) {
    dispatch(createBookingStart());
    axios
      .post("bookings", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createBookingSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(createBookingError(resError));
      });
  };
};

const createBookingStart = () => {
  return {
    type: "CREATE_BOOKING_START",
  };
};

const createBookingSuccess = () => {
  return {
    type: "CREATE_BOOKING_SUCCESS",
  };
};

const createBookingError = (error) => {
  return {
    type: "CREATE_BOOKING_ERROR",
    error,
  };
};

// LOAD BOOKINGS

export const loadBookings = (query = "") => {
  return function (dispatch) {
    dispatch(loadBookingsStart());
    axios
      .get("bookings?" + query)
      .then((response) => {
        const loadBookings = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBookingsSuccess(loadBookings));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }

        dispatch(loadBookingsError(resError));
      });
  };
};

export const loadBookingsStart = () => {
  return {
    type: "LOAD_BOOKINGS_START",
  };
};

export const loadBookingsSuccess = (loadBookings, pagination) => {
  return {
    type: "LOAD_BOOKINGS_SUCCESS",
    loadBookings,
    pagination,
  };
};

export const loadBookingsError = (error) => {
  return {
    type: "LOAD_BOOKINGS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

// DELETE MULT

export const deleteMultBooking = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("bookings/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBooking = response.data.data;
        dispatch(deleteBookingSuccess(deleteBooking));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(deleteBookingError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BOOKING_START",
  };
};

export const deleteBookingSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BOOKING_SUCCESS",
    deleteBooking: deleteData,
  };
};

export const deleteBookingError = (error) => {
  return {
    type: "DELETE_MULT_BOOKING_ERROR",
    error,
  };
};

// GET BOOKING

export const getInit = () => {
  return {
    type: "GET_BOOKING_INIT",
  };
};

export const getBooking = (id) => {
  return function (dispatch) {
    dispatch(getBookingStart());
    axios
      .get("bookings/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getBookingSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(getBookingError(resError));
      });
  };
};

export const getBookingStart = () => {
  return {
    type: "GET_BOOKING_START",
  };
};

export const getBookingSuccess = (result) => {
  return {
    type: "GET_BOOKING_SUCCESS",
    booking: result,
  };
};

export const getBookingError = (error) => {
  return {
    type: "GET_BOOKING_ERROR",
    error,
  };
};

//UPDATE BOOKING

export const updateBooking = (id, data) => {
  return function (dispatch) {
    dispatch(updateBookingStart());
    axios
      .put(`bookings/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBookingSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(updateBookingError(resError));
      });
  };
};

export const updateBookingStart = () => {
  return {
    type: "UPDATE_BOOKING_START",
  };
};

export const updateBookingSuccess = (result) => {
  return {
    type: "UPDATE_BOOKING_SUCCESS",
    updateBooking: result,
  };
};

export const updateBookingError = (error) => {
  return {
    type: "UPDATE_BOOKING_ERROR",
    error,
  };
};

export const getCountBooking = () => {
  return function (dispatch) {
    dispatch(getCountBookingStart());
    axios
      .get(`bookings/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBookingSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(getCountBookingError(resError));
      });
  };
};

export const getCountBookingStart = () => {
  return {
    type: "GET_COUNT_BOOKING_START",
  };
};

export const getCountBookingSuccess = (result) => {
  return {
    type: "GET_COUNT_BOOKING_SUCCESS",
    orderCount: result,
  };
};

export const getCountBookingError = (error) => {
  return {
    type: "GET_COUNT_BOOKING_ERROR",
    error,
  };
};
