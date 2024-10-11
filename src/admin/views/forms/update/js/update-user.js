import React, { useEffect, useState } from "react";
import {baseURL} from '../../../../../config'
import { Helmet } from "react-helmet";

import "../css/update-user.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import axios from "axios";

const UpdateUser = (props) => {
  const [password, showPassword] = useState({});
  const options = ["Customer", "Store Manager"];

  const [inputs, setInputs] = useState({});
  const [selected, setSelected] = useState(options[0].value);
  const { data } = props;
  const rowID = data[1];

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setSelected(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password === input.confirmPassword) {
      axios
        .post(`${baseURL}CRUD.php?updateUser=${rowID}`, inputs)
        .then(function (response) {
          console.log(response.data);
          window.alert("User Updated");
          location.reload();
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } else {
      window.alert("Please Check password and confirmation password");
    }
  };

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

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  console.log(inputs);
  console.log(selected);

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
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
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirmation Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
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
    <div className="update-user-container">
      <Helmet>
        <title>UpdateUser - exported project</title>
        <meta property="og:title" content="UpdateUser - exported project" />
      </Helmet>
      <div className="update-user-sub-container">
        <h1 className="update-user-header">Update New User</h1>
        <form className="update-user-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usertype">
              <span>User Type</span>
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
          <div>
            <label htmlFor="username">
              <span>User Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              required
              defaultValue={data[0]}
              className="input-field input"
              disabled
            />
          </div>
          <div>
            <label htmlFor="firstname">
              <span>First Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              required
              defaultValue={data[3]}
              onChange={handleChange}
              className="input-field input"
            />
          </div>
          <div>
            <label htmlFor="lastname">
              <span>Last Name</span>
              <br></br>
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              defaultValue={data[4]}
              onChange={handleChange}
              className="input-field input"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">
              <span>Phone Number</span>
              <br></br>
            </label>
            <input
              type="tel"
              id="phonenumber"
              name="phoneNumber"
              required
              maxLength="11"
              defaultValue={data[6]}
              className="input-field input"
              pattern="[0]{1}[9]{1}[0-9]{9}"
            />
          </div>
          <div>
            <label htmlFor="email">
              <span>Email</span>
              <br></br>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              color="#a6a6a6"
              defaultValue={data[5]}
              className="input-field input"
              disabled
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
              value={inputs.password}
              onChange={handleChange} //problem
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
              value={(confirmPassword.confirmPassword, input.confirmPassword)}
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
          <button name="addUser" type="submit" className="update-button button">
            <span className="admin-user-update-update-text13">
              <span>Update User</span>
              <br></br>
            </span>
          </button>
        </form>
      </div>
      {props.content}
    </div>
  );
};

export default UpdateUser;
