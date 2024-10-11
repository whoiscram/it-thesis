import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { baseURL } from "../../../../config";
import "../css/profile.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

const AdminProfile = (props, defaltVal) => {
  const { data } = props;
  const [user, setUsers] = useState([]);
  const [password, showPassword] = useState({});
  const [confirmPassword, showConfirmationPassword] = useState({});
  const [inputs, setInputs] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonLabel, setButtonLabel] = useState("Edit");
  const [isVisible, setIsVisible] = useState(true);

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
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
  const handleClickShowPassword = () => {
    showPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const handleClickShowConfirmationPassword = () => {
    showConfirmationPassword({
      ...confirmPassword,
      showConfirmationPassword: !confirmPassword.showConfirmationPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    //setInputValue(defaultValue);
    setIsVisible(!isVisible);
    const url = baseURL + "CRUD.php?profile=" + data;
    // const url = "http://localhost/it-project-ini/php/CRUD.php?profile=" + data;
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error:"));
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handleEdit() {
    setIsDisabled(!isDisabled);
    setIsVisible(!isVisible);
    if (buttonLabel === "Edit") {
      setButtonLabel("Cancel");
    } else {
      setButtonLabel("Edit");
    }
  }

  function handleSave(event) {
    event.preventDefault();
    const formData = {
      userName: UserNameRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      newPassword: inputs.newPassword,
      userID: props.data,
    };
    if (inputs.oldPassword === user.password) {
      if (inputs.newPassword === input.confirmPassword) {
        axios
          .post(baseURL + "updateProfile.php", formData)
          /*   .post(
            "http://localhost/it-project-ini/php/updateProfile.php",
            formData 
          ) */ //dont remove yet
          .then(function (response) {
            window.alert("User added.");
            location.reload();
            console.log(response.data);
          });
      } else {
        window.alert("Please Check password and confirmation password");
      }
    } else {
      window.alert("Old Password Invalid");
    }
  }

  //default Values
  const [userName, setUsername] = useState(props.defaultUserName);
  const [firstName, setFirstname] = useState(props.defaultFirstName);
  const [lastname, setLastname] = useState(props.defaultLastName);
  const [email, setEmail] = useState(props.defaultEmail);
  const [phoneNumber, setPhonenumber] = useState(props.defaultPhoneNumber);
  // const [npassword, setNpassword] = useState(defaltVal.);

  //ref
  const UserNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const newPasswordRef = useRef();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhonenumber(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastname(event.target.value);
  };

  // const handleNewPasswordChange = (event) => {
  //   setNpassword(event.target.value);
  // };

  AdminProfile.defaultProps = {
    defaultUserName: user.userName,
    defaultFirstName: user.firstName,
    defaultLastName: user.lastName,
    defaultEmail: user.email,
    defaultPhoneNumber: user.phoneNumber,
    //defaultNewPassword: '',
  };

  console.log(props);

  return (
    <div className="admin-profile-container">
      <Helmet>
        <title>Admin-Profile - exported project</title>
        <meta property="og:title" content="Admin-Profile - exported project" />
      </Helmet>
      <div className="admin-profile-product-header">
        <label className="admin-profile-label">PROFILE</label>
      </div>
      <div className="admin-profile-container01">
        <div className="admin-profile-container02">
          <h1 className="admin-profile-text">{user.firstName}</h1>
          <h1 className="admin-profile-text01">{user.lastName}</h1>
        </div>
        <div className="admin-profile-container03">
          <span className="admin-profile-text02">{user.email}</span>
          <span className="admin-profile-text03">-</span>
          <span className="admin-profile-text03">{user.userType}</span>
        </div>
      </div>
      <div className="admin-profile-container04">
        <h1 className="admin-profile-text05">
          <span className="admin-profile-text06">Account</span>
          <br></br>
        </h1>
        <button className="button admin-profile-button1" onClick={handleEdit}>
          {buttonLabel}
        </button>
      </div>
      <div className="admin-profile-container05">
        <div className="admin-profile-container06">
          <form className="admin-profile-form" onSubmit={handleSave}>
            <div className="admin-profile-first-name">
              <label
                htmlFor="firstname"
                className="admin-profile-product-desc-label"
              >
                <span>Username</span>
                <br></br>
              </label>

              <input
                type="text"
                name="userName"
                required
                value={userName}
                disabled={isDisabled}
                onChange={handleUsernameChange}
                defaultValue={props.defaultUserName}
                ref={UserNameRef}
                className="admin-profile-product-name-input input"
              />
            </div>
            <div className="admin-profile-first-name">
              <label
                htmlFor="firstname"
                className="admin-profile-product-desc-label"
              >
                <span>First Name</span>
                <br></br>
              </label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                required
                value={firstName}
                disabled={isDisabled}
                onChange={handleFirstNameChange}
                defaultValue={props.defaultFirstName}
                ref={firstNameRef}
                className="admin-profile-product-name-input input"
              />
            </div>
            <div className="admin-profile-first-name">
              <label
                htmlFor="firstname"
                className="admin-profile-product-desc-label"
              >
                <span>Last Name</span>
                <br></br>
              </label>
              <input
                type="tel"
                id="lastname"
                name="lastname"
                required
                value={lastname}
                disabled={isDisabled}
                onChange={handleLastNameChange}
                defaultValue={props.defaultLastName}
                ref={lastNameRef}
                className="admin-profile-product-name-input input"
              />
            </div>
            <div className="admin-profile-first-name">
              <label
                htmlFor="firstname"
                className="admin-profile-product-desc-label"
              >
                <span>Email</span>
                <br></br>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                disabled={isDisabled}
                onChange={handleEmailChange}
                defaultValue={props.defaultEmail}
                ref={emailRef}
                placeholder="e.g. jdelacruz@gmail.com"
                className="admin-profile-product-name-input input"
              />
            </div>
            <div className="admin-profile-first-name">
              <label
                htmlFor="firstname"
                className="admin-profile-product-desc-label"
              >
                <span>Phone Number</span>
                <br></br>
              </label>
              <input
                type="number"
                id="phonenumber"
                name="phoneNumber"
                required
                value={phoneNumber}
                disabled={isDisabled}
                onChange={handlePhoneNumberChange}
                defaultValue={props.defaultPhoneNumber}
                ref={phoneNumberRef}
                placeholder="e.g. +639123456789"
                className="admin-profile-product-name-input input"
              />
            </div>

            <div className="admin-profile-first-name">
              {isVisible && (
                <div className="admin-profile-first-name" required>
                  <label
                    htmlFor="firstname"
                    className="admin-profile-product-desc-label"
                  >
                    <span>Old Password</span>
                    <br></br>
                  </label>

                  <Input
                    type={password.showPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    minLength="6"
                    required
                    onChange={handleChange}
                    disabled={isDisabled}
                    defaultValue={inputs.oldPassword}
                    onBlur={validateInput}
                    placeholder="must have at least 6 characters"
                    className="input-field input"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={isDisabled}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {password.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </div>
              )}
            </div>
            <div className="admin-profile-first-name">
              {isVisible && (
                <div className="admin-profile-first-name">
                  <label
                    htmlFor="firstname"
                    className="admin-profile-product-desc-label"
                  >
                    <span>New Password</span>
                    <br></br>
                  </label>
                  <Input
                    type={password.showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    minLength="6"
                    required
                    onChange={handleChange}
                    disabled={isDisabled}
                    defaultValue={inputs.newPassword}
                    // onChange={handleChange} //problem
                    onBlur={validateInput}
                    placeholder="must have at least 6 characters"
                    className="input-field input"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={isDisabled}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {password.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </div>
              )}
            </div>
            <div className="admin-profile-first-name">
              {isVisible && (
                <div className="admin-profile-first-name">
                  <label htmlFor="password">
                    <span>New Password Confirmation</span>
                    <br></br>
                  </label>
                  <Input
                    type={
                      confirmPassword.showConfirmationPassword
                        ? "text"
                        : "password"
                    }
                    id="confirmPassword"
                    name="confirmPassword"
                    minLength="6"
                    required
                    disabled={isDisabled}
                    value={
                      (confirmPassword.confirmPassword, input.confirmPassword)
                    }
                    placeholder="must have at least 6 characters"
                    className="input-field input"
                    onChange={(handleChange, onInputChange)}
                    onBlur={validateInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={isDisabled}
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
              )}
            </div>
            <button
              type="submit"
              className="button admin-profile-button"
              disabled={isDisabled}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
