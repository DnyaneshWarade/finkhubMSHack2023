import React from "react";
import "./Header.css";
import logo from "./../../Images/logo.png";
import productImage from "./../../Images/product-name-img.png";
import BurgerIcon from "./../../Images/burger-icon.svg";
import NoProfileIcon from "./../../Images/no-profile-icon.svg";
import NavbarItem from "./NavbarItem";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
            <img src={productImage} className="title" alt="product hading" />
          </div>
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="nav-items">
          <li>
            <a href="/dashboard">
              <NavbarItem heading="Destacados" />
            </a>
          </li>
          <li>
            <a href="/">
              <NavbarItem heading="Servicios" />
            </a>
          </li>
          <li>
            <a href="/">
              <NavbarItem heading="Comunidad" />
            </a>
          </li>
          <li>
            <a href="/">
              <NavbarItem heading="ServiceTest" />
            </a>
          </li>
        </ul>
        <Link to="/login">
          <div className="login-icon">
            <img src={BurgerIcon} alt="menu" />
            <img src={NoProfileIcon} alt="profile" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
