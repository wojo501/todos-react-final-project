import { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";

function HomePage(){
const [currentForm, setCurrentForm] = useState('login');

return (
        <div>
        {currentForm === "login" ? <LoginPage/> : <RegisterPage/>}
        </div>
);
}

export default HomePage;