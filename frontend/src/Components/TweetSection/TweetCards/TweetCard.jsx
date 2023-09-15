import React from "react";
import "./TweetCard.css";
import ProfileIcon from "./../../../Images/ProfileIcon.png";

export default function TweetCard({Tweet}) {
  return (
    <div className="TweetCard">
      <div className="Details">
        <div className="ProfileDetails">
          <img src={ProfileIcon} alt="ProfileLog" className="ProfileImg" />
          <p className="UserName">{Tweet.userName}</p>
        </div>
        <p className="Date">{Tweet.date}</p>
      </div>
      <div className="Description">
        <pre>{Tweet.description} </pre>
      </div>
    </div>
  );
}
