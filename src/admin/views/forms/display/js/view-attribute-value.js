import React from "react";

import { Helmet } from "react-helmet";

import "../../display/css/view-attribute-value.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const AdminAttributeView = (props) => {
  return (
    <div className="admin-attribute-view-container">
      <Helmet>
        <title>Admin-Attribute-View - exported project</title>
        <meta
          property="og:title"
          content="Admin-Attribute-View - exported project"
        />
      </Helmet>
      <div className="admin-attribute-view-container1">
        <div className="admin-attribute-view-header">
          <h1 className="admin-attribute-view-text">ATTRIBUTE</h1>
        </div>
        <div className="admin-attribute-view-product-details-1">
          <div className="admin-attribute-view-attributes">
            <div className="admin-attribute-view-attribute-name">
              <div className="admin-attribute-view-background">
                <h3 className="admin-attribute-view-title">Textile</h3>
              </div>
              <div className="admin-attribute-view-container2">
                <Card sx={{ maxWidth: 220, m: ".5rem" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      //image={props.data.imageSource}
                      image="/products/AthenaBag_Black.jpg"
                      //alt={props.data.productDesc}
                      alignment="center"
                    
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="inherit"
                        component="div"
                        align="left"
                    
                      >
                        Value Name
                      </Typography>
                     
                    </CardContent>
                  </CardActionArea>
                 
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-attribute-view-container3">
          <button
            name="cancel"
            type="button"
            className="admin-attribute-view-button button"
            onClick = {props.handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAttributeView;
