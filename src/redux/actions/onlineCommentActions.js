import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_ONLINE_COMMENT",
  };
};

// CREATE ONLINE_COMMENT

export const createOnlineComment = (data) => {
  return function (dispatch) {
    dispatch(createOnlineCommentStart());
    axios
      .post("onlinecomments", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createOnlineCommentSuccess(data));
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
        dispatch(createOnlineCommentError(resError));
      });
  };
};

const createOnlineCommentStart = () => {
  return {
    type: "CREATE_ONLINE_COMMENT_START",
  };
};

const createOnlineCommentSuccess = () => {
  return {
    type: "CREATE_ONLINE_COMMENT_SUCCESS",
  };
};

const createOnlineCommentError = (error) => {
  return {
    type: "CREATE_ONLINE_COMMENT_ERROR",
    error,
  };
};

// LOAD ONLINE_COMMENTS

export const loadOnlineComments = (query = "") => {
  return function (dispatch) {
    dispatch(loadOnlineCommentsStart());
    axios
      .get("onlinecomments?" + query)
      .then((response) => {
        const loadOnlineComments = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadOnlineCommentsSuccess(loadOnlineComments));
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
        dispatch(loadOnlineCommentsError(resError));
      });
  };
};

export const loadOnlineCommentsStart = () => {
  return {
    type: "LOAD_ONLINE_COMMENTS_START",
  };
};

export const loadOnlineCommentsSuccess = (loadOnlineComments, pagination) => {
  return {
    type: "LOAD_ONLINE_COMMENTS_SUCCESS",
    loadOnlineComments,
    pagination,
  };
};

export const loadOnlineCommentsError = (error) => {
  return {
    type: "LOAD_ONLINE_COMMENTS_ERROR",
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

export const deleteMultOnlineComment = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("onlinecomments/delete", { params: { id: ids } })
      .then((response) => {
        const deleteOnlineComment = response.data.data;
        dispatch(deleteOnlineCommentSuccess(deleteOnlineComment));
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
        dispatch(deleteOnlineCommentError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_ONLINE_COMMENT_START",
  };
};

export const deleteOnlineCommentSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_ONLINE_COMMENT_SUCCESS",
    deleteOnlineComment: deleteData,
  };
};

export const deleteOnlineCommentError = (error) => {
  return {
    type: "DELETE_MULT_ONLINE_COMMENT_ERROR",
    error,
  };
};

// GET ONLINE_COMMENT

export const getInit = () => {
  return {
    type: "GET_ONLINE_COMMENT_INIT",
  };
};

export const getOnlineComment = (id) => {
  return function (dispatch) {
    dispatch(getOnlineCommentStart());
    axios
      .get("onlinecomments/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getOnlineCommentSuccess(result));
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
        dispatch(getOnlineCommentError(resError));
      });
  };
};

export const getOnlineCommentStart = () => {
  return {
    type: "GET_ONLINE_COMMENT_START",
  };
};

export const getOnlineCommentSuccess = (result) => {
  return {
    type: "GET_ONLINE_COMMENT_SUCCESS",
    onlinecomment: result,
  };
};

export const getOnlineCommentError = (error) => {
  return {
    type: "GET_ONLINE_COMMENT_ERROR",
    error,
  };
};

//UPDATE ONLINE_COMMENT

export const updateOnlineComment = (id, data) => {
  return function (dispatch) {
    dispatch(updateOnlineCommentStart());
    axios
      .put(`onlinecomments/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateOnlineCommentSuccess(result));
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
        dispatch(updateOnlineCommentError(resError));
      });
  };
};

export const updateOnlineCommentStart = () => {
  return {
    type: "UPDATE_ONLINE_COMMENT_START",
  };
};

export const updateOnlineCommentSuccess = (result) => {
  return {
    type: "UPDATE_ONLINE_COMMENT_SUCCESS",
    updateOnlineComment: result,
  };
};

export const updateOnlineCommentError = (error) => {
  return {
    type: "UPDATE_ONLINE_COMMENT_ERROR",
    error,
  };
};

export const getCountOnlineComment = () => {
  return function (dispatch) {
    dispatch(getCountOnlineCommentStart());
    axios
      .get(`onlinecomments/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountOnlineCommentSuccess(result));
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
        dispatch(getCountOnlineCommentError(resError));
      });
  };
};

export const getCountOnlineCommentStart = () => {
  return {
    type: "GET_COUNT_ONLINE_COMMENT_START",
  };
};

export const getCountOnlineCommentSuccess = (result) => {
  return {
    type: "GET_COUNT_ONLINE_COMMENT_SUCCESS",
    orderCount: result,
  };
};

export const getCountOnlineCommentError = (error) => {
  return {
    type: "GET_COUNT_ONLINE_COMMENT_ERROR",
    error,
  };
};
