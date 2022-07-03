import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import Dropzone from "../../../Components/General/Dropzone";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import {
  requiredCheck,
  minLength,
  maxLength,
  onlyNumber,
} from "../../../lib/inputRegex";

// ACTIONS

import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import { removeAllDatas } from "../../../redux/actions/newsUploadActions";
import * as actions from "../../../redux/actions/courseOrderActions";
import { loadOnlineGroups } from "../../../redux/actions/onlineGroupActions";
import { loadCourses } from "../../../redux/actions/courseActions";
import { loadCourseOrders } from "../../../redux/actions/courseOrderActions";
import { loadOrderTypes } from "../../../redux/actions/orderTypeActions";
import { getUsers } from "../../../redux/actions/userActions";

// STYLE CSS
import css from "./__.module.css";

const Edit = (props) => {
  // USESTATE
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({
    courseIs: "course",
  });
  const [errors, setErrors] = useState({
    orderType: true,
    user: true,
  });

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      props.clear();
      setTimeout(() => props.history.replace("/order-course"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (props.orderOnlineCourse) {
      setForm(() => ({
        ...props.orderOnlineCourse,
        user: props.orderOnlineCourse.user && props.orderOnlineCourse.user._id,
        orderType:
          props.orderOnlineCourse.orderType &&
          props.orderOnlineCourse.orderType._id,
        course:
          props.orderOnlineCourse.course && props.orderOnlineCourse.course._id,
      }));
    }
  }, [props.orderOnlineCourse]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, pictures: props.images }));
    checkFrom("pictures", props.images);
  }, [props.images]);

  // -- INIT FUNCTION
  const init = () => {
    props.removePhotos();
    props.removeAllDatas();
    props.loadCourses(`limit=100`);
    props.loadOnlineGroups(`limit=100`);
    props.loadCourseOrders(`limit=100`);
    props.getUsers(`limit=100`);
    props.getCourseOrder(props.match.params.id);
    props.loadOrderTypes(`limit=100`);
    props.clear();
  };

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 5);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "details" && result === true) {
        result = minLength(val, 20);
      }

      if (name === "price" && result === true) {
        result = onlyNumber(val);
      }

      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      if (index === "pictures") {
        for (let i = 0; i < formData[index].length; i++) {
          sendData.append([index], formData[index][i]);
        }
      } else sendData.append(index, formData[index]);
    });

    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const textAreaChange = (event) => {
    setForm((bf) => ({ ...bf, details: event }));
    checkFrom("details", event);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.updateCourseOrder(props.match.params.id, sendData)
      : toastControl(
          "error",
          "Уучлаарай заавал бөглөх талбаруудыг бөглөнө үү!"
        );
  };

  //RENDER CATEGORIES

  const teacherCheck = (c) => {
    // return the first index or -1
    const clickedTeacher = checked.indexOf(c);
    const all = [...checked];
    clickedTeacher === -1 ? all.push(c) : all.splice(clickedTeacher, 1);

    setChecked(all);
    setForm((beforeForm) => ({
      ...beforeForm,
      teachers: all,
    }));
  };

  return (
    <Section>
      <MetaTags>
        <title> Сургалтын бүртгэл шинчлэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Сургалтын бүртгэл шинчлэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Сургалтын бүртгэл шинчлэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Сургалтын бүртгэл шинчлэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Сургалтын төрөл </p>
                  <select
                    className="form-select"
                    name="courseIs"
                    value={formData.courseIs}
                    onChange={handleChange}
                  >
                    <option value="course"> Тэнхимын сургалт </option>
                    <option value="onlineCourse"> Онлайн сургалт </option>
                  </select>
                </div>
              </div>
              <div
                className="col-md-12"
                style={{
                  display:
                    formData.courseIs == "onlineCourse" ? "block" : "none",
                }}
              >
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Хамрагдах онлайн сургалт</p>
                  <select
                    className="form-select"
                    value={formData.onlineCourse && formData.onlineCourse}
                    name="onlineCourse"
                    onChange={handleChange}
                  >
                    <option value=""> Онлайн сургалтаас сонгох </option>
                    {props.onlineGroups &&
                      props.onlineGroups.map((course) => (
                        <option value={course._id}> {course.name} </option>
                      ))}
                  </select>
                </div>
              </div>
              <div
                className="col-md-12"
                style={{
                  display: formData.courseIs == "course" ? "block" : "none",
                }}
              >
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Хамрагдах тэнхим сургалт</p>
                  <select
                    className="form-select"
                    value={formData.course && formData.course}
                    name="course"
                    onChange={handleChange}
                  >
                    <option value=""> Тэнхимын сургалтаас сонгох </option>
                    {props.courses &&
                      props.courses.map((course) => (
                        <option value={course._id}> {course.name} </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}>Төлөв</p>
                  <select
                    className="form-select"
                    name="orderType"
                    value={formData.orderType && formData.orderType}
                    onChange={handleChange}
                  >
                    <option value=""> Бүртгэлийн төлөв сонгох </option>
                    {props.orderTypes &&
                      props.orderTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                  {errors.orderType && (
                    <span className={`litleError`}>{errors.orderType}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}>Бүртгүүлсэн хэрэглэгч</p>
                  <select
                    className="form-select"
                    name="user"
                    onChange={handleChange}
                    value={formData.user && formData.user}
                  >
                    <option value="">
                      Сургалтанд хамрагдах хэрэглэгч сонгох{" "}
                    </option>
                    {props.users &&
                      props.users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.firstname}
                        </option>
                      ))}
                  </select>
                  {errors.user && (
                    <span className={`litleError`}>{errors.user}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className={`btns`}>
                  <button
                    name="save"
                    onClick={addClick}
                    className={` btn-success btn-sm my-btn add-btn`}
                  >
                    <i className="fas fa-share"></i> Хадгалах
                  </button>

                  <button
                    name="dont"
                    className=" btn-default btn-sm my-btn"
                    onClick={backGo}
                  >
                    Болих
                  </button>
                </div>
              </div>
            </div>
          </CardBoby>
        </div>
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">ТОХИРГОО</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="Active"
                    name="pay"
                    checked={formData.pay}
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="Active">
                    Төлбөрөө төлсөн эсэх
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    images: state.imageReducer.files,
    error: state.courseOrderReducer.error,
    loading: state.courseOrderReducer.loading,
    success: state.courseOrderReducer.success,
    onlineGroups: state.onlineGroupReducer.onlineGroups,
    courseOrders: state.courseOrderReducer.courseOrders,
    orderOnlineCourse: state.courseOrderReducer.courseOrder,
    orderTypes: state.orderTypeReducer.orderTypes,
    users: state.userReducer.users,
    courses: state.courseReducer.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    updateCourseOrder: (id, data) =>
      dispatch(actions.updateCourseOrder(id, data)),
    loadCourses: (query) => dispatch(loadCourses(query)),
    loadOnlineGroups: (query) => dispatch(loadOnlineGroups(query)),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    loadCourseOrders: (query) => dispatch(loadCourseOrders(query)),
    loadOrderTypes: (query) => dispatch(loadOrderTypes(query)),
    getUsers: (query) => dispatch(getUsers(query)),
    getCourseOrder: (id) => dispatch(actions.getCourseOrder(id)),
    removeAllDatas: () => dispatch(removeAllDatas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
