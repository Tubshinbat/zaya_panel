import react, { useEffect, Component } from "react";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../../pageStyle.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { connect } from "react-redux";

// Import components
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Side from "../../Components/Side";

// Import page
import Dashboard from "../Dashboard";
import News from "../News";
import User from "../Users";
import Contact from "../Contact";
import Banner from "../Banner";
import { default as BannerAdd } from "../Banner/Add";
import { default as BannerEdit } from "../Banner/Edit";
import { default as NewsAdd } from "../News/Add";
import { default as NewsView } from "../News/View";
import { default as NewsEdit } from "../News/Edit";

import NewsCategory from "../NewsCategory";
import Question from "../Question";
import { default as LoginPage } from "../Login";
import Notfound from "../Notfound";
import Logout from "../Logout";

import { default as UserAdd } from "../Users/Add";
import { default as UserEdit } from "../Users/Edit";
import { default as UserView } from "../Users/View";

import Page from "../Page";
import { default as pageAdd } from "../Page/Add";
import { default as pageEdit } from "../Page/Edit";

import Partners from "../Partners";
import { default as partnersAdd } from "../Partners/add";
import { default as partnersEdit } from "../Partners/edit";

import UserProfile from "../UserProfile";
import EditUser from "../UserProfile/edit";
import FooterMenu from "../FooterMenu";
import { default as Forget } from "../Forget";

import OnlineCourse from "../Online";
import OnlineCourseAdd from "../Online/Add";
import OnlineCourseEdit from "../Online/Edit";

import OnlineVideo from "../OnlineCourse";
import OnlineVideoAdd from "../OnlineCourse/Add";
import OnlineVideoEdit from "../OnlineCourse/Edit";

import Course from "../Course";
import CourseAdd from "../Course/Add";
import CourseEdit from "../Course/Edit";

import Service from "../Services";
import ServiceAdd from "../Services/Add";
import ServiceEdit from "../Services/Edit";

import OnlineCourseOrder from "../OrderOnlineCourse";
import OnlineCourseOrderAdd from "../OrderOnlineCourse/Add";
import OnlineCourseOrderEdit from "../OrderOnlineCourse/Edit";

import CourseType from "../CourseType";
import CourseTypeAdd from "../CourseType/Add";
import CourseTypeEdit from "../CourseType/Edit";

import CourseOrder from "../OrderCourse";
import CourseOrderAdd from "../OrderCourse/Add";
import CourseOrderEdit from "../OrderCourse/Edit";

import Booking from "../Booking";
import BookingAdd from "../Booking/Add";
import BookingEdit from "../Booking/Edit";

import CourseComment from "../OnlineComment";
import CourseCommentAdd from "../OnlineComment/Add";
import CourseCommentEdit from "../OnlineComment/Edit";

import Product from "../product";
import ProductAdd from "../product/Add";
import ProductEdit from "../product/Edit";

import Order from "../Order";
import OrderAdd from "../Order/Add";
import OrderEdit from "../Order/Edit";

import Employee from "../Employee";
import EmployeeAdd from "../Employee/Add";
import EmployeeEdit from "../Employee/Edit";

import Menu from "../Menu";
// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";
import WebInfo from "../WebInfo";

function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);

  useEffect(() => {
    if (cookies.autobiztoken) {
      const token = cookies.autobiztoken;
      props.checkToken(token);
    }
  }, []);

  useEffect(() => {
    if (props.tokenError) {
      removeCookie("autobiztoken");
      document.location.href = "/login";
    }
  }, [props.tokenError]);

  return (
    <>
      {cookies.autobiztoken ? (
        <>
          <CookiesProvider>
            <Header />
            <Side />
            <Switch>
              <Route path="/news" component={News} exact />
              <Route path="/news/add" component={NewsAdd} exact />
              <Route path="/news/view/:id" component={NewsView} />
              <Route path="/news/edit/:id" component={NewsEdit} />
              <Route path="/news-category" component={NewsCategory} />

              <Route path="/webinfo" component={WebInfo} />
              <Route path="/users/add" component={UserAdd} />
              <Route path="/users/edit/:id" component={UserEdit} />
              <Route path="/users/view/:id" component={UserView} />
              <Route path="/users" component={User} />

              <Route path="/banners/add" component={BannerAdd} />
              <Route path="/banners/edit/:id" component={BannerEdit} />
              <Route path="/banners" component={Banner} />

              <Route path="/question" component={Question} />

              <Route path="/page/add" component={pageAdd} />
              <Route path="/page/edit/:id" component={pageEdit} />
              <Route path="/page" component={Page} />

              <Route path="/partners/edit/:id" component={partnersEdit} />
              <Route path="/partners/add" component={partnersAdd} />
              <Route path="/partners" component={Partners} />

              <Route path="/online/edit/:id" component={OnlineCourseEdit} />
              <Route path="/online/add" component={OnlineCourseAdd} />
              <Route path="/online" component={OnlineCourse} />

              <Route path="/course/add" component={CourseAdd} />
              <Route path="/course/edit/:id" component={CourseEdit} />
              <Route path="/course" component={Course} />

              <Route path="/booking/add" component={BookingAdd} />
              <Route path="/booking/edit/:id" component={BookingEdit} />
              <Route path="/booking" component={Booking} />

              <Route path="/course-comment/add" component={CourseCommentAdd} />
              <Route
                path="/course-comment/edit/:id"
                component={CourseCommentEdit}
              />
              <Route path="/course-comment" component={CourseComment} />

              <Route path="/order-course/add" component={CourseOrderAdd} />
              <Route
                path="/order-course/edit/:id"
                component={CourseOrderEdit}
              />
              <Route path="/order-course" component={CourseOrder} />

              <Route
                path="/online-video/edit/:id"
                component={OnlineVideoEdit}
              />
              <Route path="/online-video/add" component={OnlineVideoAdd} />
              <Route path="/online-video" component={OnlineVideo} />

              <Route path="/service/edit/:id" component={ServiceEdit} />
              <Route path="/service/add" component={ServiceAdd} />
              <Route path="/service" component={Service} />

              <Route path="/course-type/edit/:id" component={CourseTypeEdit} />
              <Route path="/course-type/add" component={CourseTypeAdd} />
              <Route path="/course-type" component={CourseType} />

              <Route path="/product/edit/:id" component={ProductEdit} />
              <Route path="/product/add" component={ProductAdd} />
              <Route path="/product" component={Product} />

              <Route path="/orders/edit/:id" component={OrderEdit} />
              <Route path="/orders/add" component={OrderAdd} />
              <Route path="/orders" component={Order} />

              <Route path="/works/edit/:id" component={EmployeeEdit} />
              <Route path="/works/add" component={EmployeeAdd} />
              <Route path="/works" component={Employee} />

              <Route
                path="/online-course/edit/:id"
                component={OnlineCourseOrderEdit}
              />
              <Route
                path="/online-course/add"
                component={OnlineCourseOrderAdd}
              />
              <Route path="/online-course" component={OnlineCourseOrder} />

              <Route path="/menu" component={Menu} />
              <Route path="/contact" component={Contact} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/settings" component={EditUser} />

              <Route path="/" exact component={Dashboard} />
              <Route path="/logout" component={Logout} />
              <Route path="/footer-menu" component={FooterMenu} />
              <Redirect to="/" />
              <Route path="*" component={Notfound} />
            </Switch>
            <Footer />
          </CookiesProvider>
        </>
      ) : (
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route parh="/forget-password" exact component={Forget} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenError: state.tokenReducer.error,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
