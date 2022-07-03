import React, { useEffect, Text, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS

import * as actions from "../../redux/actions/onlineCommentActions";
import { loadOnlineGroups } from "../../redux/actions/onlineGroupActions";
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
    props.loadOnlineComments(
      `select=${select}&sort=${sort}&name=${searchText}&page=${activePage}`
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
    props.loadOnlineComments();
    props.loadOnlineGroups(`limit=100`);
  };

  const addClick = () => {
    props.history.push("/course-comment/add");
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
    props.loadOnlineComments(
      `select=${select}&sort=${sort}&status=${e.value}&name=${searchText}&page=${activePage}`
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
    props.loadOnlineComments(
      `select=${select}&sort=${sort}&ordernumber=${search.ordernumber}&payis=${search.payis}&courseName=${search.courseName}&orderType=${search.orderType}&user=${search.user}&page=${activePage}`
    );
  }, [search]);

  // FILTER HANDLE
  const handleChange = (e) => {
    setSearchText(e.target.value);
    props.loadPagination(props.pageLast);
    props.loadOnlineComments(
      `select=${select}&sort=${sort}&name=${e.target.value}&page=${activePage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleClickCategory = (e = null) => {
    setSelectCat(e.name || "Бүгд");
    setCategory(e._id || null);
    handleShow("category");
    const id = e ? e._id : null;
    props.loadOnlineComments(
      `select=${select}&sort=${sort}&name=${searchText}&page=${activePage}`
    );
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });

    props.deleteMultOnlineComment(ids);
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
      { name: "Бүгд", value: null },
      { name: "Төлсөн", value: true },
      { name: "Төлөөгүй", value: false },
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
        <title> Сургалтын сэтгэгдэл | WEBR Control Panel</title>
        <meta
          name="description"
          content="Сургалтын сэтгэгдэл | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Сургалтын сэтгэгдэл | web control panel"
        />
      </MetaTags>
      <PageTitle name={`Сургалтын сэтгэгдэл`} />

      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
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
                    <th> Сэтгэгдэл </th>
                    <th className="statusTh"> Хичээл </th>
                    <th> Сэтгэгдэл үлдээсэн </th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>

                {props.comments &&
                  props.comments.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td>{el.comment}</td>
                      <td className="statusTd">
                        {el.comment.onlineGroup && el.comment.onlineGroup.slug}
                      </td>

                      <td>
                        <a
                          href={`${myBase.siteUrl}online/${
                            el.comment.onlineGroup &&
                            el.comment.onlineGroup.slug
                          }`}
                          target="_blank"
                        >
                          {el.comment.onlineGroup &&
                            el.comment.onlineGroup.slug}
                        </a>
                      </td>
                      <td>{el.createUser && el.createUser.lastname}</td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/order-course/view/${el._id}`}
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.comments &&
                props.comments.length < 1 && (
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
    courseOrders: state.courseOrderReducer.courseOrders,
    pageLast: state.courseOrderReducer.paginationLast,
    loading: state.courseOrderReducer.loading,
    success: state.courseOrderReducer.success,
    onlineGroups: state.courseReducer.courses,
    orderTypes: state.orderTypeReducer.orderTypes,
    error: state.serviceReducer.error,
    users: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadOnlineGroups: (query) => dispatch(loadOnlineGroups(query)),
    loadOnlineComments: (query) => dispatch(actions.loadOnlineComments(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    getUsers: (query) => dispatch(getUsers(query)),
    deleteMultOnlineComment: (ids) =>
      dispatch(actions.deleteMultOnlineComment(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Serives);
