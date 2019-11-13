import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button, Error, Success } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import { BehaviorSubject } from 'rxjs';



const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccessful, setSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    // const referer = props.location.state.referer || '/';
    const referer = '/';

    function postLogin() {
        setSuccessful(false);
        setIsError(false);

        axios.post("https://localhost:5001/api/users/authenticate", {
            userName,
            password
        }).then(result => {
            if (result.status === 200) {
                setAuthTokens(result.data);
                setLoggedIn(true);

                localStorage.setItem('currentUser', JSON.stringify(result.data));
                currentUserSubject.next(result.data);

            } else {
                setIsError(true);
                setErrorMessage(result.data.message)
            }
        }).catch(e => {
            setIsError(true);
            setErrorMessage(e.response.data.message)
        });
    }

    function postRegister() {
        setSuccessful(false);
        setIsError(false);

        axios.post("https://localhost:5001/api/users/", {
            userName,
            password
        }).then(result => {
            if (result.status === 201) {
                setSuccessful(true);
            }
        }).catch(e => {
            setIsError(true);
            setErrorMessage(e.response.data.message)
        });
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
                <Button onClick={postRegister}>Register</Button>
            </Form>
            {/* <Link to="/signup">Don't have an account?</Link> */}
                {isError && <Error>{errorMessage}</Error>}
                {isSuccessful && <Success>User created</Success>}
        </Card>
    );
}

export default Login;