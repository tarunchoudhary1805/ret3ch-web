import React,{useState} from "react";

const EditQuestion = (props) => {
    console.log(props);
  const [data, setData] = useState({
    question: props.question.question,
    answer: props.question.answer,
    topic_id: props.question.topic_id,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    props.submit(data);
  };

  return (
    <div>
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
        <input
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
    </div>
  );
};

export default EditQuestion;
