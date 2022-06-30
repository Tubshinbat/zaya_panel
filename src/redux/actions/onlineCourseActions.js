import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_ONLINE_COURSE",
  };
};

// CREATE ONLINE_COURSE

export const createOnlineCourse = (data) => {
  return function (dispatch) {
    dispatch(createOnlineCourseStart());
    axios
      .post("onlinecourses", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createOnlineCourseSuccess(data));
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
        dispatch(createOnlineCourseError(resError));
      });
  };
};

const createOnlineCourseStart = () => {
  return {
    type: "CREATE_ONLINE_COURSE_START",
  };
};

const createOnlineCourseSuccess = () => {
  return {
    type: "CREATE_ONLINE_COURSE_SUCCESS",
  };
};

const createOnlineCourseError = (error) => {
  return {
    type: "CREATE_ONLINE_COURSE_ERROR",
    error,
  };
};

// LOAD ONLINE_COURSES

export const loadOnlineCourses = (query = "") => {
  return function (dispatch) {
    dispatch(loadOnlineCoursesStart());
    axios
      .get("onlinecourses?" + query)
      .then((response) => {
        const loadOnlineCourses = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadOnlineCoursesSuccess(loadOnlineCourses));
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
        dispatch(loadOnlineCoursesError(resError));
      });
  };
};

export const loadOnlineCoursesStart = () => {
  return {
    type: "LOAD_ONLINE_COURSES_START",
  };
};

export const loadOnlineCoursesSuccess = (loadOnlineCourses, pagination) => {
  return {
    type: "LOAD_ONLINE_COURSES_SUCCESS",
    loadOnlineCourses,
    pagination,
  };
};

export const loadOnlineCoursesError = (error) => {
  return {
    type: "LOAD_ONLINE_COURSES_ERROR",
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

export const deleteMultOnlineCourse = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("onlinecourses/delete", { params: { id: ids } })
      .then((response) => {
        const deleteOnlineCourse = response.data.data;
        dispatch(deleteOnlineCourseSuccess(deleteOnlineCourse));
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
        dispatch(deleteOnlineCourseError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_ONLINE_COURSE_START",
  };
};

export const deleteOnlineCourseSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_ONLINE_COURSE_SUCCESS",
    deleteOnlineCourse: deleteData,
  };
};

export const deleteOnlineCourseError = (error) => {
  return {
    type: "DELETE_MULT_ONLINE_COURSE_ERROR",
    error,
  };
};

// GET ONLINE_COURSE

export const getInit = () => {
  return {
    type: "GET_ONLINE_COURSE_INIT",
  };
};

export const getOnlineCourse = (id) => {
  return function (dispatch) {
    dispatch(getOnlineCourseStart());
    axios
      .get("onlinecourses/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getOnlineCourseSuccess(result));
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
        dispatch(getOnlineCourseError(resError));
      });
  };
};

export const getOnlineCourseStart = () => {
  return {
    type: "GET_ONLINE_COURSE_START",
  };
};

export const getOnlineCourseSuccess = (result) => {
  return {
    type: "GET_ONLINE_COURSE_SUCCESS",
    onlinecourse: result,
  };
};

export const getOnlineCourseError = (error) => {
  return {
    type: "GET_ONLINE_COURSE_ERROR",
    error,
  };
};

//UPDATE ONLINE_COURSE

export const updateOnlineCourse = (id, data) => {
  return function (dispatch) {
    dispatch(updateOnlineCourseStart());
    axios
      .put(`onlinecourses/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateOnlineCourseSuccess(result));
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
        dispatch(updateOnlineCourseError(resError));
      });
  };
};

export const updateOnlineCourseStart = () => {
  return {
    type: "UPDATE_ONLINE_COURSE_START",
  };
};

export const updateOnlineCourseSuccess = (result) => {
  return {
    type: "UPDATE_ONLINE_COURSE_SUCCESS",
    updateOnlineCourse: result,
  };
};

export const updateOnlineCourseError = (error) => {
  return {
    type: "UPDATE_ONLINE_COURSE_ERROR",
    error,
  };
};

export const getCountOnlineCourse = () => {
  return function (dispatch) {
    dispatch(getCountOnlineCourseStart());
    axios
      .get(`onlinecourses/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountOnlineCourseSuccess(result));
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
        dispatch(getCountOnlineCourseError(resError));
      });
  };
};

export const getCountOnlineCourseStart = () => {
  return {
    type: "GET_COUNT_ONLINE_COURSE_START",
  };
};

export const getCountOnlineCourseSuccess = (result) => {
  return {
    type: "GET_COUNT_ONLINE_COURSE_SUCCESS",
    orderCount: result,
  };
};

export const getCountOnlineCourseError = (error) => {
  return {
    type: "GET_COUNT_ONLINE_COURSE_ERROR",
    error,
  };
};
