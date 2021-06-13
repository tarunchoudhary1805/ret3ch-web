import React, { useEffect, useState } from "react";
import QuizAdd from "../../QuizComponents/QuizAdd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getQUizlistApi } from "../../apiList";
import Form from "../../QuizComponents/QuizAdd1";
import QuizEdit from "../../QuizComponents/QuizEdit";

const Quiz = () => {
  const [show, setShow] = useState(false);
  const [quizs, setQuizs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editQuiz, setEditQuiz] = useState(false);
  const [i, setI] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await fetch(getQUizlistApi)
        .then((res) => res.json())
        .catch((err) => console.log(err));
      console.log(response);
      if (response?.status === true) {
        setQuizs(response.data);
      }
      setLoading(false);
    })();
  }, []);
  console.log(quizs);

  const submit = async (quiz) => {
    console.log(quiz);
    setLoading(true);
    const data = await fetch(getQUizlistApi, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(quiz),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(data);
    console.log(quiz);
    if (data.success === true) {
      const value = [...quizs];
      value.push(data.data);
      setQuizs(value);
      toast.success("Quiz Added Successfully");
    } else {
      console.log(data.message);
    }
    setShow(!show);
    setLoading(false);
  };
  const handleDelete = async (i, id) => {
    setLoading(true);
    const v1 = await fetch(getQUizlistApi + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(v1);
    if (v1.success === true) {
      toast.success("Quiz Deleted");
      let x = [...quizs];
      x.splice(i, 1);
      setQuizs(x);
      setLoading(false);
    }
  };

  const handleEdit = async (quiz, e) => {
    console.log(quiz);
    setLoading(true);
    const response2 = await fetch(getQUizlistApi + "/" + editQuiz._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(quiz),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response2);
    console.log(quizs);
    const value = [...quizs];
    value[i] = response2.data;
    setQuizs(value);
    console.log(value);
    setLoading(false);

    setEdit(false);
  };

  return (
    <div className="container p-5 my-2 border">
      <ToastContainer />
      <h3 className="text-center">Quiz</h3>
      <div className="d-flex justify-content-end ">
        {!edit && (
          <button
            className="btn btn-success m-2"
            onClick={() => setShow(!show)}
          >
            {!show ? "Add Quiz" : "X"}
          </button>
        )}
      </div>
      <div className="text-center">
        {loading && (
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      {show && <Form submit={(quiz) => submit(quiz)} />}

      {edit && (
        <QuizEdit quiz={editQuiz} handleEdit={(quiz) => handleEdit(quiz)} />
      )}

      {!show && !edit && (
        <div>
          {quizs?.length === 0 && !loading && (
            <p className="text-center">No Quiz Available💔</p>
          )}
          {quizs?.map((item, i) => (
            <>
              <div className="d-flex justify-content-between">
                <div>
                  <h4>
                    {" "}
                    {i + 1}). {item.quiz_heading}
                  </h4>
                  <p>{item.short_desc}</p>
                </div>
                <div>
                  <button
                    className="btn btn-success m-2"
                    onClick={() => {
                      setEditQuiz(item);
                      setEdit(true);
                      setI(i);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => handleDelete(i, item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
