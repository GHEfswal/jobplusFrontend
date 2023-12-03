import React, { useState, useEffect } from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import Alert from "../alert/alert";
// import { useApi } from "../../hooks/useApi";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";

import authService from "../../services/AuthService";

export default function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState({});

  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState("");

  // console.log("phone number", phoneNumber);

  // const { post } = useApi();

  const { registerUser } = authService();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents entire page from reloading after trigerring Submit

    //check if password and confirm password match
    if (password !== confirmPassword) {
      setAlert({
        message: "Password and Confirm Password do not match",
        details: [],
      });
      return; //exit early
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      username: email,
    };

    const handleSuccess = () => {
      setFirstName("");
      setLastName("");
      setPhoneNumber();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAlert({
        message: "Account Created Successfully",
        details: [],
        type: "success",
      });
    };

    const handleError = (error) => {
      setAlert(error);
    };

    await registerUser(data, handleSuccess, handleError);

    /*

    await post("auth/local/register", {
      data: data,
      onSuccess: () => handleSuccess(),
      // onFailure: (error) => setAlert(error),
      onFailure: (error) => handleError(error),
    });

    */
  };

  const getUserLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      // console.log("location", response?.data);
      setCountry(response?.data?.country_code);
    } catch (e) {
      console.error;
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [country]);

  console.log(country);

  return (
    <>
      <Alert data={alert} />

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
          <label className="form__label">Phone Number</label>
          <PhoneInput
            className="PhoneInputInput"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            limitMaxLength={true}
            defaultCountry={country}
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
