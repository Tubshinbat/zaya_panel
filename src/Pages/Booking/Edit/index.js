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
import EditImage from "../../../Components/General/EditImage";
import { loadEmployees } from "../../../redux/actions/employeeActions";

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
import * as actions from "../../../redux/actions/courseActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({
    name: false,
    details: false,
    pictures: false,
    price: false,
  });

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setForm((bf) => ({
      ...bf,
      oldPicture: photos,
    }));
  }, [photos]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      props.clear();
      setTimeout(() => props.history.replace("/course"), 2000);
    }
  }, [props.success]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, pictures: props.images }));
    checkFrom("pictures", props.images);
  }, [props.images]);

  useEffect(() => {
    allCheck();
  }, [formData]);

  useEffect(() => {
    if (props.course) {
      setForm(() => ({
        ...props.course,
      }));

      setPhotos(props.course.pictures);
      setForm((bf) => ({ ...bf, pictures: props.course.pictures }));
      checkFrom("pictures", props.course.pictures);
      setErrors((bf) => ({ ...bf, pictures: true }));

      let c = [];
      props.course.teachers &&
        props.course.teachers.map((el) => c.push(el._id));
      setForm((bf) => ({ ...bf, teachers: c }));
      setChecked(c);
    }
  }, [props.course]);

  // -- INIT FUNCTION
  const init = () => {
    props.removePhotos();
    props.removeAllDatas();

    props.getCourse(props.match.params.id);
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
      if (
        index === "pictures" ||
        index === "oldPicture" ||
        index === "teachers"
      ) {
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
      ? props.updateCourse(props.match.params.id, sendData)
      : toastControl(
          "error",
          "Уучлаарай заавал бөглөх талбаруудыг бөглөнө үү!"
        );
  };

  const oldPictureRemove = (key) => {
    let allFile = photos;
    allFile.splice(key, 1);
    setPhotos([...allFile]);
    allFile.length < 1 && checkFrom("pictures", props.images);
  };

  return (
    <Section>
      <MetaTags>
        <title> Онлайн сургалт нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Онлайн сургалт нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Онлайн сургалт нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Онлайн сургалт шинчлэх `} />
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
              <div className="col-md-9">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Сургалтын үнэ </p>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="Сургалтын үнэ"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <span className={`litleError`}>{errors.price}</span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Сургалтын үнэ </p>
                  <select
                    name="priceVal"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.priceVal}
                  >
                    <option value="₮">₮</option>
                    <option value="$">$</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> Сургалтын хураангуй </p>
                  <textarea
                    className="form-control"
                    name="shortDetails"
                    onChange={handleChange}
                    value={formData.shortDetails}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> Сургалтын дэлгэрэнгүй </p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="details"
                    value={formData.details}
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
                    checked={formData.status}
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
                <i className="far fa-image"></i> Онлайн сургалтын зураг
              </h3>
            </div>

            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <Dropzone />
                  </div>
                  <div className={css.Thumb}>
                    {photos &&
                      photos.map((el, key) => (
                        <EditImage
                          file={`${el}`}
                          index={`${key}`}
                          click={oldPictureRemove}
                        />
                      ))}
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
    error: state.courseReducer.error,
    loading: state.courseReducer.loading,
    success: state.courseReducer.success,
    course: state.courseReducer.course,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    getCourse: (id) => dispatch(actions.getCourse(id)),
    updateCourse: (id, data) => dispatch(actions.updateCourse(id, data)),
    clear: () => dispatch(actions.clear()),

    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removeAllDatas: () => dispatch(removeAllDatas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
