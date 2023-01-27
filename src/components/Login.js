import React, { Fragment, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import { PermissionContext } from "../context/PermissionContext";

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const {permission, setPermission} = useContext(PermissionContext)

    const navigate = useNavigate();
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/login', {
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
            setPermission(response.data.user.permissions)
            navigate('/')
        }, (error) => {
            console.log(error)
        })
    };


    return (
        <Fragment>
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Email" ref={emailRef} />
                <input type="password" name="password" placeholder="Password" ref={passwordRef} />
                <button>Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
      );
}


export default Login;