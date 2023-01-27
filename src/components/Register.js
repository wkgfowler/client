import {Fragment, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmitForm = async(e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/register', {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            permissions: 1
        })
        .then(() => {
            navigate('/')
        }, (error) => {
            console.log(error)
        });
    }

    return ( 
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" ref={emailRef} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" ref={passwordRef} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
}
 
export default Register;