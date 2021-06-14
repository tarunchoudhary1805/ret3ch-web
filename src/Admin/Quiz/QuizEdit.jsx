import React, { useState } from "react";

const QuizEdit = (props) => {
  const [quiz1, setQuiz1] = useState({
    quiz_heading: props.quiz.quiz_heading,
    short_desc: props.quiz.short_desc,
  });

  const [quiz, setQuiz] = useState(props.quiz.question_list);

  const handleChange = (i, e) => {
    const values = [...quiz];
    values[i][e.target.name] = e.target.value;
    setQuiz(values);
  };

  const handleChangeAnswers = (idx1, idx2, e) => {
    const values = [...quiz];
    values[idx1][e.target.name][idx2] = e.target.value;
    setQuiz(values);
  };

  const handleAdd = () => {
    const values = [...quiz];
    values.push({
      question: "",
      quiz_options: ["", "", "", ""],
      correct_option: "",
    });
    setQuiz(values);
  };

  const handleRemove = (i) => {
    const values = [...quiz];
    values.splice(i, 1);
    setQuiz(values);
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      quiz_heading: quiz1.quiz_heading,
      short_desc: quiz1.short_desc,
      question_list: quiz,
    };
    props.handleEdit(payload);
  };

  const handleChange1 = (e) => {
    setQuiz1({...quiz1, [e.target.name]: e.target.value });
  };
  
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Quiz Heading</label>
          <input
            type="text"
            value={quiz1.quiz_heading}
            onChange={handleChange1}
            name="quiz_heading"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Short Discription</label>
          <input
            type="text"
            value={quiz1.short_desc}
            onChange={handleChange1}
            name="short_desc"
            className="form-control"
          />
        </div>
        {quiz.map((item, idx1) => (
          <div className="container border my-2">
            <div className="form-group">
              <label className="h4">Question #{idx1 + 1}</label>
              <input
                type="text"
                placeholder="Question"
                value={item.question}
                name="question"
                className="form-control"
                onChange={(e) => handleChange(idx1, e)}
              />
            </div>
            {item.quiz_options.map((x, idx2) => (
              <div className="container ">
                <div className="form-group">
                  <label>Answer #{idx2 + 1}</label>
                  <input
                    type="text"
                    onChange={(e) => handleChangeAnswers(idx1, idx2, e)}
                    name="quiz_options"
                    className="form-control"
                    placeholder={`answer #${idx2 + 1}`}
                    value={x}
                  />
                </div>
              </div>
            ))}
            <div className="form-group">
              <label>Correct Answer</label>
              <select
                name="correct_option"
                className="form-control"
                value={item.correct_option}
                
                onChange={(e) => handleChange(idx1, e)}
              >
                  {/* {console.log(quiz)} */}
                <option value="1">Answer #1</option>
                <option value="2">Answer #2</option>
                <option value="3">Answer #3</option>
                <option value="4">Answer #4</option>
              </select>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success m-2"
            onClick={() => handleAdd()}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => handleRemove()}
          >
            Delete
          </button>
        </div>
        <div>
          <button className="btn btn-success m-2" onClick={submit}>
            Save Quiz
          </button>
          <button className="btn btn-danger m-2" onClick={props.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizEdit;
