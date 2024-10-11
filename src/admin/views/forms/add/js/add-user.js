import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import "../css/add-user.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import {baseURL} from '../../../../../config'
const AddUser = (props) => {
  const options = ["Customer", "Store Manager"];

  const [password, showPassword] = useState({});

  const handleClickShowPassword = () => {
    showPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const [confirmPassword, showConfirmationPassword] = useState({});

  const handleClickShowConfirmationPassword = () => {
    showConfirmationPassword({
      ...confirmPassword,
      showConfirmationPassword: !confirmPassword.showConfirmationPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [inputs, setInputs] = useState({});

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    //setSelected(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password === inputs.confirmPassword) {
      console.log(inputs);
      axios.post(baseURL + "CRUD.php?add=", inputs).then(function (response) {
        console.log(response.data);
        window.alert("User Added");
        location.reload();
      });
    } else {
      window.alert("Please Check password and confirmation password");
    }
  };

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (
            inputs.confirmPassword &&
            value !== inputs.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirmation Password does not match.";
          } else {
            stateObj["confirmPassword"] = inputs.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (inputs.password && value !== inputs.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }
      return stateObj;
    });
  };

  return (
    <div className="add-user-container">
      <Helmet>
        <title>AddUser - exported project</title>
        <meta property="og:title" content="AddUser - exported project" />
      </Helmet>
      <div className="add-user-sub-container">
        <h1 className="add-user-header">Add New User</h1>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="label">
            <label htmlFor="usertype">
              <span className="requiredField">User Type</span>
              <br></br>
            </label>
            <select
              id="usertype"
              type="usertype"
              name="usertype"
              required
              className="input-field input"
              value={selected}
              //onChange={(event) => setSelected(event.target.value)}
              onChange={handleChange}
            >
              {options.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="label">
            <label htmlFor="username">
              <span>User Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              required
              placeholder="e.g. juanD"
              className="input-field input"
              onChange={handleChange}
            />
          </div>
          <div className="label">
            <label htmlFor="firstname">
              <span>First Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              required
              placeholder="e.g. Juan"
              className="input-field input"
              onChange={handleChange}
            />
          </div>
          <div className="label">
            <label htmlFor="lastname">
              <span>Last Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              placeholder="e.g. Dela Cruz"
              className="input-field input"
              onChange={handleChange}
            />
          </div>
          <div className="label">
            <label htmlFor="phoneNumber">
              <span>Phone Number</span>
              <br></br>
            </label>
            <input
              type="tel"
              id="phonenumber"
              name="phoneNumber"
              required
              placeholder="e.g. 09123456789"
              className="input-field input"
              pattern="[0]{1}[9]{1}[0-9]{9}"
              maxLength="11"
              onChange={handleChange}
            />
          </div>
          <div className="label">
            <label htmlFor="email">
              <span>Email</span>
              <br></br>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="e.g. jdelacruz@gmail.com"
              className="input-field input"
              onChange={handleChange}
            />
          </div>
          <div className="label">
            <label htmlFor="password">
              <span>Password</span>
              <br></br>
            </label>
            <Input
              type={password.showPassword ? "text" : "password"}
              id="password"
              name="password"
              minLength="6"
              required
              value={(password.password, inputs.password)}
              onChange={(handleChange, onInputChange)}
              onBlur={validateInput}
              placeholder="must have at least 6 characters"
              className="input-field input"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {error.password && <span className="err">{error.password}</span>}
          </div>
          <div className="label">
            <label htmlFor="password">
              <span>Confirm Password</span>
              <br></br>
            </label>
            <Input
              type={
                confirmPassword.showConfirmationPassword ? "text" : "password"
              }
              id="confirmPassword"
              name="confirmPassword"
              minLength="6"
              required
              value={(confirmPassword.confirmPassword, inputs.confirmPassword)}
              placeholder="must have at least 6 characters"
              className="input-field input"
              onChange={(handleChange, onInputChange)}
              onBlur={validateInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmationPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confirmPassword.showConfirmationPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="PasswordConfirmation"
            />
            {error.confirmPassword && (
              <span className="err">{error.confirmPassword}</span>
            )}
          </div>
          <button
            name="cancel"
            type="button"
            className="cancel-button button"
            onClick={props.handleClose}
          >
            Cancel
          </button>
          <button
            name="addUser"
            type="submit"
            className="save-button button"
            id="add-user"
          >
            <span className="admin-user-add-update-text13">
              <span>Add User</span>

              <br></br>
            </span>
          </button>
        </form>
      </div>
      {props.content}
    </div>
  );
};

export default AddUser;
