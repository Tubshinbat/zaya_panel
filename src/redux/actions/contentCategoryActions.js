import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CONTENT_CATEGORY",
  };
};

// CREATE CONTENT_CATEGORY

export const createContentCategory = (data) => {
  return function (dispatch) {
    dispatch(createContentCategoryStart());
    axios
      .post("contentcategories", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createContentCategorySuccess(data));
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
        dispatch(createContentCategoryError(resError));
      });
  };
};

const createContentCategoryStart = () => {
  return {
    type: "CREATE_CONTENT_CATEGORY_START",
  };
};

const createContentCategorySuccess = () => {
  return {
    type: "CREATE_CONTENT_CATEGORY_SUCCESS",
  };
};

const createContentCategoryError = (error) => {
  return {
    type: "CREATE_CONTENT_CATEGORY_ERROR",
    error,
  };
};

// LOAD CONTENT_CATEGORIES

export const loadContentCategories = (query = "") => {
  return function (dispatch) {
    dispatch(loadContentCategoriesStart());
    axios
      .get("contentcategories?" + query)
      .then((response) => {
        const loadContentCategories = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadContentCategoriesSuccess(loadContentCategories));
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
        dispatch(loadContentCategoriesError(resError));
      });
  };
};

export const loadContentCategoriesStart = () => {
  return {
    type: "LOAD_CONTENT_CATEGORIES_START",
  };
};

export const loadContentCategoriesSuccess = (
  loadContentCategories,
  pagination
) => {
  return {
    type: "LOAD_CONTENT_CATEGORIES_SUCCESS",
    loadContentCategories,
    pagination,
  };
};

export const loadContentCategoriesError = (error) => {
  return {
    type: "LOAD_CONTENT_CATEGORIES_ERROR",
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

export const deleteMultContentCategory = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("contentcategories/delete", { params: { id: ids } })
      .then((response) => {
        const deleteContentCategory = response.data.data;
        dispatch(deleteContentCategorySuccess(deleteContentCategory));
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
        dispatch(deleteContentCategoryError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CONTENT_CATEGORY_START",
  };
};

export const deleteContentCategorySuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CONTENT_CATEGORY_SUCCESS",
    deleteContentCategory: deleteData,
  };
};

export const deleteContentCategoryError = (error) => {
  return {
    type: "DELETE_MULT_CONTENT_CATEGORY_ERROR",
    error,
  };
};

// GET CONTENT_CATEGORY

export const getInit = () => {
  return {
    type: "GET_CONTENT_CATEGORY_INIT",
  };
};

export const getContentCategory = (id) => {
  return function (dispatch) {
    dispatch(getContentCategoryStart());
    axios
      .get("contentcategories/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getContentCategorySuccess(result));
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
        dispatch(getContentCategoryError(resError));
      });
  };
};

export const getContentCategoryStart = () => {
  return {
    type: "GET_CONTENT_CATEGORY_START",
  };
};

export const getContentCategorySuccess = (result) => {
  return {
    type: "GET_CONTENT_CATEGORY_SUCCESS",
    contentCategory: result,
  };
};

export const getContentCategoryError = (error) => {
  return {
    type: "GET_CONTENT_CATEGORY_ERROR",
    error,
  };
};

//UPDATE CONTENT_CATEGORY

export const updateContentCategory = (id, data) => {
  return function (dispatch) {
    dispatch(updateContentCategoryStart());
    axios
      .put(`contentcategories/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateContentCategorySuccess(result));
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
        dispatch(updateContentCategoryError(resError));
      });
  };
};

export const updateContentCategoryStart = () => {
  return {
    type: "UPDATE_CONTENT_CATEGORY_START",
  };
};

export const updateContentCategorySuccess = (result) => {
  return {
    type: "UPDATE_CONTENT_CATEGORY_SUCCESS",
    updateContentCategory: result,
  };
};

export const updateContentCategoryError = (error) => {
  return {
    type: "UPDATE_CONTENT_CATEGORY_ERROR",
    error,
  };
};

export const getCountContentCategory = () => {
  return function (dispatch) {
    dispatch(getCountContentCategoryStart());
    axios
      .get(`contentcategories/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountContentCategorySuccess(result));
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
        dispatch(getCountContentCategoryError(resError));
      });
  };
};

export const getCountContentCategoryStart = () => {
  return {
    type: "GET_COUNT_CONTENT_CATEGORY_START",
  };
};

export const getCountContentCategorySuccess = (result) => {
  return {
    type: "GET_COUNT_CONTENT_CATEGORY_SUCCESS",
    orderCount: result,
  };
};

export const getCountContentCategoryError = (error) => {
  return {
    type: "GET_COUNT_CONTENT_CATEGORY_ERROR",
    error,
  };
};
