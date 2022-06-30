import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./Pages/App/";
import reportWebVitals from "./reportWebVitals";

// Reducers
import bannerReducer from "./redux/reducer/bannerReducer";
import bookingReducer from "./redux/reducer/bookingReducer";
import bookingTypeReducer from "./redux/reducer/bookingTypeReducer";
import contactReducer from "./redux/reducer/contactReducer";
import contentReducer from "./redux/reducer/contentReducer";
import courseOrderReducer from "./redux/reducer/courseOrderReducer";
import courseReducer from "./redux/reducer/courseReducer";
import employeeReducer from "./redux/reducer/employeeReducer";
import faqReducer from "./redux/reducer/faqReducer";
import footerMenuReducer from "./redux/reducer/FooterMenuReducer";
import imageReducer from "./redux/reducer/imageReducer";
import loginReducer from "./redux/reducer/loginReducer";
import menuReducer from "./redux/reducer/menuReducer";
import newsCategoryReducer from "./redux/reducer/newsCategoryReducer";
import newsReducer from "./redux/reducer/newsReducer";
import newsUploadReducer from "./redux/reducer/newsUploadReducer";
import onlineCommentReducer from "./redux/reducer/onlineCommentReducer";
import onlineCourseReducer from "./redux/reducer/onlineCourseReducer";
import onlineGroupReducer from "./redux/reducer/onlineGroupReducer";
import orderReducer from "./redux/reducer/orderReducer";
import orderTypeReducer from "./redux/reducer/orderTypeReducer";
import pageReducer from "./redux/reducer/pageReducer";
import partnerReducer from "./redux/reducer/parentReducer";
import productReducer from "./redux/reducer/productReducer";
import serviceReducer from "./redux/reducer/serviceReducer";
import socialLinkReducer from "./redux/reducer/socialLinkReducer";
import tokenReducer from "./redux/reducer/tokenReducer";
import webinfoReducer from "./redux/reducer/webinfoReducer";
import userReducer from "./redux/reducer/userReducer";

import "./index.css";

const loggerMiddlaware = (store) => {
  return (next) => {
    return (action) => {
      // console.log("MyLoggerMiddleware: Dispatching ==> ", action);
      // console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
      const result = next(action);
      // console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  bannerReducer,
  bookingReducer,
  bookingTypeReducer,
  contactReducer,
  contentReducer,
  courseReducer,
  courseOrderReducer,
  employeeReducer,
  faqReducer,
  footerMenuReducer,
  imageReducer,
  loginReducer,
  menuReducer,
  newsCategoryReducer,
  newsReducer,
  newsUploadReducer,
  onlineCommentReducer,
  onlineCourseReducer,
  onlineGroupReducer,
  orderReducer,
  orderTypeReducer,
  pageReducer,
  partnerReducer,
  productReducer,
  serviceReducer,
  tokenReducer,
  userReducer,
  socialLinkReducer,
  webinfoReducer,
});

const middlewares = [loggerMiddlaware, thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
