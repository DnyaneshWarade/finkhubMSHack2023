import React from "react";
import ProfileIcon from "./../../../Images/ProfileIcon.png";
import LikesIcon from "./../../../Images/Likes.svg";
import "./PostCard.css";
export default function PostCard({Post}) {
  return (
  <div>  <div className="PostCard">
  <div className="Head">
    <p className="Counter">{Post.likes}</p>
    <img src={LikesIcon} alt="Likes" className="Likes" />
  </div>
  <div className="Details">
    <div className="ProfileDetails">
      <img src={ProfileIcon} alt="ProfileLog" className="ProfileImg" />
      <p className="UserName">{Post.userName}</p>
    </div>
    <p className="Date">{Post.date}</p>
  </div>
  <div className="Description">
    <p>{Post.description}</p>
  </div>
</div></div>
  );
}
