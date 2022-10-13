import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import postAPI from "../api/postAPI";
import moment from "moment";

function Write(props) {
    const { state } = useLocation();
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file)
            const res = await postAPI.uploadImage();
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (e) => {
        e.prevenDefault();
        const imgUrl = await upload();

        try {
            state ?
                await postAPI.updatePost({
                    id: state?.id,
                    body: {
                        title,
                        desc: value,
                        cat,
                        img: file ? imgUrl : "",
                    }
                })
                : await postAPI.createPost({
                    title,
                    desc: value,
                    cat,
                    img: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="add">
            <div className="Content">
                <input
                    type="text"
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="editor-container">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>publish</h1>
                    <span><b>Status :</b>Draft</span>
                    <span><b>Visibility :</b>Public</span>
                    <input
                        type="file"
                        id="file"
                        name=""
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">upload image</label>
                    <div className="button">
                        <button>save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            checked={cat === "art"}
                            value="art"
                            id="art"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="science">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            checked={cat === "science"}
                            value="science"
                            id="science"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            checked={cat === "technology"}
                            value="technology"
                            id="technology"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            checked={cat === "cinema"}
                            value="cinema"
                            id="cinema"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            checked={cat === "design"}
                            value="design"
                            id="design"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            checked={cat === "food"}
                            value="food"
                            id="food"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;
