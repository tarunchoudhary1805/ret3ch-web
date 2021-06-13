import React, { useState } from "react";

const AddTopic = (props) => {
  const [topic, setTopic] = useState({
    description: "",
    title: "",
  });
  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(topic);
    props.topicSubmit(topic);
  };
  return (
    <>
      <div className="form-group">
        <label>Title </label>
        <input
          className="form-control"
          type="text"
          value={topic.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description </label>
        <textarea
          rows="5"
          className="form-control"
          type="text"
          value={topic.description}
          name="description"
          onChange={handleChange}
        />
      </div>
      <button onClick={submit} className="btn btn-success" type="button">
        Save
      </button>
    </>
  );
};

export default AddTopic;
