import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let data;
const Edit = (props) => {
  const [blog, setBlog] = useState({
    title: props.Blog.title,
    short_desc: props.Blog.short_desc,
    desc: props.Blog.desc,
  });
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const submit = () => {
    props.handleEdit(blog);
    setBlog({
      title: "",
      short_desc: "",
      desc: "",
    });
    data = "";
  };
  console.log(blog);
  return (
    <div className="container ">
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="title"
            value={blog.title}
          />
        </div>
        <div className="form-group">
          <label>Short Description</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="short_desc"
            value={blog.short_desc}
          />
        </div>

        <div className="form-group">
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              data = editor.getData();
              console.log(data);
              setBlog({ ...blog, desc: data });
            }}
            name="desc"
            data={blog.desc}
          />
        </div>
        
        <button
          type="button"
          className="btn btn-success"
          disabled={!blog.title}
          onClick={submit}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-success"
           
          onClick={submit}
        >
          Cancel Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
