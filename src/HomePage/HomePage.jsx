import React from "react";
import "./style.css";
// import { Link } from "react-router-dom";
import showcase from "../images/showcase.png";

export default function HomePage(props) {
  const handleClick = () => {
    props.history.push("/blogspage");
  };
  return (
    <div className="homepage">
      <div className="content">
        <h1>Tell Your Story to the World</h1>
        <button
          onClick={handleClick}
          className="btn mt-5 pt-3 pb-3 btn-primary pr-5 pl-5"
        >
          Read Blogs
        </button>
      </div>
      <div className="img-container">
        <img className="main-img" src={showcase} alt="bg-img" />
      </div>
    </div>
  );
}
