import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import Alert from "../alert/alert";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../contexts/AuthContext";
import { useCookie } from "../../hooks/useCookie";
import authService from "../../services/AuthService";

export default function login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setIsAuthenticated } = useAuth();

  const { saveAuthCookie } = useCookie();

  const navigate = useNavigate();
  const { post } = useApi();

  const { loginUser } = authService();

  const handleSuccess = (res) => {
    saveAuthCookie(res.data.jwt);

    // reset out state
    setIdentifier("");
    setPassword("");
    // set the authenticated state to true
    setIsAuthenticated(true);

    // navigate to homepage
    navigate("/");
  };

  const handleError = (error) => {
    setAlert(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    await loginUser({ identifier, password }, handleSuccess, handleError);

    /*

    await post("auth/local", {
      // data: data,
      data: { identifier, password },
      onSuccess: (res) => handleSuccess(res), // this line is called a callback
      onFailure: (error) => setAlert(error),
    });

    */
  };

  return (
    <>
      <Alert data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="text"
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Don't have an account? <Link to="/register">Register</Link>
          or <Link to="/forgot-password">Forgot Password</Link>
        </footer>
      </form>
    </>
  );
}
