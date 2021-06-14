import React, { useEffect, useState } from "react";
import AddTopic from "./AddTopic";
import EditTopic from "./EditTopic";
import { getTopiclistApi } from "../../../apiList";

const Topics = (props) => {
  const [topics, setTopics] = useState();
  const id = localStorage.getItem("categoryId");
  const [topicShow, setTopicShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState();
  const [topic1, setTopic1] = useState();
  const [edit, setEdit] = useState();
  const [editId, setEditId] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(getTopiclistApi + id)
        .then((res) => res.json())
        .catch((err) => console.log(err));
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

    const response = await fetch(getTopiclistApi, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (response?.success === true) {
      let value = [...topics];
      value.push(response.data);
      setTopics(value);
      setTopicShow(!topicShow);
      setLoading(false);
    }
  };

  const question = (id1) => {
    localStorage.setItem("topicId", id1);
    props.history.push("/questions");
  };

  const handleTopicDelete = async (idx, id) => {
    setLoading(true);
    const res = await fetch(getTopiclistApi + id, { method: "DELETE" })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (res.success === true) {
      const x = [...topics];
      x.splice(idx, 1);
      setTopics(x);
    }
    setLoading(false);
  };

  const editTopic = async (data) => {
    setLoading(true);
    const res = await fetch(getTopiclistApi + editId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (res.success === true) {
      const x1 = [...topics];
      x1[i] = res.data;
      setTopics(x1);
    }
    setEdit(false);
    setLoading(false);
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
      {edit && (
        <EditTopic
          top={topic1}
          id={id}
          cancel={() => setEdit(!edit)}
          editTopic={(topic) => editTopic(topic)}
        />
      )}
      {!topicShow && !edit && (
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
                <button
                  className="btn btn-success m-2"
                  onClick={() => {
                    setEdit(true);
                    setTopic1(item);
                    setI(idx1);
                    setEditId(item._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleTopicDelete(idx1, item._id)}
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

export default Topics;
