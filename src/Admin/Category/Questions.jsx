import React, { useState, useEffect } from "react";
import { questionApi } from "../../apiList";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";

const Questions = (props) => {
  const [questions, setQuestions] = useState();
  const id = localStorage.getItem("topicId");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [i, setI] = useState();
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [questionEdit, setQuestionEdit] = useState();
  // console.log(id);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `${questionApi}/${id}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      // console.log(response);
      if (response?.status === true) {
        setQuestions(response?.data);
        setLoading(false);
      }
    })();
  }, []);
  // console.log("questions", questions);
  const addQuestion = async (questions1) => {
    setLoading(true);
    // console.log(questions1);
    const payload = {
      question_list: questions1,
    };
    // console.log(payload);
    const value = await fetch(
      `${questionApi}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    // console.log(value.data);
    if (value.success === true) {
      let value1 = [...questions];
      const value2 = value.data.forEach(myFun);
      function myFun(value11) {
        // console.log(value11, "value11");
        value1.push(value11);
      }
      // console.log(value1);
      setQuestions(value1);
      //   value.push(ret);
      setQuestions(value1);
    }
    setShow(!show);
    setLoading(false);
  };

  const handleDelete = async (idx, id) => {
    // console.log(id);
    setLoading(true);
    const response = await fetch(
      `${questionApi}/${id}`,
      { method: "DELETE" }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    // console.log(response);
    if (response.success === true) {
      let data = [...questions];
      data.splice(idx, 1);
      setQuestions(data);
    }
    setLoading(false);
  };


  const submitEdit = async (data1) => {
    setLoading(true);
    // console.log("parent child data ---->>>> ", JSON.stringify(data1));
    // console.log("editId ---->>>> ", editId);

    await fetch(
      `${questionApi}/${editId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data1),
      }
    )
      .then((res) => res.json())
      .then(result => {
        // console.log("edit response", result);
        if (result.success === true) {
          const x = [...questions];
          x[i] = result.data;
          setQuestions(x);
        }
        setEdit(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));

  };
  return (
    <div className="container border p-5">
      <h3 className="text-center">Questions</h3>
      {!edit && (
        <div className="d-flex justify-content-end">
          {!show ? (
            <button className="btn btn-success" onClick={() => setShow(!show)}>
              Add Question
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => setShow(!show)}>
              X
            </button>
          )}
        </div>
      )}
      {show && (
        <AddQuestion addQuestion={(questions) => addQuestion(questions)} />
      )}
      {edit && (
        <EditQuestion
          cancel={() => setEdit(!edit)}
          questionEdit={questionEdit}
          submitEdit={(data) => submitEdit(data)}
        />
      )}
      <div className="text-center">
        {loading && (
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {!show && !edit && (
        <div>
          {questions?.length === 0 && (
            <p className="text-center"> No Questions Available💔</p>
          )}
          {questions?.map((item, idx1) => (
            <div className=" d-flex justify-content-between m-2">
              <div className="w-50">
                <h6 className="">
                  {idx1 + 1}).
                  {item.question}
                </h6>
                <p>{item.answer}</p>
              </div>
              <div>
                <button
                  className="btn btn-success m-2"
                  onClick={() => {
                    setI(idx1);
                    setEdit(true);
                    setEditId(item._id);
                    setQuestionEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(idx1, item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
