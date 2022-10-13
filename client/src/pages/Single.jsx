import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import postAPI from "../api/postAPI";
import { AuthContext } from "../context/authContext";
import { POSTS } from "../data/globals";
import moment from "moment";
import { Images } from "../data/constants";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";

function Single(props) {
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const { id: postId } = useParams();

    const { currentUser } = useContext(AuthContext);

    //     useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await postAPI.getSinglePost()
    //         setPost(res.data);
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     };
    //     fetchData();
    //   }, [postId]);

    useEffect(() => {
        let data = POSTS.find((post) => post.id === parseInt(postId))
        setPost(data)
    }, [postId]);

    const handleDelete = async () => {
        try {
            await postAPI.deletePost(postId);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    {
                        post.userImg && <img src={post.userImg} alt="" />
                    }
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {/* {
                        currentUser.username === post.username && (
                            <div className="edit">
                                <Link to={`/write?edit=2`} state={post}><img src={Images.EDIT} alt="" /></Link>
                                <img onClick={handleDelete} src={Images.DELETE} alt="" />
                            </div>
                        )
                    } */}
                </div>
                <h1>{post.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}>
                </p>
            </div>
            <Menu cat={post.cat} />
        </div>
    );
}

export default Single;
