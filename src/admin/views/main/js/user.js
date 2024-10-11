import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {baseURL} from '../../../../config'
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button"; // DELETE
import "../css/user.css";
import DataTable from "react-data-table-component";
import differenceBy from "lodash/differenceBy";
import AddUser from "../../forms/add/js/add-user";
import EditUser from "../../forms/update/js/update-user";
import DisplayUser from "../../forms/display/js/view-user";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AdminUser = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [data, setData] = useState("");
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // NOTICE: OPTIONAL useEffect, When listing users if there is no token there wont be a list
  // Up for discussion
  // optional use effect isLoggedIn
  useEffect(() => {
    const url = baseURL + "CRUD.php?user=";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const columns = [
    {
      name: "User Type",
      selector: (row) => row.userType,
      sortable: true,
      flex: 1,
    }, 
    {
      name: "Username",
      selector: (row) => row.userName,
      sortable: true,
      flex: 1,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      flex: 1,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
      flex: 1,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      flex: 1,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
      flex: 1,
    },
    {
      name: "Actions",
      ignoreRowClick: true,
      button: true,
      selector: (row) => (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <EditIcon
            sx={{ "&:hover": { color: "orange" } }}
            id={
              row.userName +
              "," +
              row.userID +
              "," +
              row.userType +
              "," +
              row.firstName +
              "," +
              row.lastName +
              "," +
              row.email +
              "," +
              row.phoneNumber +
              "," +
              row.password
            }
            className="edit-button button"
            onClick={toggleEditForm}
          ></EditIcon>
          <ViewIcon
            sx={{ "&:hover": { color: "green" } }}
            className="view-button button"
            id={row.userID}
            onClick={toggleDisplayForm}
          >
            View
          </ViewIcon>
        </ButtonGroup>
      ),
      allowOverflow: true,
      flex: 1,
    },
  ];

  const filteredItems = users.filter(
    (user) =>
      (user.firstName &&
        user.firstName.toLowerCase().includes(filterText.toLowerCase())) ||
      user.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const contextActions = React.useMemo(() => {}, [
    users,
    selectedRows,
    toggleCleared,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      axios({
        method: "post",
        url: baseURL + "CRUD.php?deleteUser=" + id,
      })
        .then(function (response) {
          setToggleCleared(!toggleCleared);
          console.log(response);
          if (response.status === 200) {
            setToggleCleared(!toggleCleared);
            setUsers(differenceBy(users, selectedRows, "userID")); // refresh data
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
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [displayFormIsOpen, setDisplayFormIsOpen] = useState(false);

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

  return (
    <div className="user-container">
      <Helmet>
        <title>User</title>
        <meta property="og:title" content="User" />
      </Helmet>
      <div className="user-product-header">
        <label className="user-label">USER</label>
        <SearchField
          onFilter={(e) => setFilterText(e)}
          onClear={handleClear}
          filterText={filterText}
        ></SearchField>
      </div>

      <div className="user-container1">
        <button
          className="user-add-product-button button"
          onClick={toggleAddForm}
        >
          <span>
            <span>Add  User</span>
            <br></br>
          </span>
        </button>

        <DeleteOutlineIcon
          key="delete"
          onClick={() => handleDelete(selectedRows.map((r) => r.userID))}
          className="delete-button button"
          fontSize="large"
        ></DeleteOutlineIcon>
      </div>

      <div className="user-product-table-container">
        <DataTable
          columns={columns}
          data={(users, filteredItems)}
          pagination
          subHeader
          selectableRows
          highlightOnHover
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>

      {addFormIsOpen && <AddUser handleClose={toggleAddForm} />}

      {editFormIsOpen && <EditUser handleClose={toggleEditForm} data={data} />}

      {displayFormIsOpen && (
        <DisplayUser handleClose={toggleDisplayForm} data={data} />
      )}
    </div>
  );
};

export default AdminUser;
