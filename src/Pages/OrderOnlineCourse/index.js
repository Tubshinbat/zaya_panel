import React, { useEffect, Text, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS

import * as actions from "../../redux/actions/courseOrderActions";
import { loadOnlineGroups } from "../../redux/actions/onlineGroupActions";
import { loadOrderTypes } from "../../redux/actions/orderTypeActions";
import { getUsers } from "../../redux/actions/userActions";

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

const Serives = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState({});
  const [select, setSelect] = useState(
    "status name slug categories pictures type createAt"
  );

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

  // ???????? ?????????? ?????????? ?????????? ?????????????????? ???????????? ???????????????? ?????? useEffect ?????????? ?????????? TOAST ????????????????
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
    props.loadCourseOrders(
      `select=${select}&courseIs=onlineCourse&sort=${sort}&status=${status}&name=${searchText}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    props.clear();
    setCategory(() => null);
    setStatus(() => null);
    setSearchText(() => "");
    setSelectCat();
    setChkBox(() => []);
    props.getUsers(`limit=100`);
    props.loadOnlineGroups(`limit=100`);
    props.loadOrderTypes(`limit=100`);
    props.loadCourseOrders(`select=${select}&courseIs=course`);
  };

  const addClick = () => {
    props.history.push("/online-course/add");
  };

  const handleShow = (data) => {
    setDropShow((beforeDrop) => ({
      ...beforeDrop,
      [data]: dropShow[data] ? false : true,
    }));
  };

  const handleClickStatus = (e) => {
    setSelectStatus(e.name);
    handleShow("status");
    setStatus(e.value);
    props.loadCourseOrders(
      `select=${select}&courseIs=onlineCourse&sort=${sort}&status=${e.value}&name=${searchText}&category=${category}&page=${activePage}`
    );
  };

  const handleShowModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
  };

  const handleClose = () => {
    setDeleteModel(false);
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch((bs) => ({ ...bs, [name]: value }));
  };

  useEffect(() => {
    props.loadCourseOrders(
      `select=${select}&courseIs=onlineCourse&sort=${sort}&ordernumber=${search.ordernumber}&payis=${search.payis}&courseName=${search.courseName}&orderType=${search.orderType}&user=${search.user}&page=${activePage}`
    );
  }, [search]);

  // FILTER HANDLE
  const handleChange = (e) => {
    setSearchText(e.target.value);
    props.loadPagination(props.pageLast);
    props.loadCourseOrders(
      `select=${select}&courseIs=onlineCourse&sort=${sort}&status=${status}&name=${e.target.value}&page=${activePage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleClickCategory = (e = null) => {
    setSelectCat(e.name || "????????");
    setCategory(e._id || null);
    handleShow("category");
    const id = e ? e._id : null;
    props.loadCourseOrders(
      `select=${select}&courseIs=onlineCourse&sort=${sort}&status=${status}&name=${searchText}&category=${id}&page=${activePage}`
    );
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });

    props.deleteMultCourseOrder(ids);
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

  const renderStatus = () => {
    const statusData = [
      { name: "????????", value: null },
      { name: "????????????", value: true },
      { name: "????????????????", value: false },
    ];
    let renderJSX = [];
    statusData.map((el) => {
      renderJSX.push(
        <li key={el.name}>
          <p className={`DropdownEl`} onClick={() => handleClickStatus(el)}>
            {el.name}
          </p>
        </li>
      );
    });

    return renderJSX;
  };

  return (
    <Section>
      <MetaTags>
        <title> ???????????? ?????????????????? ?????????????? | WEBR Control Panel</title>
        <meta
          name="description"
          content="???????????? ?????????????????? ?????????????? | WeBR control panel"
        />
        <meta
          property="og:title"
          content="???????????? ?????????????????? ?????????????? | web control panel"
        />
      </MetaTags>
      <PageTitle name={`???????????? ?????????????????? ??????????????`} />

      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> ???????????? ?????????????????? ??????????????
                ??????????????{" "}
              </button>
              <button
                name="refresh"
                onClick={() => init()}
                className="myButton refreshBtn"
              >
                <i className="fas fa-redo-alt"></i> ??????????????
              </button>
              {chkBox.length > 0 && (
                <button
                  name="news"
                  onClick={handleShowModel}
                  className="myButton refreshBtn deleteBtn"
                >
                  <i className="fas fa-trash-alt"></i> ????????????
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
                  ???????????????????? : {chkBox.length}
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
                    <th> ???????????????????? ???????????? </th>
                    <th className="statusTh">???????????? ???????????? ???????? </th>
                    <th> ?????????????? </th>
                    <th> ?????????? </th>
                    <th> ?????????????????? </th>
                    <th>???????????? ??????????</th>
                    <th>????????????</th>
                  </tr>
                </thead>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      name="ordernumber"
                      className="form-control"
                      placeholder="???????????????????? ?????????????????? ????????"
                      onChange={handleSearch}
                    />
                  </td>
                  <td>
                    <select
                      name="payis"
                      className="form-select"
                      onChange={handleSearch}
                    >
                      <option value=""> ?????????? ???????????? </option>
                      <option value={true}> ???????????? </option>
                      <option value={false}> ???????????????? </option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="courseName"
                      className="form-select"
                      onChange={handleSearch}
                    >
                      <option value=""> ?????????????? ???????????? </option>
                      {props.onlineGroups &&
                        props.onlineGroups.map((course) => (
                          <option value={course._id}> {course.name} </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="orderType"
                      className="form-select"
                      onChange={handleSearch}
                    >
                      <option value=""> ?????????? ???????????? </option>
                      {props.orderTypes &&
                        props.orderTypes.map((order) => (
                          <option value={order._id}> {order.name} </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="user"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value=""> ?????????????????? </option>
                      {props.users &&
                        props.users.map((user) => (
                          <option value={user._id}> {user.lastname} </option>
                        ))}
                    </select>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                {props.courseOrders &&
                  props.courseOrders.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td>{el.orderNumber}</td>
                      <td className="statusTd">
                        {el.pay == true ? (
                          <div className="activeOn"></div>
                        ) : (
                          <div className="activeOff"></div>
                        )}
                      </td>

                      <td>
                        <a
                          href={`${myBase.siteUrl}online/${
                            el.onlineCourse && el.onlineCourse.slug
                          }`}
                          target="_blank"
                        >
                          {el.onlineCourse && el.onlineCourse.name}
                        </a>
                      </td>
                      <td>{el.orderType && el.orderType.name}</td>
                      <td> {el.user && el.user.lastname} </td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/online-course/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.courseOrders &&
                props.courseOrders.length < 1 && (
                  <div className={css.Notfound}>
                    <p> "?????????? ??????????????????" </p>
                    <img src={notfound} />
                  </div>
                )}
              <div className={css.DashboardFooter}>
                <p>
                  ???????? ????????: <strong> {total} </strong>
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
        modelName="???????????? ???????? ????????????"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            ???????????????????? ????????: <strong> {chkBox.length} </strong> ????????????????????
            ?????????????????? ???????????????? ?????????? ???? ?
          </p>
        </div>
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={deleteClick}>
            ????????????
          </button>
          <button className="btn btn-light btn-sm" onClick={handleClose}>
            ??????????
          </button>
        </div>
      </Model>
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    courseOrders: state.courseOrderReducer.courseOrders,
    pageLast: state.courseOrderReducer.paginationLast,
    loading: state.courseOrderReducer.loading,
    success: state.courseOrderReducer.success,
    onlineGroups: state.onlineGroupReducer.onlineGroups,
    orderTypes: state.orderTypeReducer.orderTypes,
    error: state.serviceReducer.error,
    users: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadCourseOrders: (query) => dispatch(actions.loadCourseOrders(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    loadOnlineGroups: (query) => dispatch(loadOnlineGroups(query)),
    loadOrderTypes: (query) => dispatch(loadOrderTypes(query)),
    getUsers: (query) => dispatch(getUsers(query)),
    deleteMultCourseOrder: (ids) =>
      dispatch(actions.deleteMultCourseOrder(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Serives);
