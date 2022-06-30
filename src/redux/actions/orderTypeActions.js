import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_ORDER_TYPE",
  };
};

// CREATE ORDER_TYPE

export const createOrderType = (data) => {
  return function (dispatch) {
    dispatch(createOrderTypeStart());
    axios
      .post("ordertypes", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createOrderTypeSuccess(data));
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
        dispatch(createOrderTypeError(resError));
      });
  };
};

const createOrderTypeStart = () => {
  return {
    type: "CREATE_ORDER_TYPE_START",
  };
};

const createOrderTypeSuccess = () => {
  return {
    type: "CREATE_ORDER_TYPE_SUCCESS",
  };
};

const createOrderTypeError = (error) => {
  return {
    type: "CREATE_ORDER_TYPE_ERROR",
    error,
  };
};

// LOAD ORDER_TYPES

export const loadOrderTypes = (query = "") => {
  return function (dispatch) {
    dispatch(loadOrderTypesStart());
    axios
      .get("ordertypes?" + query)
      .then((response) => {
        const loadOrderTypes = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadOrderTypesSuccess(loadOrderTypes));
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
        dispatch(loadOrderTypesError(resError));
      });
  };
};

export const loadOrderTypesStart = () => {
  return {
    type: "LOAD_ORDER_TYPES_START",
  };
};

export const loadOrderTypesSuccess = (loadOrderTypes, pagination) => {
  return {
    type: "LOAD_ORDER_TYPES_SUCCESS",
    loadOrderTypes,
    pagination,
  };
};

export const loadOrderTypesError = (error) => {
  return {
    type: "LOAD_ORDER_TYPES_ERROR",
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

export const deleteMultOrderType = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("ordertypes/delete", { params: { id: ids } })
      .then((response) => {
        const deleteOrderType = response.data.data;
        dispatch(deleteOrderTypeSuccess(deleteOrderType));
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
        dispatch(deleteOrderTypeError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_ORDER_TYPE_START",
  };
};

export const deleteOrderTypeSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_ORDER_TYPE_SUCCESS",
    deleteOrderType: deleteData,
  };
};

export const deleteOrderTypeError = (error) => {
  return {
    type: "DELETE_MULT_ORDER_TYPE_ERROR",
    error,
  };
};

// GET ORDER_TYPE

export const getInit = () => {
  return {
    type: "GET_ORDER_TYPE_INIT",
  };
};

export const getOrderType = (id) => {
  return function (dispatch) {
    dispatch(getOrderTypeStart());
    axios
      .get("ordertypes/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getOrderTypeSuccess(result));
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
        dispatch(getOrderTypeError(resError));
      });
  };
};

export const getOrderTypeStart = () => {
  return {
    type: "GET_ORDER_TYPE_START",
  };
};

export const getOrderTypeSuccess = (result) => {
  return {
    type: "GET_ORDER_TYPE_SUCCESS",
    ordertype: result,
  };
};

export const getOrderTypeError = (error) => {
  return {
    type: "GET_ORDER_TYPE_ERROR",
    error,
  };
};

//UPDATE ORDER_TYPE

export const updateOrderType = (id, data) => {
  return function (dispatch) {
    dispatch(updateOrderTypeStart());
    axios
      .put(`ordertypes/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateOrderTypeSuccess(result));
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
        dispatch(updateOrderTypeError(resError));
      });
  };
};

export const updateOrderTypeStart = () => {
  return {
    type: "UPDATE_ORDER_TYPE_START",
  };
};

export const updateOrderTypeSuccess = (result) => {
  return {
    type: "UPDATE_ORDER_TYPE_SUCCESS",
    updateOrderType: result,
  };
};

export const updateOrderTypeError = (error) => {
  return {
    type: "UPDATE_ORDER_TYPE_ERROR",
    error,
  };
};

export const getCountOrderType = () => {
  return function (dispatch) {
    dispatch(getCountOrderTypeStart());
    axios
      .get(`ordertypes/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountOrderTypeSuccess(result));
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
        dispatch(getCountOrderTypeError(resError));
      });
  };
};

export const getCountOrderTypeStart = () => {
  return {
    type: "GET_COUNT_ORDER_TYPE_START",
  };
};

export const getCountOrderTypeSuccess = (result) => {
  return {
    type: "GET_COUNT_ORDER_TYPE_SUCCESS",
    ordertypeCount: result,
  };
};

export const getCountOrderTypeError = (error) => {
  return {
    type: "GET_COUNT_ORDER_TYPE_ERROR",
    error,
  };
};
