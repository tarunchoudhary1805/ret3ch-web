import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

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
    if (
      blog.title.length > 0 &&
      blog.short_desc.length > 0 &&
      blog.desc.length > 0
    ) {
      props.handleEdit(blog);
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
            data={blog.desc}
          />
        </div>
        
        <button
          type="button"
          className="btn btn-success m-2"
          
          onClick={submit}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={props.cancel}
        >
          Cancel 
        </button>
      </form>
    </div>
  );
};

export default Edit;
