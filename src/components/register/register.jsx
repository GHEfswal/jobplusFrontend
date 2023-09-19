import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseErrors } from "../../utils/parseErrors";
import Alert from "../alert/alert";

export default function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents entire page from reloading after trigerring Submit
    /*
    console.log("Submitted Successfully");
    console.log("");
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);
*/
    //check if password and confirm password match
    if (password !== confirmPassword) {
      setAlert({
        message: "Password and Confirm Password do not match",
        details: [],
      });
      return; //ecit early
    }

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

      //clear form happens after submit is successful

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAlert({
        message: "Account Created Successfully",
        details: [],
        type: "success",
      });
    } catch (error) {
      // console.error("Error in posting data", error);
      // console.error("Error in posting data", error.response.data.error);
      // console.log(parseErrors(error));
      setAlert(parseErrors(error));
      // console.log(error);
    }
  };

  return (
    <>
      <Alert /*type="error"*/ data={alert} />

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
    </>
  );
}
