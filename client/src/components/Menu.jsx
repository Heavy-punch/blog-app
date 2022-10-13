import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../api/postAPI";
import { POSTS } from "../data/globals";

function Menu({ cat }) {
    const [posts, setPosts] = useState(POSTS);
    const navigate = useNavigate();
    // fetch data for the first time 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await postAPI.getPostsByCat(cat)
    //             setPosts(res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }
    //     , [cat]);

    const handleReadmore = (post) => {
        navigate(`/post/${post?.id}`);
    };

    return (
        <div className="menu">
            <h1>other posts you may like</h1>
            {
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <img src={`../upload/${post?.img}`} alt="" />
                        <h2>{post.title}</h2>
                        <button onClick={() => handleReadmore(post)}>read more</button>
                    </div>
                ))
            }
        </div>
    );
}

export default Menu;
