import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_BOOKING_TYPE",
  };
};

// CREATE BOOKING_TYPE

export const createBookingType = (data) => {
  return function (dispatch) {
    dispatch(createBookingTypeStart());
    axios
      .post("bookingTypes", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createBookingTypeSuccess(data));
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
        dispatch(createBookingTypeError(resError));
      });
  };
};

const createBookingTypeStart = () => {
  return {
    type: "CREATE_BOOKING_TYPE_START",
  };
};

const createBookingTypeSuccess = () => {
  return {
    type: "CREATE_BOOKING_TYPE_SUCCESS",
  };
};

const createBookingTypeError = (error) => {
  return {
    type: "CREATE_BOOKING_TYPE_ERROR",
    error,
  };
};

// LOAD BOOKING_TYPES

export const loadBookingTypes = (query = "") => {
  return function (dispatch) {
    dispatch(loadBookingTypesStart());
    axios
      .get("bookingTypes?" + query)
      .then((response) => {
        const loadBookingTypes = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBookingTypesSuccess(loadBookingTypes));
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
        dispatch(loadBookingTypesError(resError));
      });
  };
};

export const loadBookingTypesStart = () => {
  return {
    type: "LOAD_BOOKING_TYPES_START",
  };
};

export const loadBookingTypesSuccess = (loadBookingTypes, pagination) => {
  return {
    type: "LOAD_BOOKING_TYPES_SUCCESS",
    loadBookingTypes,
    pagination,
  };
};

export const loadBookingTypesError = (error) => {
  return {
    type: "LOAD_BOOKING_TYPES_ERROR",
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

export const deleteMultBookingType = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("bookingTypes/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBookingType = response.data.data;
        dispatch(deleteBookingTypeSuccess(deleteBookingType));
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
        dispatch(deleteBookingTypeError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BOOKING_TYPE_START",
  };
};

export const deleteBookingTypeSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BOOKING_TYPE_SUCCESS",
    deleteBookingType: deleteData,
  };
};

export const deleteBookingTypeError = (error) => {
  return {
    type: "DELETE_MULT_BOOKING_TYPE_ERROR",
    error,
  };
};

// GET BOOKING_TYPE

export const getInit = () => {
  return {
    type: "GET_BOOKING_TYPE_INIT",
  };
};

export const getBookingType = (id) => {
  return function (dispatch) {
    dispatch(getBookingTypeStart());
    axios
      .get("bookingTypes/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getBookingTypeSuccess(result));
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
        dispatch(getBookingTypeError(resError));
      });
  };
};

export const getBookingTypeStart = () => {
  return {
    type: "GET_BOOKING_TYPE_START",
  };
};

export const getBookingTypeSuccess = (result) => {
  return {
    type: "GET_BOOKING_TYPE_SUCCESS",
    bookingType: result,
  };
};

export const getBookingTypeError = (error) => {
  return {
    type: "GET_BOOKING_TYPE_ERROR",
    error,
  };
};

//UPDATE BOOKING_TYPE

export const updateBookingType = (id, data) => {
  return function (dispatch) {
    dispatch(updateBookingTypeStart());
    axios
      .put(`bookingTypes/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBookingTypeSuccess(result));
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
        dispatch(updateBookingTypeError(resError));
      });
  };
};

export const updateBookingTypeStart = () => {
  return {
    type: "UPDATE_BOOKING_TYPE_START",
  };
};

export const updateBookingTypeSuccess = (result) => {
  return {
    type: "UPDATE_BOOKING_TYPE_SUCCESS",
    updateBookingType: result,
  };
};

export const updateBookingTypeError = (error) => {
  return {
    type: "UPDATE_BOOKING_TYPE_ERROR",
    error,
  };
};

export const getCountBookingType = () => {
  return function (dispatch) {
    dispatch(getCountBookingTypeStart());
    axios
      .get(`bookingTypes/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBookingTypeSuccess(result));
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
        dispatch(getCountBookingTypeError(resError));
      });
  };
};

export const getCountBookingTypeStart = () => {
  return {
    type: "GET_COUNT_BOOKING_TYPE_START",
  };
};

export const getCountBookingTypeSuccess = (result) => {
  return {
    type: "GET_COUNT_BOOKING_TYPE_SUCCESS",
    orderCount: result,
  };
};

export const getCountBookingTypeError = (error) => {
  return {
    type: "GET_COUNT_BOOKING_TYPE_ERROR",
    error,
  };
};
