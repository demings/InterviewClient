import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContext } from "./context/auth";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;