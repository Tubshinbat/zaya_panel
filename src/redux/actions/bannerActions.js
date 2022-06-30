import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_BANNER",
  };
};

// CREATE BANNER

export const createBanner = (data) => {
  return function (dispatch) {
    dispatch(createBannerStart());
    axios
      .post("banners", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createBannerSuccess(data));
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
        dispatch(createBannerError(resError));
      });
  };
};

const createBannerStart = () => {
  return {
    type: "CREATE_BANNER_START",
  };
};

const createBannerSuccess = () => {
  return {
    type: "CREATE_BANNER_SUCCESS",
  };
};

const createBannerError = (error) => {
  return {
    type: "CREATE_BANNER_ERROR",
    error,
  };
};

// LOAD BANNERS

export const loadBanners = (query = "") => {
  return function (dispatch) {
    dispatch(loadBannersStart());
    axios
      .get("banners?" + query)
      .then((response) => {
        const loadBanners = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBannersSuccess(loadBanners));
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

        dispatch(loadBannersError(resError));
      });
  };
};

export const loadBannersStart = () => {
  return {
    type: "LOAD_BANNERS_START",
  };
};

export const loadBannersSuccess = (loadBanners, pagination) => {
  return {
    type: "LOAD_BANNERS_SUCCESS",
    loadBanners,
    pagination,
  };
};

export const loadBannersError = (error) => {
  return {
    type: "LOAD_BANNERS_ERROR",
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

export const deleteMultBanner = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("banners/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBanner = response.data.data;
        dispatch(deleteBannerSuccess(deleteBanner));
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
        dispatch(deleteBannerError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BANNER_START",
  };
};

export const deleteBannerSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BANNER_SUCCESS",
    deleteBanner: deleteData,
  };
};

export const deleteBannerError = (error) => {
  return {
    type: "DELETE_MULT_BANNER_ERROR",
    error,
  };
};

// GET BANNER

export const getInit = () => {
  return {
    type: "GET_BANNER_INIT",
  };
};

export const getBanner = (id) => {
  return function (dispatch) {
    dispatch(getBannerStart());
    axios
      .get("banners/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getBannerSuccess(result));
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
        dispatch(getBannerError(resError));
      });
  };
};

export const getBannerStart = () => {
  return {
    type: "GET_BANNER_START",
  };
};

export const getBannerSuccess = (result) => {
  return {
    type: "GET_BANNER_SUCCESS",
    banner: result,
  };
};

export const getBannerError = (error) => {
  return {
    type: "GET_BANNER_ERROR",
    error,
  };
};

//UPDATE BANNER

export const updateBanner = (id, data) => {
  return function (dispatch) {
    dispatch(updateBannerStart());
    axios
      .put(`banners/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBannerSuccess(result));
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
        dispatch(updateBannerError(resError));
      });
  };
};

export const updateBannerStart = () => {
  return {
    type: "UPDATE_BANNER_START",
  };
};

export const updateBannerSuccess = (result) => {
  return {
    type: "UPDATE_BANNER_SUCCESS",
    updateBanner: result,
  };
};

export const updateBannerError = (error) => {
  return {
    type: "UPDATE_BANNER_ERROR",
    error,
  };
};

export const getCountBanner = () => {
  return function (dispatch) {
    dispatch(getCountBannerStart());
    axios
      .get(`banners/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBannerSuccess(result));
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
        dispatch(getCountBannerError(resError));
      });
  };
};

export const getCountBannerStart = () => {
  return {
    type: "GET_COUNT_BANNER_START",
  };
};

export const getCountBannerSuccess = (result) => {
  return {
    type: "GET_COUNT_BANNER_SUCCESS",
    orderCount: result,
  };
};

export const getCountBannerError = (error) => {
  return {
    type: "GET_COUNT_BANNER_ERROR",
    error,
  };
};
