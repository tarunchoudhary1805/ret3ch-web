import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddTopic = (props) => {
  const [topic, setTopic] = useState({
    description: "",
    title: "",
  });

  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    if (topic.description.length > 0 && topic.title.length > 0) {
      e.preventDefault();
      props.topicSubmit(topic);
    } else {
      
      toast.error("All fields are required");
    }
  };

  return (
    <>
      <ToastContainer />
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
