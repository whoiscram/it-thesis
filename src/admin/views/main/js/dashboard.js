import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { baseURL } from "../../../../config";
import { Helmet } from "react-helmet";
import axios from "axios";
import SearchField from "../../../components/search-field";
import ActionMultipleDeleteButton from "../../../components/action-multiple-delete-button";
import "../css/dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = (props) => {
  const [chartData, setChartData] = useState([]); // [] OBJECT, {} ARRAY, "" STRING
  const [complete, setCompleted] = useState({});
  const [inTransit, setInTransit] = useState({});
  const [confirmed, setConfirmed] = useState({});
  const [pending, setPending] = useState({});
  const [cancelled, setCancelled] = useState({});
  const [returned, setReturned] = useState({});
  const [soldThisMonth, setSoldThisMonth] = useState({});
  const [soldThisYear, setSoldThisYear] = useState({});

  useEffect(() => {
    axios
      .get(baseURL + "sales.php")
      // .get("http://localhost/it-project-ini/php/sales.php")
      .then((response) => response.data)
      .then((data) => {
        setChartData(data);
      });

    //const url = `${baseURL}orderStatus.php?complete=`;
    axios
      .get(baseURL + "orderStatus.php?complete")
      .then((response) => response.data)
      .then((data) => {
        setCompleted(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?inTransit")
      .then((response) => response.data)
      .then((data) => {
        setInTransit(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?confirmed")
      .then((response) => response.data)
      .then((data) => {
        setConfirmed(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?pending")
      .then((response) => response.data)
      .then((data) => {
        setPending(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?cancelled")
      .then((response) => response.data)
      .then((data) => {
        setCancelled(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?returned")
      .then((response) => response.data)
      .then((data) => {
        setReturned(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?soldThisMonth")
      .then((response) => response.data)
      .then((data) => {
        setSoldThisMonth(data[0]);
      });

    axios
      .get(baseURL + "orderStatus.php?soldThisYear")
      .then((response) => response.data)
      .then((data) => {
        setSoldThisYear(data[0]);
      });
  }, []);

  const labels = chartData.map((object) => object.Month);

  const totalSales = chartData.map((object) => object.TotalSales);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  };

  const intNumbers = totalSales.map((x) => parseInt(x.replace(",", "")));
  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data: intNumbers, // dapat integer ito // pwede dito lagyan minimum
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="admin-dashboard-container">
      <Helmet>
        <title>Dashboard</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>
      <div className="admin-dashboard-dashboard-container">
        <div className="admin-dashboard-status-container">
          <div className="admin-dashboard-container01">
            <div className="admin-dashboard-container02">
              <span className="admin-dashboard-text">21</span>
              <svg viewBox="0 0 1024 1024" className="admin-dashboard-icon">
                <path d="M810.667 213.333h-597.333l64-85.333h469.333zM929.877 230.059l-127.744-170.325c-8.363-11.136-21.077-17.024-34.133-17.067h-512c-13.909 0-26.283 6.656-34.133 17.067l-127.744 170.325c-1.835 2.389-3.456 5.035-4.736 7.808-2.773 5.803-4.096 12.032-4.053 18.133v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-597.333c0-9.344-3.029-18.005-8.064-24.96-0.171-0.213-0.299-0.427-0.469-0.64zM170.667 298.667h682.667v554.667c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165zM640 426.667c0 35.371-14.293 67.285-37.504 90.496s-55.125 37.504-90.496 37.504-67.285-14.293-90.496-37.504-37.504-55.125-37.504-90.496c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667c0 58.88 23.936 112.299 62.464 150.869s91.989 62.464 150.869 62.464 112.299-23.936 150.869-62.464 62.464-91.989 62.464-150.869c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667z"></path>
              </svg>
            </div>
            <span className="admin-dashboard-text01">ORDERS</span>
          </div>
          <div className="admin-dashboard-container03">
            <div className="admin-dashboard-container04">
              <div className="admin-dashboard-container05">
                <span className="admin-dashboard-text02">
                  {complete.complete}
                </span>
                <svg viewBox="0 0 1024 1024" className="admin-dashboard-icon02">
                  <path d="M512 854q140 0 241-101t101-241-101-241-241-101-241 101-101 241 101 241 241 101zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125zM708 324l60 60-342 342-212-214 60-60 152 152z"></path>
                </svg>
              </div>
              <span className="admin-dashboard-text03">COMPLETED</span>
            </div>
          </div>
          <div className="admin-dashboard-container06">
            <div className="admin-dashboard-container07">
              <div className="admin-dashboard-container08">
                <span className="admin-dashboard-text04">
                  {inTransit.inTransit}
                </span>
                <svg viewBox="0 0 1024 1024" className="admin-dashboard-icon04">
                  <path d="M640 640h-554.667v-469.333h554.667v170.667zM725.333 384h110.336l102.997 102.997v153.003h-213.333zM298.667 789.333c0 17.664-7.125 33.621-18.731 45.269s-27.605 18.731-45.269 18.731-33.621-7.125-45.269-18.731-18.731-27.605-18.731-45.269 7.125-33.621 18.731-45.269 27.605-18.731 45.269-18.731 33.621 7.125 45.269 18.731 18.731 27.605 18.731 45.269zM938.667 789.333c0-22.912-5.163-44.587-14.379-64h57.045c23.552 0 42.667-19.115 42.667-42.667v-213.333c0-10.923-4.181-21.845-12.501-30.165l-128-128c-7.723-7.723-18.389-12.501-30.165-12.501h-128v-170.667c0-23.552-19.115-42.667-42.667-42.667h-640c-23.552 0-42.667 19.115-42.667 42.667v554.667c0 23.552 19.115 42.667 42.667 42.667h57.045c-9.216 19.413-14.379 41.088-14.379 64 0 41.216 16.768 78.635 43.733 105.6s64.384 43.733 105.6 43.733 78.635-16.768 105.6-43.733 43.733-64.384 43.733-105.6c0-22.912-5.163-44.587-14.379-64h284.757c-9.216 19.413-14.379 41.088-14.379 64 0 41.216 16.768 78.635 43.733 105.6s64.384 43.733 105.6 43.733 78.635-16.768 105.6-43.733 43.733-64.384 43.733-105.6zM853.333 789.333c0 17.664-7.125 33.621-18.731 45.269s-27.605 18.731-45.269 18.731-33.621-7.125-45.269-18.731-18.731-27.605-18.731-45.269 7.125-33.621 18.731-45.269 27.605-18.731 45.269-18.731 33.621 7.125 45.269 18.731 18.731 27.605 18.731 45.269z"></path>
                </svg>
              </div>
              <span className="admin-dashboard-text05">IN-TRANSIT</span>
            </div>
          </div>
          <div className="admin-dashboard-container09">
            <div className="admin-dashboard-container10">
              <div className="admin-dashboard-container11">
                <span className="admin-dashboard-text06">
                  {confirmed.confirmed}
                </span>
                <svg
                  viewBox="0 0 950.8571428571428 1024"
                  className="admin-dashboard-icon06"
                >
                  <path d="M731.429 402.286c0-20-16.571-36.571-36.571-36.571-9.714 0-18.857 4-25.714 10.857l-84 83.429v-167.429c0-20-16.571-36.571-36.571-36.571s-36.571 16.571-36.571 36.571v167.429l-84-83.429c-6.857-6.857-16-10.857-25.714-10.857-20 0-36.571 16.571-36.571 36.571 0 9.714 4 18.857 10.857 25.714l146.286 146.286c6.857 6.857 16 10.857 25.714 10.857s18.857-4 25.714-10.857l146.286-146.286c6.857-6.857 10.857-16 10.857-25.714zM365.714 877.714c0 40.571-32.571 73.143-73.143 73.143s-73.143-32.571-73.143-73.143 32.571-73.143 73.143-73.143 73.143 32.571 73.143 73.143zM877.714 877.714c0 40.571-32.571 73.143-73.143 73.143s-73.143-32.571-73.143-73.143 32.571-73.143 73.143-73.143 73.143 32.571 73.143 73.143zM950.857 256v292.571c0 18.286-13.714 34.286-32.571 36.571l-596.571 69.714c2.286 12.571 7.429 26.857 7.429 40s-8 25.143-13.714 36.571h525.714c20 0 36.571 16.571 36.571 36.571s-16.571 36.571-36.571 36.571h-585.143c-20 0-36.571-16.571-36.571-36.571 0-17.714 26.857-61.714 34.857-78.286l-101.143-470.286h-116.571c-20 0-36.571-16.571-36.571-36.571s16.571-36.571 36.571-36.571h146.286c38.857 0 39.429 45.714 45.143 73.143h686.286c20 0 36.571 16.571 36.571 36.571z"></path>
                </svg>
              </div>
              <span className="admin-dashboard-text07">CONFIRMED</span>
            </div>
          </div>
          <div className="admin-dashboard-container12">
            <div className="admin-dashboard-container13">
              <div className="admin-dashboard-container14">
                <span className="admin-dashboard-text08">
                  {" "}
                  {pending.pending}
                </span>
                <svg viewBox="0 0 1024 1024" className="admin-dashboard-icon08">
                  <path d="M889.68 166.32c-93.608-102.216-228.154-166.32-377.68-166.32-282.77 0-512 229.23-512 512h96c0-229.75 186.25-416 416-416 123.020 0 233.542 53.418 309.696 138.306l-149.696 149.694h352v-352l-134.32 134.32z"></path>
                  <path d="M928 512c0 229.75-186.25 416-416 416-123.020 0-233.542-53.418-309.694-138.306l149.694-149.694h-352v352l134.32-134.32c93.608 102.216 228.154 166.32 377.68 166.32 282.77 0 512-229.23 512-512h-96z"></path>
                </svg>
              </div>
              <span className="admin-dashboard-text09">PENDING</span>
            </div>
          </div>
          <div className="admin-dashboard-container15">
            <div className="admin-dashboard-container16">
              <div className="admin-dashboard-container17">
                <span className="admin-dashboard-text10">
                  {" "}
                  {cancelled.cancelled}
                </span>
                <svg viewBox="0 0 1024 1024" className="admin-dashboard-icon11">
                  <path d="M622 342l60 60-110 110 110 110-60 60-110-110-110 110-60-60 110-110-110-110 60-60 110 110zM896 128q34 0 60 26t26 60v596q0 34-26 60t-60 26h-768q-34 0-60-26t-26-60v-596q0-34 26-60t60-26h768zM896 814v-600h-768v600h768z"></path>
                </svg>
              </div>
              <span className="admin-dashboard-text11">CANCELLED</span>
            </div>
          </div>
          <div className="admin-dashboard-container18">
            <div className="admin-dashboard-container19">
              <div className="admin-dashboard-container20">
                <span className="admin-dashboard-text12">
                  {returned.returned}
                </span>
                <svg viewBox="0 0 1024 1024" className="admin-dashboard-icon13">
                  <path d="M810 128q34 0 60 26t26 60v596q0 34-26 60t-60 26h-596q-36 0-61-25t-25-61v-170h86v170h596v-596h-596v170h-86v-170q0-36 25-61t61-25h596zM430 666l110-112h-412v-84h412l-110-112 60-60 214 214-214 214z"></path>
                </svg>
              </div>
              <span className="admin-dashboard-text13">RETURNED</span>
            </div>
          </div>
        </div>
        <div className="admin-dashboard-container21">
          <div className="admin-dashboard-d-m-y-sales-container">
            <div className="admin-dashboard-container22">
              {/*<div className="admin-dashboard-container23">
                <h1 className="admin-dashboard-text14">
                  Daily/Monthly/Yearly Sales
                </h1>
              </div>
             <div className="admin-dashboard-select-container">
                <select className="admin-dashboard-select">
                  <option value="daily" selected>
                    Daily
                  </option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>*/}
            </div>
            <div className="admin-dashboard-graph-container">
              <Bar data={data} width={100} height={50} options={options} />
            </div>
          </div>
          <div className="admin-dashboard-container24">
            <div className="admin-dashboard-products-sold-container">
              <div className="admin-dashboard-container25">
                <div className="admin-dashboard-container26">
                  <h1 className="admin-dashboard-text16">
                    Products Sold this Month ({soldThisMonth.currentMonth})
                  </h1>
                  <div className="admin-dashboard-container27">
                    <div className="admin-dashboard-container28">
                      <div className="admin-dashboard-container29">
                        <span className="admin-dashboard-text17">
                          {soldThisMonth.items}
                        </span>
                        <span className="admin-dashboard-text18">Items</span>
                      </div>
                      <div className="admin-dashboard-container30">
                        <span className="admin-dashboard-text19">
                          {" "}
                          ₱ {soldThisMonth.totalAmount}
                        </span>
                        <span className="admin-dashboard-text20">
                          <span>Total Amount</span>
                          <br></br>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-dashboard-container31">
                <div className="admin-dashboard-container32">
                  <h1 className="admin-dashboard-text23">
                    Products Sold this Year ({soldThisYear.Year})
                  </h1>
                  <div className="admin-dashboard-container33">
                    <div className="admin-dashboard-container34">
                      <span className="admin-dashboard-text24">
                        {soldThisYear.items}
                      </span>
                      <span className="admin-dashboard-text25">Items</span>
                    </div>
                    <div className="admin-dashboard-container35">
                      <span className="admin-dashboard-text26">
                        {" "}
                        ₱ {soldThisYear.totalAmount}
                      </span>
                      <span className="admin-dashboard-text27">
                        Total Amount
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-dashboard-container36">
                <div className="admin-dashboard-container37">
                  <h1 className="admin-dashboard-text28">Top 5 Sales</h1>
                  <div className="admin-dashboard-container38">
                    <div className="admin-dashboard-container39">
                      <span className="admin-dashboard-text29">pie chart</span>
                    </div>
                    <div className="admin-dashboard-container40">
                      <span className="admin-dashboard-text30">legend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-dashboard-product-wise-container">
          <div className="admin-dashboard-container41">
            <h1 className="admin-dashboard-text31">Product Revenue</h1>
            <div className="admin-dashboard-container42">
              <span className="admin-dashboard-text32">
                horizontal bar graph
              </span>
            </div>
          </div>
          <div className="admin-dashboard-container43"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
