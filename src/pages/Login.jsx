import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import './Login.css';  // Import the CSS file here

const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const res_login = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
            if (res_login.data.message === "Successfully login") {
                setAuth({
                    isAuthenticated: true,
                    user: res_login.data.user
                });

                localStorage.setItem('auth', JSON.stringify(res_login.data));

                // Redirect back to the intended page after successful login
                const intendedPath = localStorage.getItem('intendedPath') || '/';
                localStorage.removeItem('intendedPath');
                navigate(intendedPath);
            } else {
                alert(res_login.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error while login");
        }
    };

    return (
        <>
            <div className='login-container'>
                {/* <h1>Login</h1> */}
                <form onSubmit={handleSubmitLogin}>
                    <div className="form-group">
                        {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                            placeholder='Password'
                            id="exampleInputPassword1"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">
                        Sign in
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;
