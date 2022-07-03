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
import * as actions from "../../../redux/actions/orderActions";
import { loadProducts } from "../../../redux/actions/productActions";
import { loadOrderTypes } from "../../../redux/actions/orderTypeActions";
import { getUsers } from "../../../redux/actions/userActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({
    courseIs: "course",
  });
  const [errors, setErrors] = useState({
    orderType: false,
    user: false,
    product: false,
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
      setTimeout(() => props.history.replace("/orders"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    allCheck();
  }, [formData]);

  useEffect(() => {
    if (props.order)
      setForm(() => ({
        ...props.order,
        product: props.order.product && props.order.product._id,
        orderType: props.order.orderType && props.order.orderType._id,
        user: props.order.user && props.order.user._id,
      }));
  }, [props.order]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    props.removeAllDatas();
    props.getOrder(props.match.params.id);
    props.loadProducts(`limit=100`);
    props.getUsers(`limit=100`);
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
      ? props.updateOrder(props.match.params.id, sendData)
      : toastControl(
          "error",
          "Уучлаарай заавал бөглөх талбаруудыг бөглөнө үү!"
        );
  };

  //RENDER CATEGORIES

  return (
    <Section>
      <MetaTags>
        <title> Барааны захиалга нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Барааны захиалга нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Барааны захиалга нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Барааны захиалга нэмэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Бүтээгдэхүүн </p>
                  <select
                    className="form-select"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value=""> Бүтээгдэхүүн сонгох </option>
                    {props.products &&
                      props.products.map((product) => (
                        <option value={product._id}> {product.name} </option>
                      ))}
                  </select>
                  {errors.product && (
                    <span className={`litleError`}>{errors.product}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}>Төлөв</p>
                  <select
                    className="form-select"
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                  >
                    <option value=""> захиалгын төлөв сонгох </option>
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
                    value={formData.user}
                  >
                    <option value="">Бараа захиалсан хэрэглэгч сонгох </option>
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
    error: state.orderReducer.error,
    loading: state.orderReducer.loading,
    success: state.orderReducer.success,
    order: state.orderReducer.order,
    products: state.productReducer.products,
    orderTypes: state.orderTypeReducer.orderTypes,
    users: state.userReducer.users,
    courses: state.courseReducer.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    updateOrder: (id, data) => dispatch(actions.updateOrder(id, data)),
    getOrder: (id) => dispatch(actions.getOrder(id)),
    clear: () => dispatch(actions.clear()),
    loadProducts: (query) => dispatch(loadProducts(query)),
    loadOrderTypes: (query) => dispatch(loadOrderTypes(query)),
    getUsers: (query) => dispatch(getUsers(query)),
    removeAllDatas: () => dispatch(removeAllDatas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
