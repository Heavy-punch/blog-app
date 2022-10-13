import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import postAPI from "../api/postAPI";
import PostCard from "../components/PostCard";
import { POSTS } from "../data/globals";
import { getText } from "../utils/commons";

function Home(props) {
    const [posts, setPosts] = useState(POSTS);
    const cat = useLocation().search;

    // console.log(cat);

    //fetch

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await postAPI.getPostsByCat(cat);
    //             setPosts(response);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData()
    // }
    //     , [cat]);

    return (
        <div className="home">
            <div className="posts">
                {
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={`../upload/${post.img}`} alt="" />
                            </div>
                            <div className="content">
                                <Link to={`/post/${post.id}`}><h1 className="title">{post.title}</h1></Link>
                                <p>{getText(post.desc)}</p>
                                <button>Read More</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
