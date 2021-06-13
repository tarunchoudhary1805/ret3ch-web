import React, { useState } from "react";

const EditCategory = (props) => {
  const [category, setCategory] = useState(props.cat.name);
  const submit = (e) => {
    e.preventDefault();
    const payload = {
      name: category,
    };
    props.editCategory(payload);
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
        <button type="button" className="btn btn-success m-2" onClick={submit}>
          Save
        </button>
        <button type="button" className="btn btn-danger m-2" onClick={props.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
