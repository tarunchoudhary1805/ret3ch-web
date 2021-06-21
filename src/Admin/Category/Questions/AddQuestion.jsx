import React, { useState } from "react";
import { toast ,ToastContainer} from "react-toastify";

const AddQuestion = (props) => {
  const [question_list, setQuestion_list] = useState([
    {
      question: " ",
      answer: "",
      topic_id: localStorage.getItem("topicId"),
    },
  ]);

  const handleAddQuest = () => {
    const value = [...question_list];
    value.push({
      question: " ",
      answer: "",
      topic_id: localStorage.getItem("topicId"),
    });
    setQuestion_list(value);
  };

  const handleRemoveQuest = (idx) => {
    const value = [...question_list];
    value.splice(idx, 1);
    setQuestion_list(value);
  };

  const handleQuestionChange = (e, idx1) => {
    const value = [...question_list];
    value[idx1][e.target.name] = e.target.value;
    setQuestion_list(value);
  };

  const submit = (e) => {
    e.preventDefault();
    let bool ;
    for(let i=0;i<question_list.length;i++){
      if(question_list[i].question.length>0 && question_list[i].answer.length > 0){
        bool = true;
      }else{
        bool = false;
      }
    }
    console.log(bool);
    if(bool){
      props.addQuestion(question_list);
     }else{
       toast.error("ALl Fields are required");
     }
  };

  return (
    <div className="container">
      <ToastContainer />
      {question_list?.map((item, idx1) => (
        <>
          <div className="form-group">
            <label>Question #{idx1 + 1}</label>
            <input
              className="form-control"
              value={item.question}
              name="question"
              onChange={(e) => handleQuestionChange(e, idx1)}
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Answer</label>
            <textarea
              rows="5"
              className="form-control"
              value={item.answer}
              name="answer"
              onChange={(e) => handleQuestionChange(e, idx1)}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success m-2"
                onClick={() => handleAddQuest()}
              >
                Add question
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleRemoveQuest(idx1)}
              >
                Remove question
              </button>
            </div>
          </div>
        </>
      ))}
      <button onClick={submit} type="button" className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default AddQuestion;
