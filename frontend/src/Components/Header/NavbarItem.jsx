import React from "react";
import Arrow from "./../../Images/arrow.svg";
import "./NavbarItem.css";
export default function NavbarItem(props) {
  return (
    <div className="MenuItem">
      <span className="MenuItem-label">{props.heading}</span>
      <span>
        <img className="MenuItem-image" src={Arrow} alt="menu" />
      </span>
    </div>
  );
}
