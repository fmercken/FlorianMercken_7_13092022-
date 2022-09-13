import { Exception } from "sass";
import axios from "axios";


const baseUrlApi = "http://localhost:3000";


 const api = {
    auth: {
        login: (email, password) => {

            return axios.post(baseUrlApi + '/api/auth/login', {
                email: email,
                password: password
              });
        },
        
        register: (email, password) => {

            const form = new FormData();
            form.append('email', email);
            form.append('password', password);

            return axios.post(baseUrlApi + '/api/auth/signup',{
                email: email,
                password: password
            });
           
        },
    },
    post: {
        create: (description, file) => {
            // récupérer le token depuis le localstorage
            const token = localStorage.getItem("token");
            if(!token) throw Exception('Erreur de token')
            
            const form = new FormData();
            form.append('description', description);
            form.append('image', file);

            let config = {
                headers: {
                    authorization: "brearer " + token,
                }
              }

            return axios.post(baseUrlApi + '/api/posts', 
                form,
                config
            );

        },
        getAll: () => {

                const token = localStorage.getItem("token");
                if(!token) throw Exception('Erreur de token')
 
             let config = {
                 headers: {
                     authorization: "brearer " + token,
                 }
               }
            return axios.get("http://localhost:3000/api/posts", config)
            
        },
        delete: (postId) => {
            const token = localStorage.getItem("token");
            if(!token) throw Exception('Erreur de token')

            let config = {
                headers: {
                    authorization: "brearer " + token,
                }
              }
           return axios.delete("http://localhost:3000/api/posts/" + postId, config)

        },
        update: (id, description, file) => {
            const token = localStorage.getItem("token");
            if(!token) throw Exception('Erreur de token')

            
            const form = new FormData();
            form.append('description', description);
            if(file) form.append('image', file);

            let config = {
                headers: {
                    authorization: "brearer " + token,
                }
              }

            return axios.put(baseUrlApi + '/api/posts/' + id, 
                form,
                config
            );
        },
        getById: (postId) => {

            const token = localStorage.getItem("token");
            if(!token) throw Exception('Erreur de token')

            let config = {
                headers: {
                    authorization: "brearer " + token,
                }
              }
           return axios.get("http://localhost:3000/api/posts/" + postId, config)
           
       },
        like: (postId, like) => {
            const token = localStorage.getItem("token");
             if(!token) throw Exception('Erreur de token')
 
             const form = new FormData();
            form.append('like',like ? "1" : "0")

             let config = {
                 headers: {
                     authorization: "brearer " + token,
                 }
               }
               return axios.post(baseUrlApi + '/api/posts/'+postId+'/like', 
                form,
                config
            );


        },
    }
}

export default api

