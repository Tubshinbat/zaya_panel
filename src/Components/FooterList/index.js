import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import css from "./__.module.css";
import * as actions from "../../redux/actions/footerMenuActions";

const CategoryList = (props) => {
  useEffect(() => {}, []);
  const [activeMenu, setActiveMenu] = useState(null);

  const clickItem = (elId) => {
    setActiveMenu(elId);
    props.loadMenu(elId);
  };

  useEffect(() => {
    setActiveMenu(props.menuId);
  }, [props.menuId]);

  const renderCategories = (categories) => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id}>
            <div
              className={`${css.ListItem}  ${
                activeMenu === el._id ? css.Active : null
              }`}
              onClick={() => clickItem(el._id)}
            >
              {activeMenu === el._id ? (
                <i className="far fa-folder-open"></i>
              ) : (
                <i className="far fa-folder"></i>
              )}
              <span className={el.name === undefined && `redText`}>
                {el.name}
              </span>
            </div>
            {el.children.length > 0 ? (
              <ul> {renderCategories(el.children)} </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <div className={css.CatList}>
      <ul className={css.CategoryList}>{renderCategories(props.category)}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.menuReducer.loading,
    newsCategory: state.menuReducer.selectData,
    menuId: state.menuReducer.selectData.category._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMenu: (newsID) => dispatch(actions.getMenu(newsID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
