import React, { useEffect, useState } from "react";
import AddTopic from "./AddTopic";

const Topics = (props) => {
  const [topics, setTopics] = useState();
  const id = localStorage.getItem("categoryId");
  const [topicShow, setTopicShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        "https://ret3ch.herokuapp.com/v1/topic_list/" + id
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      console.log(response);
      setTopics(response.data);
      setLoading(false);
    })();
  }, []);
  const topicSubmit = async (topic) => {
    setLoading(true);
    const payload = {
      title: topic.title,
      description: topic.description,
      language_id: id,
    };
    const response = await fetch(
      "https://ret3ch.herokuapp.com/v1/topic_list/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response?.data);
    if (response?.success === true) {
      let value = [...topics];
      value.push(response.data);
      setTopics(value);
      setTopicShow(!topicShow);
      setLoading(false);
    }
  };

  const question = (id1) => {
    console.log(id1);
    localStorage.setItem("topicId", id1);
    props.history.push("/questions");
  };

  return (
    <div className="container border p-5">
      <h3 className="text-center">Topics</h3>
      <div className="d-flex justify-content-end">
        {topicShow ? (
          <button
            className="btn btn-danger m-2"
            onClick={() => setTopicShow(!topicShow)}
          >
            X
          </button>
        ) : (
          <button
            className="btn btn-success m-2"
            onClick={() => setTopicShow(!topicShow)}
          >
            Add Topic
          </button>
        )}
      </div>
      <div className="text-center">
        {loading && (
          <div class="spinner-border text-center" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {topicShow && <AddTopic topicSubmit={(topic) => topicSubmit(topic)} />}
      {!topicShow && (
        <div>
          {topics?.length === 0 && (
            <p className="text-center">No Topics Available💔</p>
          )}
          {topics?.map((item, idx1) => (
            <div className="d-flex justify-content-between">
              <div>
                {" "}
                <h5>
                  {idx1 + 1}). {item.title}
                </h5>
                <p>{item.description}</p>
              </div>
              <div className="">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => question(item._id)}
                >
                  questions
                </button>
                {/* <button className="btn btn-success m-2">Edit</button>
                <button className="btn btn-danger m-2">Delete</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topics;
