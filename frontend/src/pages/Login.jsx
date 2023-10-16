import { useState } from "react";
import classes from "./Home.module.css";
import { Form, json, redirect, useActionData, useNavigate } from "react-router-dom";

export const LoginPage = (props) => {
    const data = useActionData();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function navigateHandler(){
        navigate('/register');
    }

    return (
    <div className={classes.Home}>
        <div className={classes["auth-form-container"]}>
            {data && data.message && <p>{data.message}</p>}
            <h2>Login</h2>
            <Form method="POST" action="/login" className={classes["login-form"]}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>
                <button type="submit">Log In</button>
            </Form>
            <button className={classes["link-btn"]} onClick={navigateHandler}>Don't have an account? Register here.</button>
        </div>
    </div>
    );
}

export default LoginPage;

export async function action({request, params}){
    const data = await request.formData();
    const backend = "https://fair-teddy-bear.cyclic.app";
  
    const registerData = {
      email: data.get("email"),
      password: data.get("password")
    }
  
    const response = await fetch(`${backend}/app/loginUser`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(registerData)
    });
  
    if (response.status === 422){
        return response;
    }
    if(!response.ok){
      throw json({message: 'Could not loggin'}, {status: 500})
    }

    const responseData = await response.json();
    const userId = responseData.userId;
    return redirect(`/${userId}`);
}
