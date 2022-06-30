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
import DropVideo from "../../../Components/VideoDrop";
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
import * as actions from "../../../redux/actions/onlineCourseActions";
import { loadOnlineGroups } from "../../../redux/actions/onlineGroupActions";
import { loadEmployees } from "../../../redux/actions/employeeActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    details: false,
    pictures: false,
    group: false,
    video: false,
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
      setTimeout(() => props.history.replace("/online-video"), 2000);
    }
  }, [props.success]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, pictures: props.images }));
    checkFrom("pictures", props.images);
  }, [props.images]);

  useEffect(() => {
    setForm((bf) => ({ ...bf, video: props.video }));
    checkFrom("video", props.video);
  }, [props.video]);

  // -- INIT FUNCTION
  const init = () => {
    props.removePhotos();
    props.removeAllDatas();
    props.loadEmployees();
    props.loadOnlineGroups();
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
      if (index === "pictures" || index === "video") {
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
    console.log(formData);
    allCheck() === true
      ? props.createOnlineCourse(sendData)
      : toastControl(
          "error",
          "Уучлаарай заавал бөглөх талбаруудыг бөглөнө үү!"
        );
  };

  //RENDER CATEGORIES
  const renderTeachers = (teachers) => {
    let myTeachers = [];
    teachers.map((el) => {
      myTeachers.push(
        <li key={el._id}>
          <div>
            <input
              className={`categoryId`}
              value={el._id}
              type="checkbox"
              name="teachers"
              onChange={() => teacherCheck(el._id)}
            />
          </div>
          {el.children.length > 0 ? (
            <ul> {renderTeachers(el.children)} </ul>
          ) : null}
        </li>
      );
    });
    return myTeachers;
  };

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
        <title> Онлайн сургалтын хичээл нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Онлайн сургалтын хичээл нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Онлайн сургалтын хичээл нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Онлайн сургалтын хичээл нэмэх `} />
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
                    placeholder="Онлайн сургалтийн гарчиг оруулна уу"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className={`${css.AddForm} row`}>
                <div className="col-md-12">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Гарчиг </p>
                    <select
                      className="form-select"
                      name="group"
                      onChange={handleChange}
                    >
                      <option value=""> Онлайн сургалт сонгох </option>
                      {props.groups &&
                        props.groups.map((group) => (
                          <option key={group._id} value={group._id}>
                            {group.name}
                          </option>
                        ))}
                    </select>
                    {errors.group && (
                      <span className={`litleError`}>{errors.group}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <p className={`${css.Title}`}> Сургалтын хураангуй </p>
                    <textarea
                      className="form-control"
                      name="shortDetails"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <p className={`${css.Title}`}> Сургалтын дэлгэрэнгүй </p>
                    <Editor
                      apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                      name="details"
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
                    {errors.details && (
                      <span className={`litleError`}>{errors.details}</span>
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
                </div>{" "}
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
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Сургалт орох багш
              </h3>
            </div>

            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  {renderTeachers(props.teachers)}
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-video"></i> Онлайн видео хичээл
              </h3>
            </div>

            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <DropVideo />
                  </div>
                  {errors.video && (
                    <span className={`litleError`}>{errors.video}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Онлайн сургалтын зураг
              </h3>
            </div>

            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <Dropzone />
                  </div>
                  {errors.pictures && (
                    <span className={`litleError`}>{errors.pictures}</span>
                  )}
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
    video: state.imageReducer.video,
    error: state.onlineCourseReducer.error,
    loading: state.onlineCourseReducer.loading,
    success: state.onlineCourseReducer.success,
    groups: state.onlineGroupReducer.onlineGroups,
    teachers: state.employeeReducer.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    createOnlineCourse: (data) => dispatch(actions.createOnlineCourse(data)),
    loadOnlineGroups: (query) => dispatch(loadOnlineGroups(query)),
    loadEmployees: (query) => dispatch(loadEmployees(query)),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removeAllDatas: () => dispatch(removeAllDatas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
