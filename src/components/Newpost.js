import React from 'react';
import api from '../services/api'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const Newpost = () => {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    let navigate = useNavigate();

    const onPost = () => {
        setLoading(true);
        api.post.create(description, file)
        .then(() => {
            navigate("/", { replace: true }); 
        })
        .catch(() => {
        })
        .finally(() => {
            setLoading(false)
        });
    };


    return (
        <div className="post">
            <form className="form-1">
                <div>
                    <textarea className="text-1" onChange={(toto) => setDescription(toto.target.value)}></textarea>
                </div>
                <div className="button-1">
                 <input type="file" onChange={(e) => setFile(e.target.files[0])}/> <label>Ajouter une photo</label>
                    <button type="button"  onClick={onPost}> Newpost </button>
                </div>
            </form>
        </div>
    );
};

export default Newpost;