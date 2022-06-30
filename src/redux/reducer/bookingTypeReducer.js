const initialState = {
  loading: false,
  success: null,
  error: null,
  bookingTypes: [],
  paginationLast: {},
  bookingType: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BOOKING_TYPE":
      return {
        ...state,
        error: null,
        success: null,
        bookingType: {},
      };

    case "LOAD_BOOKING_TYPES_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        bookingTypes: [],
      };

    case "LOAD_BOOKING_TYPES_SUCCESS":
      return {
        ...state,
        loading: false,
        bookingTypes: action.loadBookingTypes,
      };

    case "LOAD_BOOKING_TYPES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        bookingTypes: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE BOOKING_TYPE

    case "CREATE_BOOKING_TYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        bookingType: null,
      };
    case "CREATE_BOOKING_TYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай баннер нэмэгдлээ",
        error: null,
      };
    case "CREATE_BOOKING_TYPE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_BOOKING_TYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BOOKING_TYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BOOKING_TYPE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET BOOKING_TYPE

    case "GET_BOOKING_TYPE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        bookingType: {},
      };

    case "GET_BOOKING_TYPE_START":
      return {
        ...state,
        loading: true,
        bookingType: {},
        error: null,
      };

    case "GET_BOOKING_TYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        bookingType: action.bookingType,
        error: null,
      };

    case "GET_BOOKING_TYPE_ERROR":
      return {
        ...state,
        loading: false,
        bookingType: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_BOOKING_TYPE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BOOKING_TYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BOOKING_TYPE_ERROR":
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
    case "GET_COUNT_BOOKING_TYPE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BOOKING_TYPE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_BOOKING_TYPE_ERROR":
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
