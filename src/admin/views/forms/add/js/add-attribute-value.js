import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import ImageUploader from "react-images-upload";
import { baseURL } from "../../../../../config";
import "../../add/css/add-attribute-value.css";

const AdminAddAttributes = (props) => {
  const { data } = props;
  const [inputs, setInputs] = useState({});

  const [state, setState] = useState({
    pictures: [],
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onDrop = (picture) => {
    setState({
      pictures:
        state.pictures.concat(picture) /* state.pictures.concat(picture) */,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const image = state.pictures[0]?.name;
    const ins = inputs.attributeValue;

    axios
      .post(`${baseURL}CRUD.php?addAttributeValue=${data}`, image + `/` + ins)
      .then((response) => {
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-add-attributes-container">
      <Helmet>
        <title>adminAddAttributes - exported project</title>
        <meta
          property="og:title"
          content="adminAddAttributes - exported project"
        />
      </Helmet>
      <div className="admin-add-attributes-container1">
        <h1 className="admin-add-attributes-text">
          <span className="admin-add-attributes-text01">Attribute Name</span>
          <br></br>
        </h1>
        <form className="admin-add-attributes-form" onSubmit={handleSubmit}>
          <div className="admin-add-attributes-container2">
            <div className="admin-add-attributes-container3">
              <label htmlFor="attributevalue">Attribute Value</label>
              <input
                type="text"
                id="attributeValue"
                name="attributeValue"
                required
                placeholder="ex: Small"
                className="admin-add-attributes-textinput input"
                onChange={handleChange}
              />
            </div>
            <div className="admin-add-attributes-container4">
              <label
                htmlFor="attributevalue"
                className="admin-add-attributes-text04"
              >
                Upload Image
              </label>
            </div>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              name="imageSource"
              id="imageSource"
              buttonText="Choose image/s"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
              singleImage={true}
            />
          </div>
          <div className="admin-add-attributes-container5">
            <div className="admin-add-attributes-container6">
              <div className="admin-add-attributes-container7">
                <button
                  name="cancel"
                  type="button"
                  className="admin-add-attributes-button1 button"
                  onClick={props.handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="admin-add-attributes-container8">
                <button
                  name="addUser"
                  type="submit"
                  className="admin-add-attributes-button2 button"
                >
                  <span className="admin-add-attributes-text08">
                    <span>
                      Add
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <br></br>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddAttributes;
