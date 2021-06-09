import React, { useState } from "react";

const Form = () => {
  const [quiz, setQuiz] = useState([
    {
      question: "",
      quiz_options: ["", "", "", ""],
      correct_option: "",
    },
  ]);
  const handleChange = (i, e) => {
    const values = [...quiz];
    values[i][e.target.name] = e.target.value;
    console.log(values);
    setQuiz(values);
  };

  const handleChangeAnswers = (i, e) => {
    console.log(e.target.name, e.target.value);
    console.log(quiz);
    // const values = [...quiz ];
    // values[i][e.target.name]  = e.target.value;
    // console.log(values);
    // setQuiz(values);
  };

  const handleAdd = () => {
    const values = [...quiz];
    values.push({
      question: "",
      quiz_options: ["", "", "", ""],
      correct_option: "",
    });
    setQuiz(values);
    console.log(values);
  };
  const handleRemove = (i) => {
    const values = [...quiz];
    values.splice(i, 1);
    setQuiz(values);
  };
  console.log(quiz);
  return (
    <div>
      <form>
        {quiz.map((item, i) => (
          <>
            <div className="form-group">
              {i + 1}
              <input
                type="text"
                placeholder="Question"
                value={item.question}
                name="question"
                className="form-control"
                onChange={(e) => handleChange(i, e)}
              />
            </div>
            {item.quiz_options.map((x, i) => (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={(e) => handleChangeAnswers(i, e)}
                    name="quiz_options"
                    className="form-control"
                    placeholder={`answer #${i + 1}`}
                    value={x}
                  />
                </div>
              </>
            ))}
            <div className="form-group">
              <select
                name="correct_option"
                className="form-control"
                value={quiz.correct_option}
                onChange={(e) => handleChange(i, e)}
              >
                <option value="1">Answer #1</option>
                <option value="2">Answer #2</option>
                <option value="3">Answer #3</option>
                <option value="4">Answer #4</option>
              </select>
            </div>
          </>
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
      </form>
    </div>
  );
};

export default Form;
