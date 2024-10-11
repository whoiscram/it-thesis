import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import DataTable from "react-data-table-component";
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button";
import "../css/orders.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import DisplayOrder from "../../forms/display/js/view-order";
import differenceBy from "lodash/differenceBy";
import AddOrder from "../../forms/add/js/add-order";
import UpdateOrder from "../../forms/update/js/update-order";
import { baseURL } from "../../../../config";
const AdminOrders = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [data, setData] = useState("");
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [order, setOrder] = useState([]);
  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  useEffect(() => {
    //Change url to path of CRUD.php
    const url = baseURL + "CRUD.php/order";
    //const url = "http://localhost/it-project-ini/php/getOrder.php";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setOrder(data);
        console.log(data);
      });
  }, []);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.orderID,
      sortable: true,
      flex: 1,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
      flex: 1,
    },
    {
      name: "Date Ordered",
      selector: (row) => row.dateOrdered,
      sortable: true,
      flex: 1,
    },
    {
      name: "Courier Type",
      selector: (row) => row.courierType,
      sortable: true,
      flex: 1,
    },

    {
      name: "Delivery Address",
      selector: (row) => row.shipTo,
      sortable: true,
      flex: 1,
    },
    {
      name: "Items",
      selector: (row) => row.Items,
      sortable: true,
      flex: 1,
    },
    {
      name: "Total Amount",
      selector: (row) => "₱ " + row.totalAmount,
      sortable: true,
      flex: 1,
    },
    {
      name: "Order Status",
      selector: (row) => row.orderStatus,
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
            id={row.orderID}
            className="edit-button button"
            onClick={toggleEditForm}
          ></EditIcon>
          <ViewIcon
            sx={{ "&:hover": { color: "green" } }}
            className="view-button button"
            onClick={toggleDisplayForm}
            id={row.orderID + "," + row.totalAmount + "," + row.userID}
          ></ViewIcon>
          <></>
        </ButtonGroup>
      ),
      flex: 1,
    },
  ];

  const [displayFormIsOpen, setDisplayFormIsOpen] = useState(false);
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  const toggleAddForm = () => {
    setAddFormIsOpen(!addFormIsOpen);
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
  };

  // const filteredItems = order.filter((order) =>
  //   order.customerName.toLowerCase().includes(filterText.toLowerCase())
  // );

  const filteredItems = order.filter(
    (order) =>
      (order.customerName &&
        order.customerName.toLowerCase().includes(filterText.toLowerCase())) ||
      order.orderStatus.toLowerCase().includes(filterText.toLowerCase()) ||
      order.Items.toLowerCase().includes(filterText.toLowerCase()) ||
      order.totalAmount.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const contextActions = React.useMemo(() => {}, [
    order,
    selectedRows,
    toggleCleared,
  ]);

  const handleDelete = (id) => {
    console.log(selectedRows.map((r) => r.orderID));
    if (window.confirm("Are you sure want to delete?")) {
      axios({
        method: "post",
        url: baseURL + "CRUD.php?deleteOrder=" + id,
      })
        .then(function (response) {
          setToggleCleared(!toggleCleared);
          console.log(response);
          if (response.status === 200) {
            setToggleCleared(!toggleCleared);
            setOrder(differenceBy(order, selectedRows, "orderID"));
            // refresh data
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

  return (
    <div className="orders-container">
      <Helmet>
        <title> Orders </title>
        <meta property="og:title" content=" Orders " />
      </Helmet>
      <div className="orders-product-header">
        <label className="orders-label">ORDERS</label>
        <SearchField
          onFilter={(e) => setFilterText(e)}
          onClear={handleClear}
          filterText={filterText}
        ></SearchField>
      </div>
      <div className="orders-container1">
        <button
          className="orders-add-product-button button"
          onClick={toggleAddForm}
        >
          Add Order
        </button>
        <DeleteOutlineIcon
          key="delete"
          onClick={() => handleDelete(selectedRows.map((r) => r.orderID))}
          className="delete-button button"
          fontSize="large"
        ></DeleteOutlineIcon>
      </div>
      <div className="orders-product-tabel-container">
        <DataTable
          columns={columns}
          data={(order, filteredItems)}
          pagination
          subHeader
          selectableRows
          highlightOnHover
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>

      {displayFormIsOpen && (
        <DisplayOrder handleClose={toggleDisplayForm} data={data} />
      )}

      {addFormIsOpen && <AddOrder handleClose={toggleAddForm} data={data} />}

      {editFormIsOpen && (
        <UpdateOrder handleClose={toggleEditForm} data={data} />
      )}
    </div>
  );
};

export default AdminOrders;
