import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import CategoryAdd from "./CategoryAdd";

const Category = (props) => {
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      let response = await fetch("https://ret3ch.herokuapp.com/v1/lang_list")
        .then((res) => res.json())
        .catch((err) => console.log(err));
      console.log(response.data);
      setCategories(response.data);
      setLoading(false);
    })();
  }, []);
  const AddCategory = async (category) => {
    setLoading(true);
    const response = await fetch("https://ret3ch.herokuapp.com/v1/lang_list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response);
    setLoading(false);
    if (response.success === true) {
      const value = [...categories];
      value.push(response.data);
      setCategories(value);
      setShowAddCategory(false);
    }
  };
  const showTopic = (id) => {
    localStorage.setItem("categoryId",id);
    props.history.push("/topics");
  };

  return (
    <div className="container p-5 border">
      <h3 className="text-center">Category</h3>
      <div className="justify-content-end d-flex m-2">
        <button
          className="btn btn-success"
          onClick={() => setShowAddCategory(!showAddCategory)}
        >
          {" "}
          Add Category
        </button>{" "}
      </div>
      <div className="text-center">
        {loading && (
          <div class="spinner-border text-center" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {showAddCategory && (
        <CategoryAdd AddCategory={(category) => AddCategory(category)} />
      )}
      {!showAddCategory && (
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gridGap: "30px",
          }}
        >
          {categories?.map((item, i) => (
            <div className="row">
              <div className="col-sm-12 text-center ">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>

                    <button
                      href="#"
                      className="btn btn-primary"
                      onClick={() => showTopic(item._id)}
                    >
                      Show Topics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
