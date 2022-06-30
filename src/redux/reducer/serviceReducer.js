const initialState = {
  loading: false,
  error: null,
  success: null,
  services: [],
  paginationLast: {},
  service: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_SERVICE":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_SERVICES_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        services: [],
      };

    case "LOAD_SERVICES_SUCCESS":
      return {
        ...state,
        loading: false,
        services: action.loadServices,
      };

    case "LOAD_SERVICES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        services: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // SAVE
    case "CREATE_SERVICE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_SERVICE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        service: action.service,
        success: "Амжилттай нэмэгдлээ",
      };

    case "CREATE_SERVICE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
        service: null,
      };

    case "DELETE_MULT_SERVICE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_SERVICE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_SERVICE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        service: {},
      };

    case "GET_SERVICE_START":
      return {
        ...state,
        loading: true,
        service: {},
        error: null,
      };

    case "GET_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        service: action.service,
        error: null,
      };

    case "GET_SERVICE_ERROR":
      return {
        ...state,
        loading: false,
        service: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_SERVICE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_SERVICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_SERVICE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "UPDATE_END":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
      };

    // GET COUNT
    case "GET_COUNT_SERVICE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_SERVICE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.serviceCount,
        error: null,
      };
    case "GET_COUNT_SERVICE_ERROR":
      return {
        ...state,
        countLoading: false,
        totalCount: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
