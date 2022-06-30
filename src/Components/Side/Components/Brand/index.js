import React from "react";

//Style
import css from "./__.module.css";

const Brand = () => {
  return (
    <>
      <a href="/" className={`brand-link  ${css.Brand}`}>
        <span className={`brand-text font-weight-light`}>
          Webr вэб удирдлага
        </span>
      </a>
    </>
  );
};

export default Brand;
