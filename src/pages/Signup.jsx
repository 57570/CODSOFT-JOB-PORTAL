import React, { useState } from "react";
import toast from 'react-hot-toast';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password, phone, address });
            if (res && res.data.success) {
                toast.success("Successfully registered");
                navigate("/login");
            } else {
                toast.error("Already registered please Login");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Error in registration");
        }
    };

    return (
        <div className="register-container">
            <div className="register">

                <form onSubmit={handleSubmit}>
                    <div>
                        {/* <label htmlFor="name" className="form-label">Name</label> */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="phone" className="form-label">Phone Number</label> */}
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="phone"
                            placeholder="Phone number"
                            required
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="address" className="form-label">Address</label> */}
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="email" className="form-label">Email address</label> */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="password" className="form-label">Password</label> */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
