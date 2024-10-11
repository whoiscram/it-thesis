import React, { useEffect, useState } from "react";
import {baseURL} from '../../../../config'
import { Helmet } from "react-helmet";
import axios from "axios";
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button";
import ActionEditButton from "../../../components/action-edit-button";
import ActionDeleteButton from "../../../components/action-delete-button";
import "../css/attributes.css";
import differenceBy from "lodash/differenceBy";
import AddAttribute from "../../forms/add/js/add-attribute";
import DataTable from "react-data-table-component";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import EditAttribute from "../../forms/update/js/update-attribute";
import AddIcon from "@mui/icons-material/Add";
import AddAttributeValue from "../../forms/add/js/add-attribute-value";
import ViewIcon from "@mui/icons-material/Visibility";
import DisplayAttributeValue from "../../forms/display/js/view-attribute-value";

const AdminAttributes = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [attribute, setAttribute] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [data, setData] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    //Change url to path of CRUD.php
    const url = baseURL + "CRUD.php?atrributes=";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setAttribute(data);
        console.log(data);
      });
  }, []);

  const columns = [
    {
      name: "Attribute Name",
      selector: (row) => row.name,
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
            className="edit-button button"
            onClick={toggleEditForm}
          ></EditIcon>
          <AddIcon
            id={row.attributeID + ","}
            className="add-value-button button"
            onClick={toggleAddValueForm}
          ></AddIcon>
          <ViewIcon className="view-button button" onClick={toggleDisplayForm}>
            View
          </ViewIcon>
        </ButtonGroup>
      ),
      flex: 1,
    },
  ];

  const filteredItems = attribute.filter((attribute) =>
    attribute.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const contextActions = React.useMemo(() => {}, [
    attribute,
    selectedRows,
    toggleCleared,
  ]);

  //handles delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      axios({
        method: "post",
        url: baseURL + "CRUD.php?deleteAttribute=" + id,
      })
        .then(function (response) {
          setToggleCleared(!toggleCleared);
          console.log(response);
          if (response.status === 200) {
            setToggleCleared(!toggleCleared);
            setAttribute(differenceBy(attribute, selectedRows, "attributeID")); // refresh data
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
  const [addValueFormIsOpen, setAddValueFormIsOpen] = useState(false);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [displayValueFormIsOpen, setDisplayValueFormIsOpen] = useState(false);

  const toggleAddForm = (row) => {
    let str = row.target.id;
    setData(str);
    setAddFormIsOpen(!addFormIsOpen);
  };

  const toggleDisplayForm = () => {
    setDisplayValueFormIsOpen(!displayValueFormIsOpen);
  };

  const toggleAddValueForm = (row) => {
    let str = row.target.id;
    setData(str);
    setAddValueFormIsOpen(!addValueFormIsOpen);
  };

  const toggleEditForm = () => {
    setEditFormIsOpen(!editFormIsOpen);
  };

  return (
    <div className="attributes-container">
      <Helmet>
        <title>adminAttributes </title>
        <meta property="og:title" content="adminAttributes " />
      </Helmet>
      <div className="attributes-product-header">
        <label className="attributes-label">
          <span className="attributes-text">ATTRIBUTES</span>
          <br></br>
        </label>

        <SearchField
          onFilter={(e) => setFilterText(e)}
          onClear={handleClear}
          filterText={filterText}
        ></SearchField>
      </div>
      <div className="attributes-container1">
        <button
          type="button"
          className="attributes-add-product-button button"
          onClick={toggleAddForm}
        >
          Add Attribute
        </button>
        <DeleteOutlineIcon
          key="delete"
          onClick={() => handleDelete(selectedRows.map((r) => r.attributeID))}
          className="delete-button button"
          fontSize="large"
        ></DeleteOutlineIcon>
      </div>
      <div className="attributes-product-table-container">
        <DataTable
          columns={columns}
          data={(attribute, filteredItems)}
          pagination
          subHeader
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>

      {addFormIsOpen && <AddAttribute handleClose={toggleAddForm} />}
      {editFormIsOpen && <EditAttribute handleClose={toggleEditForm} />}
      {addValueFormIsOpen && (
        <AddAttributeValue handleClose={toggleAddValueForm} data={data} />
      )}
      {displayValueFormIsOpen && (
        <DisplayAttributeValue handleClose={toggleDisplayForm} data={data} />
      )}
    </div>
  );
};

export default AdminAttributes;
