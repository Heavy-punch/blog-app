import React from 'react';
import { Link } from 'react-router-dom';
import { getText } from '../utils/commons';

function PostCard(props) {
    const { post } = props;
    return (
        <div>
            <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
                <Link to={`/post/${post.id}`}><h1 className="title">{post.title}</h1></Link>
                <p>{getText(post.desc)}</p>
                <button>Read More</button>
            </div>
        </div>
    );
}

export default PostCard;