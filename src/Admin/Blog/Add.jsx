import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

let data;

const Add = (props) => {
  const [blog, setBlog] = useState({
    title: "",
    short_desc: "",
    desc: "",
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (
      blog.title.length > 0 &&
      blog.short_desc.length > 0 &&
      blog.desc.length > 0
    ) {
      props.submit(blog);
      setBlog({
        title: "",
        short_desc: "",
        desc: "",
      });
    } else {
      toast.error("All Fields are required");
    }
  };

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
              setBlog({ ...blog, desc: data });
            }}
            name="desc"
            value={blog.desc}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
