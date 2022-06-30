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
import Dropzone from "../../../Components/General/Dropzone";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/pageActions";
import { loadMenus } from "../../../redux/actions/menuActions";

import { loadMenus as loadFooterMenu } from "../../../redux/actions/footerMenuActions";
// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE

  const [checked, setChecked] = useState([]);
  const [footerChecked, setFooterChecked] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
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
      setTimeout(() => props.history.replace("/page"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, pictures: props.images }));
  }, [props.images]);

  //CHECK FORM FUNCTION
  const init = () => {
    props.loadMenus();
    props.loadFooterMenu();

    props.removePhotos();
    setForm(() => {});
  };

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
        result === true && (result = maxLength(val, 500));
      }
      if (name === "pageInfo" && result === true) {
        result = minLength(val, 100);
      }

      if (name === "menu" && result !== true) {
        result = "Цэсээс сонгоно уу";
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
      if (
        index === "pictures" ||
        index === "menu" ||
        index === "footerMenu" ||
        index === "position"
      ) {
        for (let i = 0; i < form[index].length; i++) {
          sendData.append([index], form[index][i]);
        }
      } else sendData.append(index, form[index]);
    });

    return sendData;
  };

  // HANDLE CHANGE
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const textAreaChange = (event) => {
    setForm((bf) => ({ ...bf, pageInfo: event }));
    checkFrom("pageInfo", event);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
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
              type="checkbox"
              name="menu"
              onChange={() => categoryCheck(el._id)}
            />
            <span>{el.name}</span>
          </div>
          {el.children.length > 0 ? (
            <ul> {renderCategories(el.children)} </ul>
          ) : null}
        </li>
      );
    });
    return myCategories;
  };

  // RENDER FOOTER MENU
  const renderFooterMenu = (menus) => {
    let footerMenu = [];
    menus.map((el) => {
      footerMenu.push(
        <li key={el._id}>
          <div>
            <input
              className={`categoryId`}
              value={el._id}
              type="checkbox"
              name="menu"
              onChange={() => footerMenuCheck(el._id)}
            />
            <span>{el.name}</span>
          </div>
          {el.children.length > 0 ? (
            <ul> {renderFooterMenu(el.children)} </ul>
          ) : null}
        </li>
      );
    });
    return footerMenu;
  };

  const categoryCheck = (c) => {
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    clickedCategory === -1 ? all.push(c) : all.splice(clickedCategory, 1);

    setChecked(all);
    setForm((beforeForm) => ({
      ...beforeForm,
      menu: all,
    }));
  };

  const footerMenuCheck = (c) => {
    const clickedCategory = footerChecked.indexOf(c);
    const all = [...footerChecked];
    clickedCategory === -1 ? all.push(c) : all.splice(clickedCategory, 1);

    setFooterChecked(all);
    setForm((beforeForm) => ({
      ...beforeForm,
      footerMenu: all,
    }));
  };

  // CLICK
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.savePage(sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  return (
    <Section>
      <PageTitle name="Сайтын хуудас" />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Хуудасны гарчиг оруулна уу"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div
                className="col-md-12"
                style={{
                  display: form.admissionActive === true ? "block" : "none",
                }}
              >
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Элсэлтийн линк холбох </p>
                  <input
                    className="form-control"
                    type="text"
                    name="admissionLink"
                    placeholder="Элсэлтийн линкээ оруулна уу"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Агуулга </p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="pageInfo"
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount image media  code  table  ",
                      ],
                      toolbar:
                        "undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                      file_picker_types: "image",
                      automatic_uploads: false,
                      file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.onchange = async function () {
                          var file = this.files[0];
                          const fData = new FormData();
                          fData.append("file", file);
                          await props.tinymceAddPhoto(fData);
                          const url =
                            `${base.cdnUrl}uploads/photo_img_` + file.name;
                          cb(url);
                        };
                        input.click();
                      },
                    }}
                    onEditorChange={textAreaChange}
                  />
                  {errors.pageInfo && (
                    <span className={`litleError`}>{errors.pageInfo}</span>
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
                    id="newsActive"
                    name="status"
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="newsActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="listActive"
                    name="listActive"
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="listActive">
                    Хамаарагдах цэснүүд жагсаалт хэлбэртэй харгадах
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-list"></i>Сайтын цэс
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={`categoryBox ${css.CategoryListBox}`}>
                <ul style={{ marginTop: "10px" }}>
                  {renderCategories(props.menus)}
                </ul>
              </div>
              {errors.menu && (
                <span className={`litleError`}>{errors.menu}</span>
              )}
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-list"></i>Сайтын хөлний цэс
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={`categoryBox ${css.CategoryListBox}`}>
                <ul style={{ marginTop: "10px" }}>
                  {renderFooterMenu(props.footerMenus)}
                </ul>
              </div>
              {errors.menu && (
                <span className={`litleError`}>{errors.menu}</span>
              )}
            </div>
          </div>

          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Сайтын хуудсанд орох зураг
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <Dropzone />
                  </div>
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
    error: state.pageReducer.error,
    loading: state.pageReducer.loading,
    success: state.pageReducer.success,
    menus: state.menuReducer.menus,
    footerMenus: state.footerMenuReducer.menus,
    images: state.imageReducer.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMenus: () => dispatch(loadMenus()),
    removePhotos: () => dispatch(allRemove()),
    savePage: (data) => dispatch(actions.savePage(data)),
    saveInit: () => dispatch(actions.savePageInit()),
    loadFooterMenu: () => dispatch(loadFooterMenu()),

    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
