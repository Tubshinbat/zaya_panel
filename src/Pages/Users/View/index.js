import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import {
  requiredCheck,
  minLength,
  maxLength,
  regEmail,
} from "../../../lib/inputRegex";

// ACTIONS
import { allRemove } from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/userActions";

// STYLE CSS
import css from "./__.module.css";

const Edit = (props) => {
  //USESTATE
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    phone: false,
  });

  const init = () => {
    props.clear();
    props.removePhotos();
    setForm(() => ({}));
    props.getUser(props.match.params.id);
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(form).map((index) => {
      if (index === "image") {
        if (form[index])
          for (let i = 0; i < form[index].length; i++) {
            sendData.append([index], form[index][i]);
          }
      } else sendData.append(index, form[index]);
    });

    return sendData;
  };

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    console.log(props.error);
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      props.clear();
      setTimeout(() => props.history.replace("/users"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    if (props.avatar) setForm((bf) => ({ ...bf, image: props.avatar }));
  }, [props.avatar]);

  useEffect(() => {
    if (props.user) {
      setForm(() => ({
        ...props.user,
      }));

      if (props.user.username) setErrors((bf) => ({ ...bf, username: true }));
      if (props.user.email) setErrors((bf) => ({ ...bf, email: true }));
      if (props.user.phone) setErrors((bf) => ({ ...bf, phone: true }));

      props.user.image &&
        setForm((bf) => ({ ...bf, oldAvatar: props.user.image }));
    }
  }, [props.user]);

  // HandleChange
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
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
      if (name === "username" && result === true) {
        result = minLength(val, 1);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "email" && result === true) result = regEmail(val);

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
      checkFrom(el, form[el] === undefined ? "" : form[el]);
    });
    return checkTrue();
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.updateUser(props.match.params.id, sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  const deleteImage = () => {
    setForm((bf) => ({ ...bf, oldAvatar: null }));
  };

  return (
    <>
      <Section>
        <MetaTags>
          <title> Хэрэглэгч засварлах | WEBR Control Panel</title>
          <meta
            name="description"
            content="Хэрэглэгч засварлах | WeBR control panel"
          />
          <meta
            property="og:title"
            content="Хэрэглэгч засварлах | web control panel"
          />
        </MetaTags>
        <PageTitle name="Хэрэглэгч засварлах" />
        <div className="row">
          {props.loading === true && <Spinner />}
          <div className="col-md-8">
            <CardBoby>
              <div className={`${css.AddForm} row`}>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Өөрийн нэр </p>
                    {form.lastname}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Овог нэр </p>

                    {form.firstname}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Нэр </p>
                    {form.username}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Имэйл хаяг </p>
                    {form.email}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Утасны дугаар </p>
                    {form.phone}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Хэрэглэгчийн эрх </p>
                    {form.role}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}>Хэрэглэгчийн нас</p>
                    {form.age}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}>Хэрэглэгчийн хүйс</p>
                    {form.gender}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}>Данс</p>
                    {form.wallet}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={css.Btns}>
                    <button
                      name="dont"
                      onClick={backGo}
                      className=" btn-default btn-sm my-btn"
                    >
                      Буцах
                    </button>
                  </div>
                </div>
              </div>
            </CardBoby>
          </div>
          <div className="col-md-4">
            <div className="card card-primary card-outline"></div>

            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="far fa-image"></i> Хэрэглэгчийн нүүр зураг
                </h3>
              </div>
              <div className="card-body box-profile">
                <div className={css.CategoryBox}>
                  <div className="card-body box-profile">
                    <div className="form-group">
                      <p className={css.oldText}> Одоо байгаа зураг: </p>
                      {form.oldAvatar && (
                        <>
                          <img
                            src={`${base.cdnUrl}uploads/${form.oldAvatar}`}
                            className={css.oldImage}
                          />
                          <button
                            className={`btn ${css.deletePhoto}`}
                            onClick={deleteImage}
                          >
                            Одоо байгаа зургийг устгах{" "}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.userReducer.error,
    loading: state.userReducer.loading,
    success: state.userReducer.success,
    avatar: state.imageReducer.banner,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    clear: () => dispatch(actions.clear()),
    getUser: (id) => dispatch(actions.getUser(id)),
    updateUser: (id, data) => dispatch(actions.updateUser(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
