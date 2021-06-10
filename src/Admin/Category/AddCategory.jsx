import React, { useState } from "react";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [topics, setTopics] = useState([
    {
      topic: " ",
      questions: [
        {
          question: " ",
          answers: ["", "", "", ""],
          correct_option: "",
        },
      ],
    },
  ]);
  const handleAddTopic = () => {
    const value = [...topics];
    value.push({
      topic: " ",
      questions: [
        {
          question: " ",
          answers: ["", "", "", ""],
          correct_option: "",
        },
      ],
    });
    setTopics(value);
  };
  const handleAddQuest = (e, idx) => {
    const value = [...topics];

    value[idx].questions.push({
      question: " ",
      answers: ["", "", "", ""],
      correct_option: "",
    });
    console.log(value);
    setTopics(value);
  };
  const handleRemoveTopic = (e, idx) => {
    const value = [...topics];
    value.splice(idx, 1);
    setTopics(value);
  };
  const handleRemoveQuest = (e, idx1, idx2) => {
    const value = [...topics];
    value[idx1].questions.splice(idx2, 1);
    console.log(value);
    setTopics(value);
  };

  const handleTopicChange = (e, idx) => {
    const value = [...topics];
    value[idx][e.target.name] = e.target.value;
    setTopics(value);
  };
  const handleQuestionChange = (e, idx1, idx2) => {
    const value = [...topics];
    value[idx1].questions[idx2][e.target.name] = e.target.value;
    setTopics(value);
  };
  const handleAnswersChange = (e, idx1, idx2, idx3) => {
    const value = [...topics];
    value[idx1].questions[idx2][e.target.name][idx3] = e.target.value;
    setTopics(value);
  };
  console.log(topics);
  const submit = (e) => {
    e.preventDefault();
    const payload = {
      category,
      topics,
    };
    console.log("data to send in api", payload);
  };

  return (
    <div className="container">
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
      {topics?.map((item, idx1) => (
        <div>
          <div className="form-group">
            <label>Topic Name #{idx1 + 1}</label>
            <input
              type="text"
              className="form-control"
              value={item.topic}
              name="topic"
              onChange={(e) => handleTopicChange(e, idx1)}
            />
          </div>
          {item.questions.map((x, idx2) => (
            <>
              <div className="form-group">
                <label>Question #{idx2 + 1}</label>
                <input
                  className="form-control"
                  value={x.question}
                  name="question"
                  onChange={(e) => handleQuestionChange(e, idx1, idx2)}
                  type="text"
                />
              </div>
              {x.answers.map((x1, idx3) => (
                <div className="container ">
                  <div className="form-group">
                    <label>Answer #{idx3 + 1}</label>
                    <input
                      type="text"
                      onChange={(e) => handleAnswersChange(e, idx1, idx2, idx3)}
                      name="answers"
                      className="form-control"
                      placeholder={`answer #${idx3 + 1}`}
                      value={x1}
                    />
                  </div>
                </div>
              ))}
              <div className="form-group">
                <label>Correct Answer</label>
                <select
                  name="correct_option"
                  className="form-control"
                  onChange={(e) => handleQuestionChange(e, idx1, idx2)}
                  value={x.correct_option}
                >
                  <option value="1">Answer #1</option>
                  <option value="2">Answer #2</option>
                  <option value="3">Answer #3</option>
                  <option value="4">Answer #4</option>
                </select>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-success m-2"
                    onClick={(e) => handleAddQuest(e, idx1)}
                  >
                    Add question
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={(e) => handleRemoveQuest(e, idx1, idx2)}
                  >
                    Remove question
                  </button>
                </div>
              </div>
            </>
          ))}

          <div className="d-flex">
            <button className="btn btn-success m-2" onClick={handleAddTopic}>
              Add Topic
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={(e) => handleRemoveTopic(e, idx1)}
            >
              Remove Topic
            </button>
          </div>
        </div>
      ))}
      <button onClick={submit} type="button" className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default AddCategory;
