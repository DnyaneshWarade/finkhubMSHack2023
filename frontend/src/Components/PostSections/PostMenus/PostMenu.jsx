import React, { useState } from "react";
import "./PostMenu.css";
import AddIcon from "./../../../Images/add-icon.svg";
import { useHistory } from "react-router-dom";

export default function PostMenu() {
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const history = useHistory();
  function writePost(e) {
    history.push("/dashboard");
  }
  return (
    <div className="Menus">
      <div className="Options">
        <select
          className="Categories SelectMenu"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Select">--Select--</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className="SortBy SelectMenu"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Select">--Select--</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="WritePost" onClick={writePost}>
        <div className="Icon">
          {" "}
          <img src={AddIcon} alt="add-icon" />{" "}
        </div>
        <div className="Text">Write a post</div>
      </div>
    </div>
  );
}
