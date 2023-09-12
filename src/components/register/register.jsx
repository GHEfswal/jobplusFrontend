import React, { useState } from "react";
import axios from "axios";
import "../styles/form.scss";
import { Link } from "react-router-dom";

export default function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents entire page from reloading after trigerring Submit
    console.log("Submitted Successfully");
    console.log("");
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      username: email,
    };

    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        data
      );
      console.log(res);

      //clear form

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return (
    <form className="form form--page" onSubmit={(e) => handleSubmit(e)}>
      <div className="form__group form__group--page">
        <label className="form__label">First Name</label>
        <input
          className="form__field"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Last Name</label>
        <input
          className="form__field"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

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
        <label className="form__label">Choose Password</label>
        <input
          className="form__field"
          type="password"
          placeholder="Choose password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Confirm Password</label>
        <input
          className="form__field"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <input className="form__btn" type="submit" value="Register" />
      </div>

      <footer>
        Already have an account? <Link to="/login">Login</Link>
      </footer>
    </form>
  );
}
