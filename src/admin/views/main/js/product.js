import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { baseURL } from "../../../../config";
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button";
import "../css/product.css";
import differenceBy from "lodash/differenceBy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DataTable from "react-data-table-component";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import { requirePropFactory } from "@mui/material";
import AddProduct from "../../forms/add/js/add-product";
import EditProduct from "../../forms/update/js/update-product";
import DisplayProduct from "../../forms/display/js/view-product";
import UpdateStock from "../../forms/update/js/update-stock";

const AdminProduct = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = React.useState("");

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const formattedDate = date.split("/").reverse().join("/");

  const logs = {
    date: formattedDate,
    userType: "admin",
    userID: "2",
    action: "view",
    description: "userName[2] viewed prductID",
  };

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  useEffect(() => {
    //Change url to path of CRUD.php
    const url = baseURL + "CRUD.php?products=";
    //const url = "http://localhost/it-project-ini/php/CRUD.php/?products";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
      flex: 1,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      flex: 1,
    },
    {
      name: "Stock",
      selector: (row) => row.qtyStock,
      sortable: true,
      flex: 1,
    },
    {
      name: "Actions",
      selector: (row) => (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <EditIcon
            sx={{ "&:hover": { color: "orange" } }}
            id={row.productID}
            className="edit-button button"
            onClick={toggleEditForm}
          ></EditIcon>
          <ViewIcon
            className="view-button button"
            onClick={toggleDisplayForm}
            id={
              //store sa array -> view-product // productID - > fetch sa view-product
              row.productID
            }
          >
            View
          </ViewIcon>
          <></>
        </ButtonGroup>
      ),
      flex: 1,
    },
  ];

  // Error is not a function simple fix
  const filteredItems = products.filter(
    (products) =>
      products.productName &&
      products.productDesc
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const contextActions = React.useMemo(() => {}, [
    products,
    selectedRows,
    toggleCleared,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      axios({
        method: "post",
        url: baseURL + "CRUD.php?deleteProduct=" + id,
      })
        .then(function (response) {
          setToggleCleared(!toggleCleared);
          console.log(response);
          if (response.status === 200) {
            setToggleCleared(!toggleCleared);
            setProducts(differenceBy(products, selectedRows, "productID")); // refresh data
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const [updateStockFormIsOpen, setUpdateStockFormIsOpen] = useState(false);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [displayFormIsOpen, setDisplayFormIsOpen] = useState(false);

  const toggleAddForm = () => {
    setAddFormIsOpen(!addFormIsOpen);
  };

  const toggleUpdateStockForm = () => {
    setUpdateStockFormIsOpen(!updateStockFormIsOpen);
  };

  const toggleEditForm = (row) => {
    let str = row.target.id;
    var array = str.split(",");
    setData(array);
    setEditFormIsOpen(!editFormIsOpen);
  };
  const toggleDisplayForm = (row) => {
    let str = row.target.id;
    var array = str.split(",");
    setData(array);
    setDisplayFormIsOpen(!displayFormIsOpen);

    axios
      .post(baseURL + "userLog.php", logs)
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="product-container">
      <Helmet>
        <title> Inventory </title>
        <meta property="og:title" content=" Product " />
      </Helmet>
      <div className="product-product-header">
        <label className=" product-label">PRODUCT INVENTORY</label>
        <SearchField
          onFilter={(e) => setFilterText(e)}
          onClear={handleClear}
          filterText={filterText}
        ></SearchField>
      </div>
      <div className="product-container1">
        <button
          className="product-add-product-button button"
          onClick={toggleAddForm}
        >
          Add Product
        </button>
        <button
          className="product-update-product-button button"
          onClick={toggleUpdateStockForm}
        >
          Update Stock
        </button>

        <DeleteOutlineIcon
          onClick={() => handleDelete(selectedRows.map((r) => r.productID))}
          className="delete-button button"
          fontSize="large"
        ></DeleteOutlineIcon>
      </div>
      <div className="product-product-table-container">
        <DataTable
          columns={columns}
          data={(products, filteredItems)}
          pagination
          subHeader
          selectableRows
          highlightOnHover
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>
      {addFormIsOpen && <AddProduct handleClose={toggleAddForm} />}

      {updateStockFormIsOpen && (
        <UpdateStock handleClose={toggleUpdateStockForm} />
      )}

      {editFormIsOpen && (
        <EditProduct handleClose={toggleEditForm} data={data} />
      )}

      {displayFormIsOpen && (
        <DisplayProduct handleClose={toggleDisplayForm} data={data} />
      )}
    </div>
  );
};

export default AdminProduct;
