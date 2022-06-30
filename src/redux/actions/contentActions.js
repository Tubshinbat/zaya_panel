import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CONTENT",
  };
};

// CREATE CONTENT

export const createContent = (data) => {
  return function (dispatch) {
    dispatch(createContentStart());
    axios
      .post("contents", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createContentSuccess(data));
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
        dispatch(createContentError(resError));
      });
  };
};

const createContentStart = () => {
  return {
    type: "CREATE_CONTENT_START",
  };
};

const createContentSuccess = () => {
  return {
    type: "CREATE_CONTENT_SUCCESS",
  };
};

const createContentError = (error) => {
  return {
    type: "CREATE_CONTENT_ERROR",
    error,
  };
};

// LOAD CONTENTS

export const loadContents = (query = "") => {
  return function (dispatch) {
    dispatch(loadContentsStart());
    axios
      .get("contents?" + query)
      .then((response) => {
        const loadContents = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadContentsSuccess(loadContents));
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
        dispatch(loadContentsError(resError));
      });
  };
};

export const loadContentsStart = () => {
  return {
    type: "LOAD_CONTENTS_START",
  };
};

export const loadContentsSuccess = (loadContents, pagination) => {
  return {
    type: "LOAD_CONTENTS_SUCCESS",
    loadContents,
    pagination,
  };
};

export const loadContentsError = (error) => {
  return {
    type: "LOAD_CONTENTS_ERROR",
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

export const deleteMultContent = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("contents/delete", { params: { id: ids } })
      .then((response) => {
        const deleteContent = response.data.data;
        dispatch(deleteContentSuccess(deleteContent));
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
        dispatch(deleteContentError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CONTENT_START",
  };
};

export const deleteContentSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CONTENT_SUCCESS",
    deleteContent: deleteData,
  };
};

export const deleteContentError = (error) => {
  return {
    type: "DELETE_MULT_CONTENT_ERROR",
    error,
  };
};

// GET CONTENT

export const getInit = () => {
  return {
    type: "GET_CONTENT_INIT",
  };
};

export const getContent = (id) => {
  return function (dispatch) {
    dispatch(getContentStart());
    axios
      .get("contents/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getContentSuccess(result));
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
        dispatch(getContentError(resError));
      });
  };
};

export const getContentStart = () => {
  return {
    type: "GET_CONTENT_START",
  };
};

export const getContentSuccess = (result) => {
  return {
    type: "GET_CONTENT_SUCCESS",
    content: result,
  };
};

export const getContentError = (error) => {
  return {
    type: "GET_CONTENT_ERROR",
    error,
  };
};

//UPDATE CONTENT

export const updateContent = (id, data) => {
  return function (dispatch) {
    dispatch(updateContentStart());
    axios
      .put(`contents/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateContentSuccess(result));
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
        dispatch(updateContentError(resError));
      });
  };
};

export const updateContentStart = () => {
  return {
    type: "UPDATE_CONTENT_START",
  };
};

export const updateContentSuccess = (result) => {
  return {
    type: "UPDATE_CONTENT_SUCCESS",
    updateContent: result,
  };
};

export const updateContentError = (error) => {
  return {
    type: "UPDATE_CONTENT_ERROR",
    error,
  };
};

export const getCountContent = () => {
  return function (dispatch) {
    dispatch(getCountContentStart());
    axios
      .get(`contents/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountContentSuccess(result));
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
        dispatch(getCountContentError(resError));
      });
  };
};

export const getCountContentStart = () => {
  return {
    type: "GET_COUNT_CONTENT_START",
  };
};

export const getCountContentSuccess = (result) => {
  return {
    type: "GET_COUNT_CONTENT_SUCCESS",
    orderCount: result,
  };
};

export const getCountContentError = (error) => {
  return {
    type: "GET_COUNT_CONTENT_ERROR",
    error,
  };
};
