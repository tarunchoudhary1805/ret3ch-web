import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EditTopic = (props) => {
  const [topic, setTopic] = useState({
    description: props.top.description,
    title: props.top.title,
    language_id: props.id,
  });

  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    if (topic.description.length > 0 && topic.title.length > 0) {
      e.preventDefault();
      props.editTopic(topic);
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <div>
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
      <button onClick={submit} className="btn btn-success m-2" type="button">
        Save
      </button>
      <button
        type="button"
        className="btn btn-danger m-2"
        onClick={props.cancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditTopic;
