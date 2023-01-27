import {Fragment, useRef, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RegisterRestaurant = () => {
    const [valid, setValid] = useState(true)

    const navigate = useNavigate();
    const {token} = useParams();
    

    useEffect(() => {
        validToken()
    }, [])

    const validToken = () => {
        axios.post('http://localhost:3000/auth/register/valid_token', {
                token
        })
        .then((response) => {
            console.log(response.data)
            setValid(response.data)
        }, (error) => {
            console.log(error)
        })
    }
    
    const restaurantNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmitForm = async(e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/register/restaurant_registration', {
            restaurant_name: restaurantNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then(() => {
            navigate('/')
        }, (error) => {
            console.log(error)
        });
    }

    if (valid) {
        return (
            <Fragment>
                <h1 className="text-center my-5">Register Your Restaurant</h1>
                <form onSubmit={onSubmitForm}>
                    <input type="text" name="restaurant_name" placeholder="Restaurant Name" className="form-control my-3" ref={restaurantNameRef} />
                    <input type="email" name="email" placeholder="email" className="form-control my-3" ref={emailRef} />
                    <input type="password" name="password" placeholder="password" className="form-control my-3" ref={passwordRef} />
                    <button className="btn btn-success btn-block">Submit</button>
                </form>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h4>Link Expired</h4>
            </Fragment>
        )
    }
}
 
export default RegisterRestaurant;