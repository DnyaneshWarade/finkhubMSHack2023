import React from "react";
import ProfileIcon from "./../../../Images/ProfileIcon.png";
import LikesIcon from "./../../../Images/Likes.svg";
import "./PostCard.css";
import UserNames from "../../../Resources/RandomNames";
export default function PostCard({ Post }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function getUserName() {
    const random = parseInt(Math.random(100) * 100);
    return UserNames[random];
  }
  function getDateFromTimeStamp(timeStamp) {
    var date = new Date(timeStamp);
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }
  return (
    <div>
      <div className="PostCard">
        <div className="Head">
          <p className="Counter">
            {Post.likes ? Post.likes : parseInt(Math.random() * 100)}
          </p>
          <img src={LikesIcon} alt="Likes" className="Likes" />
        </div>
        <div className="Details">
          <div className="ProfileDetails">
            <img src={ProfileIcon} alt="ProfileLog" className="ProfileImg" />
            <p className="UserName">{getUserName()}</p>
          </div>
          <p className="Date">{getDateFromTimeStamp(Post.timeStamp)}</p>
        </div>
        <div className="Description">
          <p>{Post.description}</p>
        </div>
      </div>
    </div>
  );
}
