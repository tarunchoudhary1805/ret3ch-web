import React, { useEffect, useState } from "react";
import QuizAdd from "../../QuizComponents/QuizAdd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quiz = () => {
  const [show, setShow] = useState(false);
  const [quizs, setQuizs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const response = await fetch("https://ret3ch.herokuapp.com/v1/quizlist")
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response);
    setQuizs(response.data);
    setLoading(false);
  }, []);
  console.log(quizs);

  const submit = async (quiz) => {
    console.log(quiz);
    setLoading(true);
    const data = await fetch("https://ret3ch.herokuapp.com/v1/quizlist", {
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
    const v1 = await fetch(`https://ret3ch.herokuapp.com/v1/quizlist/${id}`, {
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
  return (
    <div className="container p-5 my-2 border">
      <ToastContainer />
      <h3 className="text-center">Quiz</h3>
      <div className="d-flex justify-content-end ">
        <button className="btn btn-success m-2" onClick={() => setShow(!show)}>
          {!show ? "Add Quiz" : "X"}
        </button>
      </div>
      <div className="text-center">
        {loading && (
          <div class="spinner-border text-center" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {show && <QuizAdd submit={(quiz) => submit(quiz)} />}

      {!show && (
        <div>
          {quizs?.length === 0 && (
            <p className="text-center">No Quiz Available💔</p>
          )}
          {quizs?.map((item, i) => (
            <>
              <div className="d-flex justify-content-between">
                <h3>
                  {" "}
                  {i + 1}). {item.quiz_heading}
                </h3>
                <div>
                  <button className="btn btn-success m-2">Edit</button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => handleDelete(i, item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {item?.question_list.map((ques, i) => (
                <>
                  <p>
                    {i + 1}). {ques.question}
                  </p>
                  {console.log("dd", ques.correct_option)}
                  {ques.quiz_options.map((x, i) => (
                    <p>
                      {" "}
                      {ques.correct_option == i ? (
                        <p className="bg-success text-white">{x}</p>
                      ) : (
                        <p className="bg-secondary">{x}</p>
                      )}
                    </p>
                  ))}
                </>
              ))}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
