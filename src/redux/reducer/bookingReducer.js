const initialState = {
  loading: false,
  success: null,
  error: null,
  bookings: [],
  paginationLast: {},
  booking: {},
  times: [],
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BOOKING":
      return {
        ...state,
        error: null,
        success: null,
        booking: {},
      };

    case "LOAD_BOOKINGS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        bookings: [],
      };

    case "LOAD_BOOKINGS_SUCCESS":
      return {
        ...state,
        loading: false,
        bookings: action.loadBookings,
      };

    case "LOAD_BOOKINGS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        bookings: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // LOAD TIMES

    case "LOAD_TIMES_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        times: [],
      };

    case "LOAD_TIMES_SUCCESS":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        times: action.times,
      };

    case "LOAD_TIMES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        times: [],
      };

    // CREATE BOOKING

    case "CREATE_BOOKING_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        booking: null,
      };
    case "CREATE_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай баннер нэмэгдлээ",
        error: null,
      };
    case "CREATE_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_BOOKING_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET BOOKING

    case "GET_BOOKING_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        booking: {},
      };

    case "GET_BOOKING_START":
      return {
        ...state,
        loading: true,
        booking: {},
        error: null,
      };

    case "GET_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        booking: action.booking,
        error: null,
      };

    case "GET_BOOKING_ERROR":
      return {
        ...state,
        loading: false,
        booking: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_BOOKING_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BOOKING_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BOOKING_ERROR":
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
    case "GET_COUNT_BOOKING_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BOOKING_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_BOOKING_ERROR":
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
