import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ProductDetails from "../views/js/ProductDetails";
import { Link } from "react-router-dom";

const Format = (props) => {
  let history = useHistory();

  // Handles redirection and passing of Data
  const handleButton = () => {
    // setData(props.data);
    const productData = props.data;
    history.push({
      pathname: "/product-details",
    });

    localStorage.setItem("productData", JSON.stringify(productData));
  };

  return (
    <Card sx={{ maxWidth: "10rem", m: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          value={props.data.productID}
          image={props.data.imageSource}
          loading="lazy"
          //image="/products/AthenaBag_Black.jpg"
          //alt={props.data.productDesc}
          alignment="center"
          onClick={handleButton}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="inherit"
            component="div"
            align="left"
          >
            {props.data.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₱{props.data.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="extra-small"
          color="primary"
          onClick={() => handleButton()}
        >
          See Details
        </Button>
      </CardActions>
    </Card>
  );
};

function cardData(posts) {
  var values = Object.values(posts);
  return values.map((info, idx) => {
    return <Format data={info} key={idx} />;
  });
}

const SearchFunction = (props) => {
  let history = useHistory();

  // Handles redirection and passing of Data
  const handleButton = () => {
    // setData(props.data);
    const productData = props.data;
    history.push({
      pathname: "/product-details",
    });

    localStorage.setItem("productData", JSON.stringify(productData));
  };

  return (
    <Card sx={{ maxWidth: "10rem", m: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          value={props.data.productID}
          image={props.data.imageSource}
          loading="lazy"
          //image="/products/AthenaBag_Black.jpg"
          //alt={props.data.productDesc}
          alignment="center"
          onClick={handleButton}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="inherit"
            component="div"
            align="left"
          >
            {props.data.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₱{props.data.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="extra-small"
          color="primary"
          onClick={() => handleButton()}
        >
          See Details
        </Button>
      </CardActions>
    </Card>
  );
};

function searchedData(posts) {
  var values = Object.values(posts);
  return values.map((info, idx) => {
    return <SearchFunction data={info} key={idx} />;
  });
}
function CardList() {
  const [posts, setPosts] = useState([]);
  const totalProduct = posts.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
    axios
      //Update to baseURL
      .get(
        `http://localhost/it-project-ini/php/searchProduct.php?search_query=${searchQuery}`
      )
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(baseURL + "CRUD.php?products=")
      //.get("http://localhost/it-project-ini/php/CRUD.php/?products=")
      .then((response) => setPosts(response.data));
  }, []);

  // TO  BE REMOVED
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .get(
  //       `http://localhost/it-project-ini/php/searchProduct.php?search_query=${searchQuery}`
  //     )
  //     .then((res) => {
  //       setSearchResults(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="shop-container01">
      <div className="shop-container02">
        <div className="shop-container03">
          <form>
            <input
              type="text"
              placeholder="Search"
              name="search_query"
              onChange={handleSearchInput}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="shop-container05">
          <label className="shop-text">CATEGORIES</label>
          <div data-thq="thq-dropdown" className="shop-thq-dropdown list-item">
            <div
              data-thq="thq-dropdown-toggle"
              className="shop-dropdown-toggle"
            >
              <span className="shop-text01">Clothing</span>
              <div
                data-thq="thq-dropdown-arrow"
                className="shop-dropdown-arrow"
              >
                <svg viewBox="0 0 1024 1024" className="shop-icon02">
                  <path d="M426 726v-428l214 214z"></path>
                </svg>
              </div>
            </div>
            <ul data-thq="thq-dropdown-list" className="shop-dropdown-list">
              <li data-thq="thq-dropdown" className="shop-dropdown list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  className="shop-dropdown-toggle1"
                >
                  <span className="shop-text02">Men</span>
                </div>
              </li>
              <li data-thq="thq-dropdown" className="shop-dropdown1 list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  className="shop-dropdown-toggle2"
                >
                  <span className="shop-text03">Women</span>
                </div>
              </li>
              <li data-thq="thq-dropdown" className="shop-dropdown2 list-item">
                <div
                  data-thq="thq-dropdown-toggle"
                  className="shop-dropdown-toggle3"
                >
                  <span className="shop-text04">Unisex</span>
                </div>
              </li>
            </ul>
          </div>
          <div data-thq="thq-dropdown" className="shop-thq-dropdown1 list-item">
            <div
              data-thq="thq-dropdown-toggle"
              className="shop-dropdown-toggle4"
            >
              <span className="shop-text05">Bags &amp; Pouches</span>
            </div>
          </div>
          <div data-thq="thq-dropdown" className="shop-thq-dropdown2 list-item">
            <div
              data-thq="thq-dropdown-toggle"
              className="shop-dropdown-toggle5"
            >
              <span className="shop-text06">Accessories</span>
            </div>
          </div>
          <label className="shop-text07">FILTER PRICE</label>
          <div className="shop-container06">
            <button className="shop-button button">Below ₱250</button>
            <button className="shop-button1 button">₱250 - ₱499</button>
            <button className="shop-button2 button">₱500 - ₱999</button>
            <button className="shop-button3 button">₱1000 - ₱1499</button>
            <button className="shop-button4 button">₱1500 - ₱1999</button>
            <button className="shop-button5 button">₱2000 - ₱2499</button>
            <button className="shop-button6 button">₱2500 And Up</button>
          </div>
          <label className="shop-text08">RATING</label>
          <div className="shop-container07 button">
            <svg viewBox="0 0 1024 1024" className="shop-icon04">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon06">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon08">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon10">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon12">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
          </div>
          <div className="shop-container08 button">
            <svg viewBox="0 0 1024 1024" className="shop-icon14">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon16">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon18">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon20">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon22">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <span className="shop-text09">And Up</span>
          </div>
          <div className="shop-container09 button">
            <svg viewBox="0 0 1024 1024" className="shop-icon24">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon26">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon28">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon30">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon32">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <span className="shop-text10">And Up</span>
          </div>
          <div className="shop-container10 button">
            <svg viewBox="0 0 1024 1024" className="shop-icon34">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon36">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon38">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon40">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon42">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <span className="shop-text11">And Up</span>
          </div>
          <div className="shop-container11 button">
            <svg viewBox="0 0 1024 1024" className="shop-icon44">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon46">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon48">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon50">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="shop-icon52">
              <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
            </svg>
            <span className="shop-text12">And Up</span>
          </div>
        </div>
      </div>
      <div className="shop-container12">
        <div className="shop-container13">
          <span>
            <span className="shop-text14">{totalProduct}</span>
            <span className="shop-text15"> </span>
            <span>Products</span>
          </span>
          <div className="shop-container14">
            <span>Sort By   </span>
            <select className="shop-select">
              <option value="Option 1" selected>
                Relevant
              </option>
              <option value="Option 2">Alphabetical (A - Z)</option>
              <option value="Option 2">Alphabetical (Z - A)</option>
              <option value="Option 3">Price (Low to High)</option>
              <option value="Option 4">Price (High to Low)</option>
            </select>
          </div>
        </div>
        <div className="shop-container15">
          {/* <link/> should not be responsible for passing product data,  data is not being passed here, because <CardList/> is the one holding the redirection and has the data of the products */}
          <Link className="shop-navlink">
            <div className="shop-container16">
              {searchedData(searchResults)} {cardData(posts)}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardList;
