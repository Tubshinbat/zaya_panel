import axios from "../../axios-base";

// SAVE NEWS
export const savePageInit = () => {
  return {
    type: "CREATE_PAGE_INIT",
  };
};

export const savePage = (page) => {
  return function (dispatch, getState) {
    dispatch(savePageStart());

    axios
      .post(`pages`, page)
      .then((response) => {
        const result = response.data;
        dispatch(savePageSuccess(result));
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
        dispatch(savePageError(resError));
      });
  };
};

export const savePageStart = () => {
  return {
    type: "CREATE_PAGE_START",
  };
};

export const savePageSuccess = (result) => {
  return {
    type: "CREATE_PAGE_SUCCESS",
    page: result,
  };
};

export const savePageError = (error) => {
  return {
    type: "CREATE_PAGE_ERROR",
    error,
  };
};

// LOAD NEWS

export const loadPage = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadPageStart());
    axios
      .get("pages?" + query)
      .then((response) => {
        const loadPage = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadPageSuccess(loadPage));
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
        dispatch(loadPageError(resError));
      });
  };
};

export const loadPageStart = () => {
  return {
    type: "LOAD_PAGES_START",
  };
};

export const loadPageSuccess = (loadPage, pagination) => {
  return {
    type: "LOAD_PAGES_SUCCESS",
    pages: loadPage,
    pagination,
  };
};

export const loadPageError = (error) => {
  return {
    type: "LOAD_PAGES_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGE_PAGINATION",
    pagination,
  };
};

export const deleteMultPage = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("pages/delete", { params: { id: ids } })
      .then((response) => {
        const deletePage = response.data.data;
        dispatch(deletePageSuccess(deletePage));
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
        dispatch(deletePageError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PAGE_START",
  };
};

export const deletePageSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PAGE_SUCCESS",
    deleteData,
  };
};

export const deletePageError = (error) => {
  return {
    type: "DELETE_MULT_PAGE_ERROR",
    error,
  };
};

// GET NEWS

export const getPage = (id) => {
  return function (dispatch, getState) {
    dispatch(getPageStart());
    axios
      .get("pages/" + id)
      .then((response) => {
        const page = response.data.data;
        dispatch(getPageSuccess(page));
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
        dispatch(getPageError(resError));
      });
  };
};

export const getInit = () => {
  return {
    type: "GET_PAGE_INIT",
  };
};

export const getPageStart = () => {
  return {
    type: "GET_PAGE_START",
  };
};

export const getPageSuccess = (page) => {
  return {
    type: "GET_PAGE_SUCCESS",
    page,
  };
};

export const getPageError = (error) => {
  return {
    type: "GET_PAGE_ERROR",
    error,
  };
};

//UPDATE NEWS

export const updatePage = (id, data) => {
  return function (dispatch) {
    dispatch(updatePageStart());
    axios
      .put(`pages/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updatePageSuccess(result));
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
        dispatch(updatePageError(resError));
      });
  };
};

export const updatePageStart = () => {
  return {
    type: "UPDATE_PAGE_START",
  };
};

export const updatePageSuccess = (result) => {
  return {
    type: "UPDATE_PAGE_SUCCESS",
  };
};

export const updatePageError = (error) => {
  return {
    type: "UPDATE_PAGE_ERROR",
    error,
  };
};

export const updateEnd = () => {
  return {
    type: "UPDATE_PAGE_END",
  };
};

export const getCountPage = () => {
  return function (dispatch) {
    dispatch(getCountPageStart());

    axios
      .get(`pages/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountPageSuccess(result));
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
        dispatch(getCountPageError(resError));
      });
  };
};

export const getCountPageStart = () => {
  return {
    type: "GET_COUNT_PAGE_START",
  };
};

export const getCountPageSuccess = (result) => {
  return {
    type: "GET_COUNT_PAGE_SUCCESS",
    orderCount: result,
  };
};

export const getCountPageError = (error) => {
  return {
    type: "GET_COUNT_PAGE_ERROR",
    error,
  };
};
