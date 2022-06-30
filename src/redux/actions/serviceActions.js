import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_SERVICE",
  };
};

// CREATE SERVICE

export const createService = (data) => {
  return function (dispatch) {
    dispatch(createServiceStart());
    axios
      .post("services", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createServiceSuccess(data));
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

        dispatch(createServiceError(resError));
      });
  };
};

const createServiceStart = () => {
  return {
    type: "CREATE_SERVICE_START",
  };
};

const createServiceSuccess = () => {
  return {
    type: "CREATE_SERVICE_SUCCESS",
  };
};

const createServiceError = (error) => {
  return {
    type: "CREATE_SERVICE_ERROR",
    error,
  };
};

// LOAD SERVICES

export const loadServices = (query = "") => {
  return function (dispatch) {
    dispatch(loadServicesStart());
    axios
      .get("services?" + query)
      .then((response) => {
        const loadServices = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadServicesSuccess(loadServices));
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
        dispatch(loadServicesError(resError));
      });
  };
};

export const loadServicesStart = () => {
  return {
    type: "LOAD_SERVICES_START",
  };
};

export const loadServicesSuccess = (loadServices, pagination) => {
  return {
    type: "LOAD_SERVICES_SUCCESS",
    loadServices,
    pagination,
  };
};

export const loadServicesError = (error) => {
  return {
    type: "LOAD_SERVICES_ERROR",
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

export const deleteMultService = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("services/delete", { params: { id: ids } })
      .then((response) => {
        const deleteService = response.data.data;
        dispatch(deleteServiceSuccess(deleteService));
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
        dispatch(deleteServiceError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_SERVICE_START",
  };
};

export const deleteServiceSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_SERVICE_SUCCESS",
    deleteService: deleteData,
  };
};

export const deleteServiceError = (error) => {
  return {
    type: "DELETE_MULT_SERVICE_ERROR",
    error,
  };
};

// GET SERVICE

export const getInit = () => {
  return {
    type: "GET_SERVICE_INIT",
  };
};

export const getService = (id) => {
  return function (dispatch) {
    dispatch(getServiceStart());
    axios
      .get("services/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getServiceSuccess(result));
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
        dispatch(getServiceError(resError));
      });
  };
};

export const getServiceStart = () => {
  return {
    type: "GET_SERVICE_START",
  };
};

export const getServiceSuccess = (result) => {
  return {
    type: "GET_SERVICE_SUCCESS",
    service: result,
  };
};

export const getServiceError = (error) => {
  return {
    type: "GET_SERVICE_ERROR",
    error,
  };
};

//UPDATE SERVICE

export const updateService = (id, data) => {
  return function (dispatch) {
    dispatch(updateServiceStart());
    axios
      .put(`services/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateServiceSuccess(result));
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
        dispatch(updateServiceError(resError));
      });
  };
};

export const updateServiceStart = () => {
  return {
    type: "UPDATE_SERVICE_START",
  };
};

export const updateServiceSuccess = (result) => {
  return {
    type: "UPDATE_SERVICE_SUCCESS",
    updateService: result,
  };
};

export const updateServiceError = (error) => {
  return {
    type: "UPDATE_SERVICE_ERROR",
    error,
  };
};

export const getCountService = () => {
  return function (dispatch) {
    dispatch(getCountServiceStart());
    axios
      .get(`services/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountServiceSuccess(result));
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
        dispatch(getCountServiceError(resError));
      });
  };
};

export const getCountServiceStart = () => {
  return {
    type: "GET_COUNT_SERVICE_START",
  };
};

export const getCountServiceSuccess = (result) => {
  return {
    type: "GET_COUNT_SERVICE_SUCCESS",
    serviceCount: result,
  };
};

export const getCountServiceError = (error) => {
  return {
    type: "GET_COUNT_SERVICE_ERROR",
    error,
  };
};
