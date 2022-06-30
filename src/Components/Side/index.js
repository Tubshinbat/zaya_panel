import React from "react";
import Brand from "./Components/Brand";
import MultipleList from "./Components/MultipleList";
import Nav from "./Components/Nav";
import NavItem from "./Components/NavItem";
import PackList from "./Components/PackList";
import SideBar from "./Components/SideBar";
import UserInfo from "./Components/UserInfo";

import css from "./__.module.css";
import "./style.css";

const Side = () => {
  return (
    <>
      <aside
        className={`main-sidebar sidebar-dark-primary elevation-4 ${css.SideBar}`}
      >
        <Brand />
        <SideBar>
          <UserInfo />
          <Nav>
            <PackList>
              <NavItem exact link="/">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Хянах самар</p>
              </NavItem>
            </PackList>
            <PackList name="Үндсэн удирдлагууд">
              <NavItem exact link="/online">
                <i className="nav-icon fa fa-video"></i>
                <p>Онлайн сургалт</p>
              </NavItem>
              <NavItem exact link="/online-video">
                <i className="nav-icon far fa-circle nav-icon"></i>
                <p>Онлайн хичээл </p>
              </NavItem>
              <NavItem exact link="/course">
                <i className="nav-icon fa fa-book"></i>
                <p>Сургалт</p>
              </NavItem>
              <NavItem exact link="/service">
                <i class="nav-icon fa fa-bookmark"></i>
                <p>Үйлчилгээ</p>
              </NavItem>

              <MultipleList name="Сургалтын бүртгэл" icon="nav-icon fa fa-file">
                <NavItem exact link="/online-course">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Онлайн сургалт бүртгэл</p>
                </NavItem>

                <NavItem exact link="/order-course">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Сургалт бүртгэл</p>
                </NavItem>
                <NavItem exact link="/course-comment">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Сэтгэгдэл</p>
                </NavItem>
              </MultipleList>

              <NavItem exact link="/booking">
                <i className="nav-icon fa fa-bookmark"></i>
                <p>Цаг авалт</p>
              </NavItem>

              <NavItem exact link="/product">
                <i className="nav-icon fa fa-box"></i>
                <p>Бараа бүтээгдэхүүн</p>
              </NavItem>

              <NavItem exact link="/orders">
                <i className="nav-icon fa fa-folder"></i>
                <p>Бараа захиалга</p>
              </NavItem>

              <MultipleList
                name="Бясалгал дасгал"
                icon="nav-icon fas fa-newspaper"
              >
                <NavItem exact link="/news">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Бясалгал дасгал</p>
                </NavItem>
                <NavItem exact link="/news-category">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Ангилал</p>
                </NavItem>
              </MultipleList>

              <NavItem exact link="/works">
                <i className="nav-icon fas fa-users"></i>
                <p>Хамт олон</p>
              </NavItem>

              <NavItem exact link="/partners">
                <i className="nav-icon fas fa-suitcase"></i>
                <p>Хамтрагчид</p>
              </NavItem>
            </PackList>
            <PackList name="Форм">
              <NavItem exact link="/course-type">
                <i className="nav-icon far fa-circle nav-icon"></i>
                <p>Төлвүүд</p>
              </NavItem>

              <NavItem exact link="/contact">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Санал хүсэлт</p>
              </NavItem>
              <NavItem exact link="/question">
                <i className="nav-icon far fa-question-circle"></i>
                <p>Нийтлэг асуулт</p>
              </NavItem>
            </PackList>
            <PackList name="Вэб сайт">
              <NavItem exact link="/users">
                <i className="nav-icon fas fa-user-friends"></i>
                <p>Хэрэглэгчид</p>
              </NavItem>
              <NavItem exact link="/page">
                <i className="nav-icon fas fa-file-alt"></i>
                <p>Сайтын хуудас</p>
              </NavItem>
              <MultipleList name="Сайтын цэс" icon="nav-icon fas fa-compass">
                <NavItem exact link="/menu">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Сайтын цэс</p>
                </NavItem>
                <NavItem exact link="/footer-menu">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Хөлөнд байрлах цэс</p>
                </NavItem>
              </MultipleList>
              <NavItem exact link="/banners">
                <i className="nav-icon fas fa-images"></i>
                <p>Баннер</p>
              </NavItem>
            </PackList>
          </Nav>
        </SideBar>
      </aside>
    </>
  );
};

export default Side;
