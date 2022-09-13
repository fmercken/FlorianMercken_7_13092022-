import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Post from '../components/Post';
import api from '../services/api';



const Postusers = () => {
    const [data, setData] = useState ([])
    
    useEffect(()=>{
        api.post.getAll().then((res)=> setData (res.data));
    },[]);

    const onLike = (postId, like) => {
  
        api.post.like(postId, like)
        .then((result) => {
            // refresh post list
            api.post.getAll().then((res)=> setData (res.data));
        })
        .catch(() => {
        })
        .finally(() => {
        });
    };

    return (
        <div className="post">
            <ul>
                {data.map((postSchema, index) => (<Post key={index} post={postSchema} onLike={onLike}/>))}
            </ul>
        </div>
    );
};

export default Postusers;