import React from 'react';
import api from '../services/api'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

    const Postupdate = () => {
        const [loading, setLoading] = useState(false);
        const [description, setDescription] = useState();
        const [file, setFile] = useState();
        const [fileUrl, setFileUrl] = useState();
        let navigate = useNavigate()
        let [searchParams] = useSearchParams();
        const postId = searchParams.get("id");
        const isAdmin = localStorage.getItem("isAdmin");
        const userId = localStorage.getItem("userId");

        useEffect(()=>{
            
            api.post.getById(postId).then((post)=> {
               
                if(isAdmin == "true" || userId == post.data.userId)
                {
                    setDescription(post.data.description);
                    setFileUrl(post.data.imageUrl);
                }
                else
                {
                    alert("Vous n'avez pas les permissions de modifier ce post");
                    navigate("/", { replace: true }); 
                }
            });
        },[]);

        const onUpdate = () => {
            setLoading(true);
            api.post.update(postId, description, file,isAdmin)
            .then(() => {
                navigate("/", { replace: true }); 
            })
            .catch(() => {
            })
            .finally(() => {
                setLoading(false)
            });
        }

        return (
            <div className="post">
                <form className="form-1">
                    <div><div><label for ="description">Zone du texte pour la création de post</label></div> 
                    <textarea id="description" className="text-1" value={description} onChange={(toto) => setDescription(toto.target.value)}></textarea>
                    </div>
                    <div className="button-2"> 
                        {fileUrl && <img alt="image a modifier" src={fileUrl} width="200" />}
                        <div><label for ="images">choisir une photo</label></div>
                 <input id="images" type="file" onChange={(e) => setFile(e.target.files[0])}/>
                        <button type="button"  onClick={onUpdate}> Modifier</button>
                    </div>
                    {loading && <span>Chargement en cours ....</span>}
                </form>
            </div>
        );
    };


    

    

export default Postupdate;