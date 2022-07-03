import React, { useEffect, Text, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS
import * as actions from "../../redux/actions/bookingActions";
import { loadOrderTypes } from "../../redux/actions/orderTypeActions";
import { loadServices } from "../../redux/actions/serviceActions";

//STYLES
import css from "./__.module.css";

// -- HTML
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Dropdown from "../../Components/General/Dropdown";
import CardBoby from "../../Components/General/CardBody";
import Spinner from "../../Components/General/Spinner";
import Spinner2 from "../../Components/General/Spinner2";
import Model from "../../Components/General/Model";

//-- filter Image
import notfound from "../../notfound.svg";

const News = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [status, setStatus] = useState(null);
  const [sort, setSort] = useState("");
  const [select, setSelect] = useState(
    "status bookingNumber bookingType service date time createAt createUser"
  );
  const [search, setSearch] = useState({});

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [dropShow, setDropShow] = useState({
    category: false,
    status: false,
  });

  const [selectCat, setSelectCat] = useState();
  const [selectStatus, setSelectStatus] = useState();

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
    }
  }, [props.success]);

  useEffect(() => {
    if (props.pageLast) {
      setTotal(props.pageLast.total);
      setLimit(props.pageLast.limit);
    }
  }, [props.pageLast]);

  useEffect(() => {
    props.loadBookings(
      `select=${select}&sort=${sort}&status=${search.status}&bookingNumber=${search.bookingNumber}&bookingType=${search.bookingType}&service=${search.service}&date=${search.date}&time=${search.time}&page=${activePage}`
    );
  }, [activePage, search]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    props.clear();
    setStatus(() => null);
    setChkBox(() => []);
    props.loadBookings(`select=${select}`);
    props.getTimes();
    props.loadServices(`limit=100`);
    props.loadOrderTypes(`limit=100`);
  };

  const addClick = () => {
    props.history.push("/booking/add");
  };

  const handleShow = (data) => {
    setDropShow((beforeDrop) => ({
      ...beforeDrop,
      [data]: dropShow[data] ? false : true,
    }));
  };

  const handleShowModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
  };

  const handleClose = () => {
    setDeleteModel(false);
  };

  // FILTER HANDLE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((bs) => ({ ...bs, [name]: value }));
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });

    props.deleteMultBooking(ids);
    setDeleteModel(false);
  };

  const handleChk = (e) => {
    let ch = chkBox;
    let checks = [];
    if (e.target.checked === false) {
      ch.map((el, index) => {
        if (el.id === e.target.value) {
          ch.splice(index, 1);
        }
      });
    } else {
      checks[e.target.value] = { check: e.target.checked, id: e.target.value };
      ch.push(checks[e.target.value]);
    }
    setChkBox((b) => [...b]);
  };

  // RENDERS

  return (
    <Section>
      <MetaTags>
        <title> Цаг авах хүсэлтүүд | WEBR Control Panel</title>
        <meta
          name="description"
          content="Цаг авах хүсэлтүүд | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Цаг авах хүсэлтүүд | web control panel"
        />
      </MetaTags>
      <PageTitle name={`Цаг авах хүсэлтүүд`} />

      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> Цаг авах хүсэлт нэмэх
              </button>
              <button
                name="refresh"
                onClick={() => init()}
                className="myButton refreshBtn"
              >
                <i className="fas fa-redo-alt"></i> Сэргээх
              </button>
              {chkBox.length > 0 && (
                <button
                  name="news"
                  onClick={handleShowModel}
                  className="myButton refreshBtn deleteBtn"
                >
                  <i className="fas fa-trash-alt"></i> Устгах
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {props.loading ? <Spinner /> : null}
          <CardBoby>
            <div className={`card-body`}>
              <div className="card-header">
                <h3 className="card-title" style={{ fontSize: 14 }}>
                  Сонгогдсон : {chkBox.length}
                </h3>
                <div className={`card-tools ${css.Pagination}`}>
                  {!total ? (
                    <Spinner2 />
                  ) : (
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  )}
                </div>
              </div>

              <table className={`myTable table`}>
                <thead>
                  <tr>
                    <th></th>
                    <th className="statusTh"> Баталгаажуулсан эсэх </th>
                    <th> Захиалгын дугаар</th>
                    <th> Сонгосон үйлчилгээ </th>
                    <th> Төлөв </th>
                    <th> Огноо </th>
                    <th> Цаг </th>
                    <th> Үйлдэл </th>
                  </tr>
                </thead>
                <tr>
                  <td></td>
                  <td>
                    <select
                      name="status"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Баталгаажуулсан эсэх сонгох</option>
                      <option value="true"> Баталгаажуулсан </option>
                      <option value="false"> Баталгаажуулаагүй </option>
                    </select>
                  </td>
                  <td>
                    <input
                      onChange={handleChange}
                      name="bookingNumber"
                      placeholder="Захиалгын дугаараар хайх"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <select
                      name="service"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Үйлчилгээ сонгох</option>
                      {props.services &&
                        props.services.map((service) => (
                          <option value={service._id}> {service.name} </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="bookingType"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value=""> Төлөв сонгох </option>
                      {props.orderTypes &&
                        props.orderTypes.map((type) => (
                          <option value={type._id}> {type.name} </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="time"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value=""> Цаг сонгох </option>
                      {props.times &&
                        props.times.map((time) => (
                          <option value={time}> {time} </option>
                        ))}
                    </select>
                  </td>
                  <td></td>
                </tr>
                {props.bookings &&
                  props.bookings.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td className="statusTd">
                        {el.status == true ? (
                          <div className="activeOn"></div>
                        ) : (
                          <div className="activeOff"></div>
                        )}
                      </td>
                      <td> {el.bookingNumber} </td>
                      <td>{el.service && el.service.name}</td>
                      <td>{el.bookingType && el.bookingType.name}</td>
                      <td>{el.date}</td>
                      <td>{el.time}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/booking/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.bookings &&
                props.bookings.length < 1 && (
                  <div className={css.Notfound}>
                    <p> "Илэрц олдсонгүй" </p>
                    <img src={notfound} />
                  </div>
                )}
              <div className={css.DashboardFooter}>
                <p>
                  Нийт дата: <strong> {total} </strong>
                </p>
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
      <Model
        modelName="Сошиал хаяг устгах"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            Сонгогдсон нийт: <strong> {chkBox.length} </strong> нийтлэлийг
            устгахдаа итгэлтэй байна уу ?
          </p>
        </div>
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={deleteClick}>
            Устгах
          </button>
          <button className="btn btn-light btn-sm" onClick={handleClose}>
            Болих
          </button>
        </div>
      </Model>
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookingReducer.bookings,
    pageLast: state.bookingReducer.paginationLast,
    loading: state.bookingReducer.loading,
    success: state.bookingReducer.success,
    error: state.bookingReducer.error,
    orderTypes: state.orderTypeReducer.orderTypes,
    times: state.bookingReducer.times,
    services: state.serviceReducer.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadBookings: (query) => dispatch(actions.loadBookings(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    getTimes: () => dispatch(actions.getTimes()),
    loadOrderTypes: (query) => dispatch(loadOrderTypes(query)),
    loadServices: (query) => dispatch(loadServices(query)),
    deleteMultBooking: (ids) => dispatch(actions.deleteMultBooking(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
