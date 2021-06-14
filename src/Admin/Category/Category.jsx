import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import CategoryAdd from "./CategoryAdd";
import EditCategory from "./EditCategory";
import { getCategorylistApi } from "../../apiList";

const Category = (props) => {
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState();
  const [category1, setCategory1] = useState();
  const [edit, setEdit] = useState();
  const [editId, setEditId] = useState();
  useEffect(() => {
    (async () => {
      setLoading(true);
      let response = await fetch(getCategorylistApi)
        .then((res) => res.json())
        .catch((err) => console.log(err));
      // console.log(response.data);
      setCategories(response.data);
      setLoading(false);
    })();
  }, []);
  const AddCategory = async (category) => {
    setLoading(true);
    const response = await fetch(getCategorylistApi, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    // console.log(response);
    setLoading(false);
    if (response.success === true) {
      const value = [...categories];
      value.push(response.data);
      setCategories(value);
      setShowAddCategory(false);
    }
  };
  const showTopic = (id) => {
    localStorage.setItem("categoryId", id);
    props.history.push("/topics");
  };

  const handleCateogryDelete = async (idx, id) => {
    setLoading(true);
    // console.log(id);
    const res = await fetch(getCategorylistApi + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (res.success === true) {
      const x = [...categories];
      x.splice(idx, 1);
      setCategories(x);
    }
    // console.log(res);
    setLoading(false);
  };

  const editCategory = async (data) => {
    // console.log(data);
    setLoading(true);
    const res = await fetch(getCategorylistApi + "/" + editId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (res.success === true) {
      const x = [...categories];
      x[i] = res.data;
      setCategories(x);
    }
    // console.log(res);
    setEdit(false);
    setLoading(false);
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
      {edit && (
        <EditCategory
          cancel={() => setEdit(!edit)}
          cat={category1}
          editCategory={(category) => editCategory(category)}
        />
      )}
      {!showAddCategory && !edit && (
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
                      className="btn btn-primary m-2"
                      onClick={() => showTopic(item._id)}
                    >
                      Show Topics
                    </button>
                    <div>
                      <button
                        className="btn btn-success m-2"
                        onClick={() => {
                          setEdit(true);
                          setCategory1(item);
                          setI(i);
                          setEditId(item._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => handleCateogryDelete(i, item._id)}
                      >
                        Delete
                      </button>
                    </div>
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
