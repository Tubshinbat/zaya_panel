import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/bannerActions";
import { loadMenus } from "../../../redux/actions/menuActions";

// STYLE CSS
import css from "./__.module.css";
import { useCookies } from "react-cookie";

const Add = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [showLink, setShowLink] = useState({
    link: false,
    menu: false,
    model: false,
  });

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    banner: true,
  });

  const [bannerImg, setBannerImg] = useState("");
  const [bannerVideo, setBannerVideo] = useState("");

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
      init();
      setTimeout(() => props.history.replace("/banners"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, banner: props.banner }));
    checkFrom("banner", props.banner);
  }, [props.banner]);

  useEffect(() => {
    if (props.bannerData) {
      setForm((bf) => ({
        ...props.bannerData,
      }));

      setBannerImg(props.bannerData.picture);
      setErrors((be) => ({ ...be, banner: true }));
    }
  }, [props.bannerData]);

  //CHECK FORM FUNCTION
  const init = () => {
    props.loadMenus();
    props.clear();
    props.removePhotos();
    setForm(() => ({}));
    props.getBanner(props.match.params.id);
  };

  const categoryCheck = (c) => {
    checkFrom("menu", c);
    setForm((bf) => ({ ...bf, menu: c }));
  };

  const linkChange = (e) => {
    setForm((bf) => ({ ...bf, link: e.target.value }));
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 5);
        result === true && (result = maxLength(val, 500));
      }
      if (name === "banner") {
        if (bannerImg) result = true;
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
      checkFrom(el, form[el] === undefined ? "" : form[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(form).map((index) => {
      if (index === "banner" || index === "video") {
        if (form[index])
          for (let i = 0; i < form[index].length; i++) {
            sendData.append([index], form[index][i]);
          }
      } else sendData.append(index, form[index]);
    });

    sendData.append("oldBanner", bannerImg);
    sendData.append("oldVideo", bannerVideo);

    return sendData;
  };

  // HANDLE CHANGE

  const handleMenu = (event) => {
    setShowLink((bf) => ({ [event.target.value]: true }));
    setForm((bf) => ({ ...bf, model: "", menu: "", link: "" }));
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const checkName = (el, name) => {
    return name === el;
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  const is_check_menu = (id) => {
    let result = false;
    if (form.menu) if (form.menu === id) return (result = true);
    return result;
  };

  const is_check_model = (value) => {
    let result = false;
    if (form.model) if (form.model === value) return (result = true);
    return result;
  };

  //RENDER CATEGORIES
  const renderCategories = (categories) => {
    let myCategories = [];
    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          <div>
            <input
              className={`categoryId`}
              value={el._id}
              type="radio"
              name="menu"
              checked={is_check_menu(el._id)}
              onChange={() => categoryCheck(el._id)}
            />
            {el.name}
          </div>
          {el.children.length > 0 ? (
            <ul> {renderCategories(el.children)} </ul>
          ) : null}
        </li>
      );
    });
    return myCategories;
  };

  // CLICK
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    if (allCheck() === true) {
      const sendData = convertFromdata();
      props.updateBanner(props.match.params.id, sendData);
    } else {
      toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
    }
  };

  const deleteOldBanner = (type) => {
    setForm((bf) => {
      delete bf[type];
      return { ...bf };
    });
    type === "video" && setBannerVideo(() => "");
    type === "banner" && setBannerImg(() => "");
  };

  return (
    <Section>
      <PageTitle name="Баннер" />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <div className={`${css.AddForm} row`}>
            <div className="col-md-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="far fa-image"></i> Баннер зураг
                  </h3>
                </div>
                <div className="card-body box-profile">
                  <div className={css.CategoryBox}>
                    <div className="card-body box-profile">
                      <div className="form-group">
                        <DropImage />
                      </div>
                      <p> Одоо байгаа баннер </p>
                      <div className={css.Thumb}>
                        {bannerImg && (
                          <>
                            <img
                              src={`${base.cdnUrl}uploads/450/${bannerImg}`}
                              className={`${css.OldImage} `}
                            />
                            <button
                              className={`btn mybutton ${css.DeleteImgBtn}`}
                              onClick={() => deleteOldBanner("banner")}
                            >
                              Одоо байгааг нь устгах
                            </button>
                          </>
                        )}
                      </div>
                      {errors.banner && (
                        <span className={`litleError`}>{errors.banner}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardBoby>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Хуудасны гарчиг оруулна уу"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Агуулга </p>
                  <textarea
                    className="form-control"
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                  ></textarea>
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
            </CardBoby>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">ТОХИРГОО</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group">
                <div className="custom-control custom-switch  ">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="newsActive"
                    name="status"
                    checked={form.status}
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="newsActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-list"></i>Холбогдох холбоосын тохиргоо
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={`form-group `}>
                <p className={`${css.Title}`}> Холбох линк </p>
                <input
                  className="form-control"
                  type="text"
                  name="link"
                  placeholder="Холбох холбоос линкийг оруулна уу"
                  value={form.link}
                  onChange={linkChange}
                />
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
    error: state.bannerReducer.error,
    loading: state.bannerReducer.loading,
    success: state.bannerReducer.success,
    bannerData: state.bannerReducer.banner,
    menus: state.menuReducer.menus,
    banner: state.imageReducer.banner,
    video: state.imageReducer.video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMenus: () => dispatch(loadMenus()),
    removePhotos: () => dispatch(allRemove()),
    clear: () => dispatch(actions.clear()),
    getBanner: (id) => dispatch(actions.getBanner(id)),
    updateBanner: (id, data) => dispatch(actions.updateBanner(id, data)),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
