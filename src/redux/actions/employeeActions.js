import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_EMPLOYEE",
  };
};

// CREATE EMPLOYEE

export const createEmployee = (data) => {
  return function (dispatch) {
    dispatch(createEmployeeStart());
    axios
      .post("employees", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createEmployeeSuccess(data));
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
        dispatch(createEmployeeError(resError));
      });
  };
};

const createEmployeeStart = () => {
  return {
    type: "CREATE_EMPLOYEE_START",
  };
};

const createEmployeeSuccess = () => {
  return {
    type: "CREATE_EMPLOYEE_SUCCESS",
  };
};

const createEmployeeError = (error) => {
  return {
    type: "CREATE_EMPLOYEE_ERROR",
    error,
  };
};

// LOAD EMPLOYEES

export const loadEmployees = (query = "") => {
  return function (dispatch) {
    dispatch(loadEmployeesStart());
    axios
      .get("employees?" + query)
      .then((response) => {
        const loadEmployees = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadEmployeesSuccess(loadEmployees));
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
        dispatch(loadEmployeesError(resError));
      });
  };
};

export const loadEmployeesStart = () => {
  return {
    type: "LOAD_EMPLOYEES_START",
  };
};

export const loadEmployeesSuccess = (employee, pagination) => {
  return {
    type: "LOAD_EMPLOYEES_SUCCESS",
    loadEmployees: employee,
    pagination,
  };
};

export const loadEmployeesError = (error) => {
  return {
    type: "LOAD_EMPLOYEES_ERROR",
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

export const deleteMultEmployee = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("employees/delete", { params: { id: ids } })
      .then((response) => {
        const deleteEmployee = response.data.data;
        dispatch(deleteEmployeeSuccess(deleteEmployee));
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
        dispatch(deleteEmployeeError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_EMPLOYEE_START",
  };
};

export const deleteEmployeeSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_EMPLOYEE_SUCCESS",
    deleteEmployee: deleteData,
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: "DELETE_MULT_EMPLOYEE_ERROR",
    error,
  };
};

// GET EMPLOYEE

export const getInit = () => {
  return {
    type: "GET_EMPLOYEE_INIT",
  };
};

export const getEmployee = (id) => {
  return function (dispatch) {
    dispatch(getEmployeeStart());
    axios
      .get("employees/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getEmployeeSuccess(result));
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
        dispatch(getEmployeeError(resError));
      });
  };
};

export const getEmployeeStart = () => {
  return {
    type: "GET_EMPLOYEE_START",
  };
};

export const getEmployeeSuccess = (result) => {
  return {
    type: "GET_EMPLOYEE_SUCCESS",
    employee: result,
  };
};

export const getEmployeeError = (error) => {
  return {
    type: "GET_EMPLOYEE_ERROR",
    error,
  };
};

//UPDATE EMPLOYEE

export const updateEmployee = (id, data) => {
  return function (dispatch) {
    dispatch(updateEmployeeStart());
    axios
      .put(`employees/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateEmployeeSuccess(result));
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
        dispatch(updateEmployeeError(resError));
      });
  };
};

export const updateEmployeeStart = () => {
  return {
    type: "UPDATE_EMPLOYEE_START",
  };
};

export const updateEmployeeSuccess = (result) => {
  return {
    type: "UPDATE_EMPLOYEE_SUCCESS",
    updateEmployee: result,
  };
};

export const updateEmployeeError = (error) => {
  return {
    type: "UPDATE_EMPLOYEE_ERROR",
    error,
  };
};

export const getCountEmployee = () => {
  return function (dispatch) {
    dispatch(getCountEmployeeStart());
    axios
      .get(`employees/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountEmployeeSuccess(result));
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
        dispatch(getCountEmployeeError(resError));
      });
  };
};

export const getCountEmployeeStart = () => {
  return {
    type: "GET_COUNT_EMPLOYEE_START",
  };
};

export const getCountEmployeeSuccess = (result) => {
  return {
    type: "GET_COUNT_EMPLOYEE_SUCCESS",
    orderCount: result,
  };
};

export const getCountEmployeeError = (error) => {
  return {
    type: "GET_COUNT_EMPLOYEE_ERROR",
    error,
  };
};
