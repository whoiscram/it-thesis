import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { Helmet } from "react-helmet";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import phil, { provinces } from "phil-reg-prov-mun-brgy";
import "../css/sign-up.css";
import { baseURL } from "../../../config";
const SignUp = (props) => {
  const options = ["Customer", "Store Manager"];
  let history = useHistory();
  const [password, showPassword] = useState({});
  //get Region List from import phil.regions
  const regionList = phil.regions;
  // set state of region
  const [region, setRegion] = useState();
  // set state of province
  const [province, setProvince] = useState();
  // set state for city
  const [city, setCity] = useState();
  // set state for Barangay
  const [barangay, setBarangay] = useState();
  // get provincesByRegion
  const provinces = phil?.getProvincesByRegion(region?.[0]);
  //get cities by region
  const cities = phil.getCityMunByProvince(province?.[0]);
  //get barnagay by region
  const brgy = phil.getBarangayByMun(city?.[0]);
  const [confirmPassword, showConfirmationPassword] = useState({});

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

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    //setSelected(event.target.value);
  };

  const handleSubmit = (event) => {
    let tries = 3;
    const formData = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      userName: inputs.userName,
      email: inputs.email,
      phoneNumber: inputs.phoneNumber,
      password: inputs.password,
      street: inputs.street,
      postalCode: inputs.pCode,
      Region: region,
      Province: province,
      City: city,
      Barangay: barangay,
      houseNumber: inputs.houseNumber,
    };

    const emailsend = inputs.email;
    event.preventDefault();
    if (inputs.password === inputs.confirmPassword) {
      window.alert("We Have sent an OTP to your email:", { emailsend });
      axios
        .post(
          baseURL + `registerOTP.php?email=${emailsend}` // updare to baseUrl
        )
        .then((response) => {
          console.log(response.data);
          while (tries > 0) {
            const onetimep = Number(window.prompt("Please Enter OTP", ""));
            if (onetimep === response.data) {
              return axios.post(baseURL + `sign-up.php`, formData); //updare to baseUrl
            } else {
              tries--;
              window.alert(
                `The OTP entered is not correct. You have ${tries} tries left.`
              );
            }
          }
          window.alert(
            "You have exceeded the maximum number of tries. OTP validation failed."
          );
          location.reload();
        })

        .then((response) => {
          window.alert("Successfully Created Your Account");
          history.push("/log-in");
        })

        .catch((error) => {
          console.log(error);
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

  //handles Delivery Options
  function handleRegion(data) {
    const split = data.target.value;
    setRegion(split.split(","));
  }
  //handles Province List
  const handleProvince = (data) => {
    const split = data.target.value;
    return setProvince(split.split(","));
  };

  //handles City
  function handleCity(data) {
    const split = data.target.value;
    return setCity(split.split(","));
  }

  //handles Barangay
  function handleBarangay(data) {
    return setBarangay(data.target.value);
  }

  const listRegion = Object.entries(regionList).map(([key, value]) => (
    <option value={value.reg_code + "," + value.name}>{value.name}</option>
  ));
  //list Province
  const listProvince = Object.entries(provinces).map(([key, value]) => (
    <option value={value.prov_code + "," + value.name}>{value.name}</option>
  ));
  //list cities
  const listCities = Object.entries(cities).map(([key, value]) => (
    <option value={value.mun_code + "," + value.name}>{value.name}</option>
  ));
  const listBarangay = Object.entries(brgy).map(([key, value]) => (
    <option value={value.name}>{value.name}</option>
  ));

  return (
    <div className="sign-up-container">
      <Helmet>
        <title>Sign Up</title>
        <meta property="og:title" content="Sign-Up - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name3"></Header>
      <div className="sign-up-container01">
        <h1 className="sign-up-text">Create An Account</h1>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="sign-up-container02">
            <span className="sign-up-text01">
              <span>Full Name:</span>
              <span className="sign-up-text03">*</span>
            </span>
            <div className="sign-up-container03">
              <span className="sign-up-text04">First Name</span>
              <input
                type="text"
                name="firstName"
                id="firstname"
                required
                placeholder="First Name"
                className="sign-up-textinput input"
                onChange={handleChange}
              />
            </div>
            <div className="sign-up-container04">
              <span className="sign-up-text05">
                <span>Last Name</span>
                <br></br>
              </span>
              <input
                name="lastName"
                id="lastname"
                type="text"
                required
                placeholder="Last Name"
                className="lastname-input input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sign-up-container05">
            <span className="sign-up-text08">
              <span>Username:</span>
              <span className="sign-up-text10">*</span>
            </span>
            <input
              type="text"
              className="input"
              name="userName"
              id="userName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-container06">
            <span className="sign-up-text11">
              <span>Email:</span>
              <span className="sign-up-text13">*</span>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="ex: myname@email.com"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-container07">
            <span className="sign-up-text14">
              <span>Phone Number:</span>
              <span className="sign-up-text16">*</span>
            </span>
            <input
              type="text"
              className="input"
              name="phoneNumber"
              id="phoneNumber"
              required
              onChange={handleChange}
            />
          </div>
          <div className="sign-up-container08">
            <span className="sign-up-text17">
              <span>Password:</span>
              <span className="sign-up-text19">*</span>
            </span>
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
          </div>
          <div className="sign-up-container09">
            <span className="sign-up-text20">
              <span>Re-enter Password:</span>
              <span className="sign-up-text22">*</span>
            </span>
            {/* <input type="password" className="input" /> */}
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
          <div className="admin-order-add-container19">
            <div className="admin-order-add-container20">
              <label htmlFor="price">
                <span>Region</span>
                <br></br>
              </label>
              <select
                className="admin-order-add-select"
                name="region"
                value={region}
                required
                // onChange={addObjectToAddress}
                // onChange={handleRegion}
                onChange={handleRegion}
              >
                {listRegion}
              </select>
            </div>
          </div>
          <div className="admin-order-add-container21">
            <div className="admin-order-add-container22">
              <label htmlFor="stock" className="admin-order-add-province-label">
                <span>Province</span>
                <br></br>
              </label>
              <select
                className="admin-order-add-select1"
                name="province"
                required
                onChange={handleProvince}
                value={province}
              >
                {listProvince}
              </select>
            </div>
            <div className="admin-order-add-container23">
              <label htmlFor="price">
                <span>City</span>
                <br></br>
              </label>
              <select
                className="admin-order-add-select2"
                name="city"
                required
                value={city}
                onChange={handleCity}
              >
                {listCities}
              </select>
            </div>
            <div className="admin-order-add-container24">
              <label htmlFor="stock" className="admin-order-add-postal-label">
                <span>Postal Code</span>
                <br></br>
              </label>
              <input
                type="number"
                name="pCode"
                required
                placeholder="1800"
                className="admin-order-add-postal-input input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="admin-order-add-container25">
            <div className="admin-order-add-container26">
              <label htmlFor="sku" className="admin-order-add-sku-label">
                <span>Barangay</span>
                <br></br>
              </label>
              <select
                className="admin-order-add-select3"
                name="barangay"
                onChange={handleBarangay}
                value={barangay}
              >
                {listBarangay}
              </select>
            </div>
            <div className="admin-order-add-container27">
              <label htmlFor="price">
                <span>Street</span>
                <br></br>
              </label>
              <input
                type="text"
                id="street"
                name="street" // ₱ Price
                //enctype="₱ Price"
                required
                placeholder="Quirino Highway"
                className="admin-order-add-price input"
                onChange={handleChange}
              />
            </div>
            <div className="admin-order-add-container28">
              <label htmlFor="stock" className="admin-order-add-stock-label">
                <span>House No.</span>
                <br></br>
              </label>
              <input
                type="number"
                id="houseNumber"
                name="houseNumber"
                required
                placeholder="362"
                className="admin-order-add-stock input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sign-up-container10">
            <Link to="/log-in" className="sign-up-navlink button">
              CANCEL
            </Link>
            <button className="sign-up-button button" onSubmit={handleSubmit}>
              CREATE ACCOUNT
            </button>
          </div>
        </form>
      </div>
      <Footer rootClassName="footer-root-class-name3"></Footer>
    </div>
  );
};

export default SignUp;
