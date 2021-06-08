import React from "react";

const Adminlogin = () => {
  return (
    <div>
      <form action="" className="w-50 my-5 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="form-group">
          <button className="btn btn-success my-2 mx-auto">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Adminlogin;
