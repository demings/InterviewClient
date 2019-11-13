import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


function Home(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);

    window.location.reload();
  }

  return (
    <div>
      <div>Home Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Home;