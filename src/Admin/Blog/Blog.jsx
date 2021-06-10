import React, { useState, useEffect } from "react";
import Add from "./Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { getBloglistApi } from "../../apiList";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editBlog, setEditBlog] = useState();
  const [show, setShow] = useState(false);
  const [i, setI] = useState();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await fetch(getBloglistApi)
        .then((res) => res.json())
        .catch((err) => console.log(err));
      console.log(response);
      if (response?.status === true) {
        setBlogs(response.data);
      }
      setLoading(false);
    })();
  }, []);
  const submit = async (blog) => {
    setLoading(true);
    const response1 = await fetch(getBloglistApi, {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response1);
    if (response1.success === true) {
      const data = [...blogs];
      data.push(response1.data);
      setBlogs(data);
      console.log("data", data);
    } else {
      console.log(response1.message);
    }
    setLoading(false);
    setShow(!show);
  };
  const handleDelete = async (i, id) => {
    console.log(i, id);
    setLoading(true);
    console.log(getBloglistApi + id);
    const response2 = await fetch(getBloglistApi + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response2);
    if (response2.success === true) {
      const d1 = [...blogs];
      d1.splice(i, 1);
      setBlogs(d1);
    }
    setLoading(false);
  };

  const handleEdit = async (blog, e) => {
    console.log(blog);
    setLoading(true);
    const response2 = await fetch(
      `https://ret3ch.herokuapp.com/v1/bloglist/${editBlog._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(blog),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response2);
    console.log(blogs);
    const value = [...blogs];
    value[i] = response2.data;
    setBlogs(value);
    console.log(value);
    setLoading(false);

    setEdit(false);
  };

  console.log(blogs);
  return (
    <div className="container border p-2">
      <ToastContainer />
      <h4 className="text-center">Blogs</h4>
      <div className="d-flex justify-content-end">
        {!edit && (
          <button className="btn btn-primary" onClick={() => setShow(!show)}>
            {show ? "X" : "Add Blog"}
          </button>
        )}
      </div>

      {show && <Add submit={(blog) => submit(blog)} />}
      <br />
      <br />
      {edit && <Edit Blog={editBlog}   handleEdit={(blog) => handleEdit(blog)} />}
      <div>
        <div className="text-center">
          {loading && (
            <div className="spinner-border text-center" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>

        {!show && !edit && (
          <ol>
            {blogs?.map((blog, i) => (
              <div key={blog._id} className="d-flex justify-content-between container my-2">
                <li key={blog._id}>{blog.title}</li>
                <div className="d-flex">
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => {
                      setEditBlog(blog);
                      setEdit(true);
                      setI(i);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(i, blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Blog;
