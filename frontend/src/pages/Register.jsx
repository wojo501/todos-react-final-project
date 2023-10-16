import React, { useState} from "react";
import classes from "./Home.module.css";
import { Form, json, redirect, useActionData, useNavigate } from "react-router-dom";

export const RegisterPage = (props) => {
    const data = useActionData();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function navigateHandler(){
        navigate('/login');
    }

    return (
    <div className={classes.Home}>
        <div className={classes['auth-form-container']}>
            {data && data.message && <p>{data.message}</p>}
            <h2>Register</h2>
            <Form method="POST" action="/register" className={classes['register-form']}>
                <label htmlFor="name">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" name="name" required/>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>
                <button type="submit">Register</button>
            </Form>
            <button className={classes['link-btn']} onClick={navigateHandler}>Already have an account? Login here.</button>
        </div>
    </div>
    )
}

export default RegisterPage;
export async function action({request, params}){
    const backend = "https://fair-teddy-bear.cyclic.app";

    const data = await request.formData();
  
    const registerData = {
        id: Math.random(),
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password")
    }
  
    const response = await fetch(`${backend}/app/registerUser`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(registerData)
    });

    if (response.status === 423){
        return response;
    }
  
    if(!response.ok){
      throw json({message: 'Could not loggin'}, {status: 500})
    }
    const responseData = await response.json();
    const userId = responseData.userId;
    return redirect(`/${userId}`);
}

