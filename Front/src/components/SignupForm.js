import React from 'react';

const SignupForm = () => {
    const [email, setEmail] =useState ('')
    const [password, setPassword] =useState ('')

    const onSignup = () => {

     if (email = api.catch.email) throw Exception('Email déja enregistrer') 

        api.post.register(email, password)
        .then(() => {
            navigate("/Login", { replace: true }); 
        })
        .catch(() => {
        })
        .finally(() => {
        });

    }

    return (
        <div>
            
        </div>
    );
};

export default SignupForm;