import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container border p-2 mt-5">
      <h3 className="text-center mb-5">Dashboard</h3>
      <div className="d-flex flex-column">
        <div className="d-flex" style={{ justifyContent: "space-around" }}>
          <Link className="cardd p-5 text-white" to="/category">
            Category
          </Link>
          <Link className="text-white cardd p-5">Meme</Link>
        </div>
        <div className="d-flex" style={{ justifyContent: "space-around" }}>
          {" "}
          <Link className="cardd p-5 text-white" to="/blog">
            Blog
          </Link>
          <Link className="text-white cardd p-5" to="/quiz">
            Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
