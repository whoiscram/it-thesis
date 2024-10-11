import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button";
import AddCategory from "../../forms/add/js/add-category";
import "../css/categories.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import differenceBy from "lodash/differenceBy";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditCategory from "../../forms/update/js/update-category";
import AddIcon from "@mui/icons-material/Add";
import AddSubCategory from "../../forms/add/js/add-sub-category";
import {baseURL} from '../../../../config'
const AdminCategories = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  useEffect(() => {
    //Change url to path of CRUD.php
    const url = baseURL + "CRUD.php?category=";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setCategory(data);
      });
  }, []);

  console.log(category);

  const columns = [
    {
      name: "Parent Category",
      selector: (row) => row.name,
      sortable: true,
      flex: 1,
    },
    {
      name: "Subcategory",
      selector: (row) => row.sub_category,
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
            className="add-value-button button"
            onClick={toggleAddSubCatForm}
            id={row.categoryID}
          ></AddIcon>

          {/*<ViewIcon
            className="view-button button"
            //   onClick={toggleDisplayForm}
          >
            View
      </ViewIcon>*/}
        </ButtonGroup>
      ),
      flex: 1,
    },
  ];

  const filteredItems =
    /*category.filter((category) =>
    category.name.toLowerCase().includes(filterText.toLowerCase())*/

    category.filter(
      (category) =>
        category.name &&
        category.name.toLowerCase().includes(filterText.toLowerCase())
    );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const contextActions = React.useMemo(() => {}, [
    category,
    selectedRows,
    toggleCleared,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      axios({
        method: "post",
        url: baseURL + "CRUD.php?deleteCategory=" + id,
      })
        .then(function (response) {
          setToggleCleared(!toggleCleared);
          console.log(response);
          if (response.status === 200) {
            setToggleCleared(!toggleCleared);
            setCategory(differenceBy(category, selectedRows, "categoryID")); // refresh data
          }
        })
        .catch(function (response) {
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
  const [addSubCatFormIsOpen, setAddSubCatFormIsOpen] = useState(false);

  const toggleAddForm = () => {
    setAddFormIsOpen(!addFormIsOpen);
  };

  const toggleEditForm = () => {
    setEditFormIsOpen(!editFormIsOpen);
  };
  const toggleDisplayForm = () => {
    setDisplayFormIsOpen(!displayFormIsOpen);
  };

  const toggleAddSubCatForm = (row) => {
    setAddSubCatFormIsOpen(!addSubCatFormIsOpen);
    let str = row.target.id;
    setData(str);
  };

  return (
    <div className="categories-container">
      <Helmet>
        <title> Categories </title>
        <meta property="og:title" content="Categories " />
      </Helmet>
      <div className="categories-product-header">
        <label className="categories-label">CATEGORIES</label>
        <SearchField
          onFilter={(e) => setFilterText(e)}
          onClear={handleClear}
          filterText={filterText}
        ></SearchField>
      </div>
      <div className="categories-container1">
        <button
          type="button"
          className="categories-add-product-button button"
          onClick={toggleAddForm}
        >
          Add Category
        </button>
        <DeleteOutlineIcon
          onClick={() => handleDelete(selectedRows.map((r) => r.categoryID))}
          className="delete-button button"
          fontSize="large"
        ></DeleteOutlineIcon>
      </div>
      <div className="categories-product-tabel-container">
        <DataTable
          columns={columns}
          data={(category, filteredItems)}
          pagination
          subHeader
          highlightOnHover
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>

      {addFormIsOpen && <AddCategory handleClose={toggleAddForm} />}
      {addSubCatFormIsOpen && (
        <AddSubCategory handleClose={toggleAddSubCatForm} data={data} />
      )}
      {editFormIsOpen && <EditCategory handleClose={toggleEditForm} />}
    </div>
  );
};

export default AdminCategories;
