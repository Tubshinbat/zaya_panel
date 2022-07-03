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
import * as actions from "../../../redux/actions/bookingActions";
import { loadOrderTypes } from "../../../redux/actions/orderTypeActions";
import { loadServices } from "../../../redux/actions/serviceActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    bookingType: false,
    service: false,
    date: false,
    time: false,
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
      setTimeout(() => props.history.replace("/booking"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    props.getTimes(
      `status=true&service=${formData.service}&date=${formData.date}`
    );
  }, [formData]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.loadServices(`limit=100`);
    props.loadOrderTypes(`limit=100`);
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
      sendData.append(index, formData[index]);
    });

    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();
    allCheck() === true
      ? props.createBooking(sendData)
      : toastControl(
          "error",
          "Уучлаарай заавал бөглөх талбаруудыг бөглөнө үү!"
        );
  };

  return (
    <Section>
      <MetaTags>
        <title> Цаг авах | WEBR Control Panel</title>
        <meta name="description" content="Цаг авах | WeBR control panel" />
        <meta property="og:title" content="Цаг авах | web control panel" />
      </MetaTags>

      <PageTitle name={`Цаг авах `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-12">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Баталгаажуулсан эсэх </p>
                  <select
                    name="status"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="false"> Баталгаажуулаагүй </option>
                    <option value="true"> Баталгаажуулсан </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Төлөв </p>
                  <select
                    name="bookingType"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value=""> Төлөв сонгох </option>
                    {props.orderTypes &&
                      props.orderTypes.map((type) => (
                        <option value={type._id}> {type.name} </option>
                      ))}
                  </select>
                  {errors.bookingType && (
                    <span className={`litleError`}>{errors.bookingType}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Үйлчилгээ </p>
                  <select
                    name="service"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Үйлчилгээ сонгох</option>
                    {props.services &&
                      props.services.map((service) => (
                        <option value={service._id}> {service.name}</option>
                      ))}
                  </select>
                  {errors.service && (
                    <span className={`litleError`}>{errors.service}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Өдөр сонгох </p>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <span className={`litleError`}>{errors.date}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Цаг сонгох </p>{" "}
                  <select
                    className="form-select"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value=""> Цаг сонгоно уу </option>
                    {props.times &&
                      props.times.map((time) => (
                        <option value={time}> {time} </option>
                      ))}
                  </select>
                  {errors.time && (
                    <span className={`litleError`}>{errors.time}</span>
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
    error: state.bookingReducer.error,
    loading: state.bookingReducer.loading,
    success: state.bookingReducer.success,
    orderTypes: state.orderTypeReducer.orderTypes,
    times: state.bookingReducer.times,
    services: state.serviceReducer.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBooking: (data) => dispatch(actions.createBooking(data)),
    getTimes: (query) => dispatch(actions.getTimes(query)),
    loadOrderTypes: (query) => dispatch(loadOrderTypes(query)),
    loadServices: (query) => dispatch(loadServices(query)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
