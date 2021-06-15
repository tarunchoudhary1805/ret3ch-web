import React, { useState } from "react";

const CategoryAdd = (props) => {
  const [category, setCategory] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const payload = {
      name: category,
    };
    props.AddCategory(payload);
  };

  return (
    <div>
      <div className="form-group">
        <label>Category / Language</label>
        <input
          className="form-control"
          type="text"
          value={category}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={!category}
          type="button"
          className="btn btn-success"
          onClick={submit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CategoryAdd;
