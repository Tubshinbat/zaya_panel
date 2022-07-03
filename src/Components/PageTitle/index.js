import React from "react";
import { Link, NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

import css from "./__.module.css";

const newsById = { "6060a3b1e124f281bc371676": "aa" };

const DynamicNewsBreadcrumb = ({ match }) => (
  <span> {newsById[match.params.id]} </span>
);

const routes = [
  {
    path: "/",
    breadcrumb: "Эхлэл",
  },
  {
    path: "/news-category",
    breadcrumb: "Бясалгал төрөл",
  },
  {
    path: "/news",
    breadcrumb: "Бясалгал",
  },
  {
    path: "/news/add",
    breadcrumb: "Бясалгал нэмэх",
  },
  {
    path: "/news/view/",
    breadcrumb: "Бясалгал харах",
  },

  {
    path: "/news/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/news/edit",
    breadcrumb: "Бясалгал шинэчлэх",
  },
  {
    path: "/news/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/banners",
    breadcrumb: "Баннер",
  },
  {
    path: "/banners/add",
    breadcrumb: "Баннер шинээр нэмэх",
  },
  {
    path: "/banners/edit",
    breadcrum: "Баннер засварлах",
  },
  {
    path: "/banners/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/product",
    breadcrumb: "Бараа бүтээгдэхүүн",
  },
  {
    path: "/product/add",
    breadcrumb: "Бараа бүтээгдэхүүн нэмэх",
  },
  {
    path: "/product/edit",
    breadcrum: "Бараа бүтээгдэхүүн шинэчлэх",
  },
  {
    path: "/product/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/car_type",
    breadcrumb: "Машины төрөл",
  },
  {
    path: "/car_type/add",
    breadcrumb: "Машины төрөл нэмэх",
  },
  {
    path: "/car_type/edit",
    breadcrum: "Машины төрөл шинэчлэх",
  },
  {
    path: "/car_type/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/industry",
    breadcrumb: "Машины үйлдвэр",
  },
  {
    path: "/industry/add",
    breadcrumb: "Машины үйлдвэр нэмэх",
  },
  {
    path: "/industry/edit",
    breadcrum: "Машины үйлдвэр шинэчлэх",
  },
  {
    path: "/industry/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/car_zagvar",
    breadcrumb: "Машины загвар",
  },
  {
    path: "/car_zagvar/add",
    breadcrumb: "Машины загвар нэмэх",
  },
  {
    path: "/car_zagvar/edit",
    breadcrum: "Машины загвар шинэчлэх",
  },
  {
    path: "/car_zagvar/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/car_color",
    breadcrumb: "Машины өнгө",
  },
  {
    path: "/car_color/add",
    breadcrumb: "Машины өнгө нэмэх",
  },
  {
    path: "/car_color/edit",
    breadcrum: "Машины өнгө шинэчлэх",
  },
  {
    path: "/car_color/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/beproduct",
    breadcrumb: "Beforward машинууд",
  },
  {
    path: "/beproduct/view",
    breadcrumb: "харах",
  },
  {
    path: "/beproduct/edit",
    breadcrum: " шинэчлэх",
  },
  {
    path: "/beproduct/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/beproduct/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/menu",
    breadcrumb: "Сайтын цэс",
  },
  {
    path: "/menu",
    breadcrumb: "Сайтын цэс",
  },
  {
    path: "/employees",
    breadcrumb: "Ажилчид",
  },
  {
    path: "/position",
    breadcrumb: "Алба нэгж",
  },
  {
    path: "/page/add",
    breadcrumb: "Сайтын хуудас нэмэх",
  },

  {
    path: "/about-us",
    breadcrumb: "Бидний тухай",
  },
  {
    path: "/question",
    breadcrumb: "Түгээмэл асуулт хариулт",
  },
  {
    path: "/users",
    breadcrumb: "Хэрэглэгчид",
  },
  {
    path: "/users/edit",
    breadcrumb: "Засварлах",
  },
  {
    path: "/users/view",
    breadcrumb: "Дэлгэрэнгүй мэдээлэл",
  },
  {
    path: "/users/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/users/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/webinfo",
    breadcrumb: "Ёрөнхий тохиргоо",
  },
  {
    path: "/partners",
    breadcrumb: "Хамтрагч компани",
  },
  {
    path: "/partners/add",
    breadcrumb: "Хамтрагч нэмэх",
  },
  {
    path: "/partners/edit",
    breadcrumb: "Хамтрагч шинэчлэх",
  },
  {
    path: "/partners/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/online",
    breadcrumb: "Онлайн сургалт",
  },
  {
    path: "/online/add",
    breadcrumb: "Онлайн сургалт нэмэх",
  },
  {
    path: "/online/edit",
    breadcrumb: "Онлайн сургалт шинэчлэх",
  },
  {
    path: "/online/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/online-video",
    breadcrumb: "Онлайн хичээл",
  },
  {
    path: "/online-video/add",
    breadcrumb: "Онлайн хичээл нэмэх",
  },
  {
    path: "/online-video/edit",
    breadcrumb: "Онлайн хичээл шинэчлэх",
  },
  {
    path: "/online-video/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/course",
    breadcrumb: "Тэнхим сургалт",
  },
  {
    path: "/course/add",
    breadcrumb: "Тэнхим сургалт нэмэх",
  },
  {
    path: "/course/edit",
    breadcrumb: "Тэнхим сургалт шинэчлэх",
  },
  {
    path: "/course/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/service",
    breadcrumb: "Үйлчилгээ",
  },
  {
    path: "/service/add",
    breadcrumb: "Үйлчилгээ нэмэх",
  },
  {
    path: "/service/edit",
    breadcrumb: "Үйлчилгээ шинэчлэх",
  },
  {
    path: "/service/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/online-course",
    breadcrumb: "ОНЛАЙН СУРГАЛТЫН БҮРТГЭЛ",
  },
  {
    path: "/online-course/add",
    breadcrumb: "ОНЛАЙН СУРГАЛТЫН БҮРТГЭЛ нэмэх",
  },
  {
    path: "/online-course/edit",
    breadcrumb: "ОНЛАЙН СУРГАЛТЫН БҮРТГЭЛ шинэчлэх",
  },
  {
    path: "/online-course/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/order-course",
    breadcrumb: "СУРГАЛТЫН БҮРТГЭЛ",
  },
  {
    path: "/online-course/add",
    breadcrumb: " СУРГАЛТЫН БҮРТГЭЛ нэмэх",
  },
  {
    path: "/online-course/edit",
    breadcrumb: " СУРГАЛТЫН БҮРТГЭЛ шинэчлэх",
  },
  {
    path: "/online-course/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/course-comment",
    breadcrumb: "СУРГАЛТЫН СЭТГЭГДЭЛ",
  },
  {
    path: "/course-comment/add",
    breadcrumb: " СУРГАЛТЫН СЭТГЭГДЭЛ нэмэх",
  },
  {
    path: "/course-comment/edit",
    breadcrumb: " СУРГАЛТЫН СЭТГЭГДЭЛ шинэчлэх",
  },
  {
    path: "/course-comment/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/booking",
    breadcrumb: "Цаг авах",
  },
  {
    path: "/booking/add",
    breadcrumb: " Цаг авах",
  },
  {
    path: "/booking/edit",
    breadcrumb: " Цаг шинэчлэх",
  },
  {
    path: "/booking/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/orders",
    breadcrumb: "Бараа захиалга",
  },
  {
    path: "/orders/add",
    breadcrumb: " Барааны захиалга нэмэх",
  },
  {
    path: "/orders/edit",
    breadcrumb: " Барааны захиалга шинэчлэх",
  },
  {
    path: "/orders/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/course-type",
    breadcrumb: "Төлөв",
  },
  {
    path: "/course-type/add",
    breadcrumb: " Төлөв нэмэх",
  },
  {
    path: "/course-type/edit",
    breadcrumb: " Төлөв шинэчлэх",
  },
  {
    path: "/course-type/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
];
let lastBread = "";

// map & render your breadcrumb components however you want.
const Breadcrumbs = withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <>
    {breadcrumbs.map(({ match, breadcrumb }) => (
      // other props are available during render, such as `location`
      // and any props found in your route objects will be passed through too
      <li className={`breadcrumb-item ${css.Bitem}`} key={match.url}>
        <Link to={match.url}>{breadcrumb} </Link>
      </li>
    ))}
  </>
));

const PageTitle = (props) => {
  return (
    <div className={`container-fluid ${css.Header}`}>
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>{props.name}</h1>
        </div>
        <div className="col-sm-6">
          <ol className={`breadcrumb ${css.Breadcrumb}  float-sm-right`}>
            <Breadcrumbs />
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
