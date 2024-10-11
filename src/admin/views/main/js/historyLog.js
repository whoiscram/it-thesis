import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { baseURL } from "../../../../config";
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button"; // DELETE
import "../css/historyLog.css";
import DataTable from "react-data-table-component";
import differenceBy from "lodash/differenceBy";
import AddUser from "../../forms/add/js/add-user";
import EditUser from "../../forms/update/js/update-user";
import DisplayUser from "../../forms/display/js/view-user";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AdminHistoryLogs = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [data, setData] = useState("");
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [logs, setLogs] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    const url = baseURL + "viewUserLog.php";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setLogs(data);
      });
  }, []);

  const columns = [
    {
      name: "Date Logged",
      selector: (row) => row.date,
      sortable: true,
      flex: 1,
      width: "15%",
    },
    {
      name: "User Type",
      selector: (row) => row.userType,
      sortable: true,
      flex: 1,
      width: "15%",
    },
    {
      name: "Performed by:",
      selector: (row) => row.userID,
      sortable: true,
      flex: 1,
      width: "15%",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      flex: 1,
      width: "15%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      flex: 1,
      width: "50%",
    },
  ];

  const filteredItems = logs.filter(
    (user_log) =>
      (user_log.date &&
        user_log.userType.toLowerCase().includes(filterText.toLowerCase())) ||
      user_log.userID ||
      user_log.action.toLowerCase().includes(filterText.toLowerCase()) ||
      user_log.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const contextActions = React.useMemo(() => {}, [
    logs,
    selectedRows,
    toggleCleared,
  ]);

  return (
    <div className="user-container">
      <Helmet>
        <title>History Logs</title>
        <meta property="og:title" content="History Logs" />
      </Helmet>
      <div className="user-product-header">
        <label className="user-label">History Logs</label>
        <SearchField
          onFilter={(e) => setFilterText(e)}
          onClear={handleClear}
          filterText={filterText}
        ></SearchField>
      </div>

      <div className="user-product-table-container">
        <DataTable
          columns={columns}
          data={(logs, filteredItems)}
          pagination
          subHeader
          highlightOnHover
          contextActions={contextActions}
          clearSelectedRows={toggleCleared}
        />
      </div>
    </div>
  );
};

export default AdminHistoryLogs;
