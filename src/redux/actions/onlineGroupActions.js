import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_ONLINE_GROUP",
  };
};

// CREATE ONLINE_GROUP

export const createOnlineGroup = (data) => {
  return function (dispatch) {
    dispatch(createOnlineGroupStart());
    axios
      .post("onlinegroups", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createOnlineGroupSuccess(data));
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
        dispatch(createOnlineGroupError(resError));
      });
  };
};

const createOnlineGroupStart = () => {
  return {
    type: "CREATE_ONLINE_GROUP_START",
  };
};

const createOnlineGroupSuccess = () => {
  return {
    type: "CREATE_ONLINE_GROUP_SUCCESS",
  };
};

const createOnlineGroupError = (error) => {
  return {
    type: "CREATE_ONLINE_GROUP_ERROR",
    error,
  };
};

// LOAD ONLINE_GROUPS

export const loadOnlineGroups = (query = "") => {
  return function (dispatch) {
    dispatch(loadOnlineGroupsStart());
    axios
      .get("onlinegroups?" + query)
      .then((response) => {
        const loadOnlineGroups = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadOnlineGroupsSuccess(loadOnlineGroups));
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
        dispatch(loadOnlineGroupsError(resError));
      });
  };
};

export const loadOnlineGroupsStart = () => {
  return {
    type: "LOAD_ONLINE_GROUPS_START",
  };
};

export const loadOnlineGroupsSuccess = (loadOnlineGroups, pagination) => {
  return {
    type: "LOAD_ONLINE_GROUPS_SUCCESS",
    loadOnlineGroups,
    pagination,
  };
};

export const loadOnlineGroupsError = (error) => {
  return {
    type: "LOAD_ONLINE_GROUPS_ERROR",
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

export const deleteMultOnlineGroup = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("onlinegroups/delete", { params: { id: ids } })
      .then((response) => {
        const deleteOnlineGroup = response.data.data;
        dispatch(deleteOnlineGroupSuccess(deleteOnlineGroup));
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
        dispatch(deleteOnlineGroupError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_ONLINE_GROUP_START",
  };
};

export const deleteOnlineGroupSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_ONLINE_GROUP_SUCCESS",
    deleteOnlineGroup: deleteData,
  };
};

export const deleteOnlineGroupError = (error) => {
  return {
    type: "DELETE_MULT_ONLINE_GROUP_ERROR",
    error,
  };
};

// GET ONLINE_GROUP

export const getInit = () => {
  return {
    type: "GET_ONLINE_GROUP_INIT",
  };
};

export const getOnlineGroup = (id) => {
  return function (dispatch) {
    dispatch(getOnlineGroupStart());
    axios
      .get("onlinegroups/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getOnlineGroupSuccess(result));
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
        dispatch(getOnlineGroupError(resError));
      });
  };
};

export const getOnlineGroupStart = () => {
  return {
    type: "GET_ONLINE_GROUP_START",
  };
};

export const getOnlineGroupSuccess = (result) => {
  return {
    type: "GET_ONLINE_GROUP_SUCCESS",
    onlinegroup: result,
  };
};

export const getOnlineGroupError = (error) => {
  return {
    type: "GET_ONLINE_GROUP_ERROR",
    error,
  };
};

//UPDATE ONLINE_GROUP

export const updateOnlineGroup = (id, data) => {
  return function (dispatch) {
    dispatch(updateOnlineGroupStart());
    axios
      .put(`onlinegroups/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateOnlineGroupSuccess(result));
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
        dispatch(updateOnlineGroupError(resError));
      });
  };
};

export const updateOnlineGroupStart = () => {
  return {
    type: "UPDATE_ONLINE_GROUP_START",
  };
};

export const updateOnlineGroupSuccess = (result) => {
  return {
    type: "UPDATE_ONLINE_GROUP_SUCCESS",
    updateOnlineGroup: result,
  };
};

export const updateOnlineGroupError = (error) => {
  return {
    type: "UPDATE_ONLINE_GROUP_ERROR",
    error,
  };
};

export const getCountOnlineGroup = () => {
  return function (dispatch) {
    dispatch(getCountOnlineGroupStart());
    axios
      .get(`onlinegroups/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountOnlineGroupSuccess(result));
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
        dispatch(getCountOnlineGroupError(resError));
      });
  };
};

export const getCountOnlineGroupStart = () => {
  return {
    type: "GET_COUNT_ONLINE_GROUP_START",
  };
};

export const getCountOnlineGroupSuccess = (result) => {
  return {
    type: "GET_COUNT_ONLINE_GROUP_SUCCESS",
    orderCount: result,
  };
};

export const getCountOnlineGroupError = (error) => {
  return {
    type: "GET_COUNT_ONLINE_GROUP_ERROR",
    error,
  };
};
