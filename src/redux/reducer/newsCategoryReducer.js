const initialState = {
  newsCategories: [],
  loading: false,
  error: null,
  successMsg: "",
  category: {},
  type: null,
  selectData: {
    singleLoad: false,
    category: {
      _id: "",
    },
  },
};

const reducer = (state = initialState, action) => {
  let spritInit = {
    ...state,
  };

  switch (action.type) {
    case "LOAD_NEWS_CATEGORIES_START":
      return {
        ...state,
        loading: true,
      };

    case "LOAD_NEWS_CATEGORIES_SUCCESS":
      return {
        ...state,
        newsCategories: action.categories,
        loading: false,
      };

    case "LOAD_NEWS_CATEGORIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    // Single category
    case "LOAD_NEWS_CATEGORY_START":
      return {
        ...state,
        selectData: {
          category: {
            _id: "",
          },
          error: null,
          singleLoad: true,
        },
      };
    case "LOAD_NEWS_CATEGORY_SUCCESS":
      return {
        ...state,
        selectData: {
          ...state.selectData,
          category: action.newsCategory,
          singleLoad: false,
        },
      };
    case "LOAD_NEWS_CATEGORY_ERROR":
      return {
        ...state,
        selectData: {
          ...state.selectData,
          singleLoad: false,
          error: action.error,
          show: false,
        },
      };

    // save travel category
    case "CREATE_NEWS_CATEGORY_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_NEWS_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинэ ангилал нэмэгдлээ",
        error: null,
      };
    case "CREATE_NEWS_CATEGORY_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "DELETE_NEWS_CATEGORY_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_NEWS_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай ангилалыг устгаллаа",
        error: null,
      };
    case "DELETE_NEWS_CATEGORY_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
        success: null,
      };

    // Update
    case "UPDATE_NEWS_CATEGORY_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "UPDATE_NEWS_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай ангилалын нэр солигдлоо",
        error: null,
      };
    case "UPDATE_NEWS_CATEGORY_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    default:
      return state;
  }
};

export default reducer;
