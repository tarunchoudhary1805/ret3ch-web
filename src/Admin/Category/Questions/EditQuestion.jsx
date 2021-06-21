import React, { useState } from "react";
import { toast ,ToastContainer} from "react-toastify";

const EditQuestion = (props) => {
  const [data, setData] = useState({
    question: props.questionEdit.question,
    answer: props.questionEdit.answer,
    topic_id: props.questionEdit.topic_id,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if(data.question.length > 0 && data.answer.length > 0){
      props.submitEdit(data);
    }else{
      toast.error("All Fields are required")
      console.log("err");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="form-group">
        <label>Question </label>
        <input
          className="form-control"
          value={data.question}
          name="question"
          onChange={handleChange}
          type="text"
        />
      </div>
      <div className="form-group">
        <label>Answer</label>
        <textarea
          rows="5"
          className="form-control"
          value={data.answer}
          name="answer"
          onChange={handleChange}
          type="text"
        />
      </div>
      <button className="btn btn-success m-2" onClick={submit}>
        Update
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

export default EditQuestion;
