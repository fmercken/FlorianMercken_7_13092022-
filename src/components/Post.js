import React,{ useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom"

const Post = ({post, index, onLike}) => {
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin");
    const navigate = useNavigate();

    const onClickLike = () => {
        onLike(post._id, !post.usersLiked.includes(userId));
    };

    const onClickDelete = () => {
        api.post.delete(post._id).then((result) => {
            navigate("/");
        }) 
        .catch(() => {
            // alert("erreur")
        })
        .finally(() => {
            
        });
    };


    // on regarde dans la liste des users qui ont likés le post si l'utiliasteur courant y est
    const userLikedPost = post.usersLiked.includes(userId);
    const nbUsersLiked = post.usersLiked.length;

    const isAllowed = isAdmin == "true" || userId == post.userId


    return (
        <li classename = "card">
            <div className="form-3">
                <div><img className="form-2" src={post.imageUrl}  alt="Le poste d'un utilisateur"/></div>
                <div className='text-2'>{post.description}</div>
                <button className="font-1" type="button"  onClick={onClickLike}> Like ({nbUsersLiked})</button>
                {isAllowed ? <Link className="button-3"
                    to={{
                        pathname: "/Updatepost",
                        search: `?id=${post._id}`
                    }}>Modifier</Link>
                    : null}
                

                {isAllowed ? <button className="font-1" type="button"  onClick={onClickDelete} > Supprimer </button> : null}
            </div>
        </li>
    );
};

export default Post;
