import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import { BehaviorSubject } from 'rxjs';


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                authTokens || currentUserSubject.value ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{ pathname: "/login", state: { referer: props.location } }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;