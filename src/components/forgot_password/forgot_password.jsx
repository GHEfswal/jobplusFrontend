import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import Alert from "../alert/alert";
import { useApi } from "../../hooks/useApi";
import authService from "../../services/AuthService";

export default function forgot_password() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const { post } = useApi();

  const { forgotPassword } = authService;

  // reset our state
  const handleSuccess = () => {
    setEmail("");

    // set success alert
    setAlert({
      type: "success",
      message: "Please check your email for further instructions",
    });
  };

  const handleError = (error) => {
    setAlert(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    await forgotPassword(email, handleSuccess, handleError);

    /*
    await post("auth/forgot-password", {
      data: { email },
      onSuccess: (res) => handleSuccess(),
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
