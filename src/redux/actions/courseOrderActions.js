import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_COURSE_ORDER",
  };
};

// CREATE COURSE_ORDER

export const createCourseOrder = (data) => {
  return function (dispatch) {
    dispatch(createCourseOrderStart());
    axios
      .post("courseorders", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createCourseOrderSuccess(data));
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
        dispatch(createCourseOrderError(resError));
      });
  };
};

const createCourseOrderStart = () => {
  return {
    type: "CREATE_COURSE_ORDER_START",
  };
};

const createCourseOrderSuccess = () => {
  return {
    type: "CREATE_COURSE_ORDER_SUCCESS",
  };
};

const createCourseOrderError = (error) => {
  return {
    type: "CREATE_COURSE_ORDER_ERROR",
    error,
  };
};

// LOAD COURSE_ORDERS

export const loadCourseOrders = (query = "") => {
  return function (dispatch) {
    dispatch(loadCourseOrdersStart());
    axios
      .get("courseorders?" + query)
      .then((response) => {
        const loadCourseOrders = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCourseOrdersSuccess(loadCourseOrders));
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
        dispatch(loadCourseOrdersError(resError));
      });
  };
};

export const loadCourseOrdersStart = () => {
  return {
    type: "LOAD_COURSE_ORDERS_START",
  };
};

export const loadCourseOrdersSuccess = (loadCourseOrders, pagination) => {
  return {
    type: "LOAD_COURSE_ORDERS_SUCCESS",
    loadCourseOrders,
    pagination,
  };
};

export const loadCourseOrdersError = (error) => {
  return {
    type: "LOAD_COURSE_ORDERS_ERROR",
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

export const deleteMultCourseOrder = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("courseorders/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCourseOrder = response.data.data;
        dispatch(deleteCourseOrderSuccess(deleteCourseOrder));
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
        dispatch(deleteCourseOrderError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_COURSE_ORDER_START",
  };
};

export const deleteCourseOrderSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_COURSE_ORDER_SUCCESS",
    deleteCourseOrder: deleteData,
  };
};

export const deleteCourseOrderError = (error) => {
  return {
    type: "DELETE_MULT_COURSE_ORDER_ERROR",
    error,
  };
};

// GET COURSE_ORDER

export const getInit = () => {
  return {
    type: "GET_COURSE_ORDER_INIT",
  };
};

export const getCourseOrder = (id) => {
  return function (dispatch) {
    dispatch(getCourseOrderStart());
    axios
      .get("courseorders/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCourseOrderSuccess(result));
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
        dispatch(getCourseOrderError(resError));
      });
  };
};

export const getCourseOrderStart = () => {
  return {
    type: "GET_COURSE_ORDER_START",
  };
};

export const getCourseOrderSuccess = (result) => {
  return {
    type: "GET_COURSE_ORDER_SUCCESS",
    courseorder: result,
  };
};

export const getCourseOrderError = (error) => {
  return {
    type: "GET_COURSE_ORDER_ERROR",
    error,
  };
};

//UPDATE COURSE_ORDER

export const updateCourseOrder = (id, data) => {
  return function (dispatch) {
    dispatch(updateCourseOrderStart());
    axios
      .put(`courseorders/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCourseOrderSuccess(result));
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
        dispatch(updateCourseOrderError(resError));
      });
  };
};

export const updateCourseOrderStart = () => {
  return {
    type: "UPDATE_COURSE_ORDER_START",
  };
};

export const updateCourseOrderSuccess = (result) => {
  return {
    type: "UPDATE_COURSE_ORDER_SUCCESS",
    updateCourseOrder: result,
  };
};

export const updateCourseOrderError = (error) => {
  return {
    type: "UPDATE_COURSE_ORDER_ERROR",
    error,
  };
};

export const getCountCourseOrder = () => {
  return function (dispatch) {
    dispatch(getCountCourseOrderStart());
    axios
      .get(`courseorders/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCourseOrderSuccess(result));
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
        dispatch(getCountCourseOrderError(resError));
      });
  };
};

export const getCountCourseOrderStart = () => {
  return {
    type: "GET_COUNT_COURSE_ORDER_START",
  };
};

export const getCountCourseOrderSuccess = (result) => {
  return {
    type: "GET_COUNT_COURSE_ORDER_SUCCESS",
    orderCount: result,
  };
};

export const getCountCourseOrderError = (error) => {
  return {
    type: "GET_COUNT_COURSE_ORDER_ERROR",
    error,
  };
};
