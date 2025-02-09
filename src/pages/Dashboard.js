import React, { useEffect, useState } from "react";
import SelectBox from "devextreme-react/select-box";
import LoadPanel from "devextreme-react/load-panel";
import CustomStore from "devextreme/data/custom_store";
import { fetchEmployees, fetchSales } from "../utils/fetchData";
import { CustomDataGrid, CustomChart } from "../components";

const employeesStore = new CustomStore({
  key: "id",
  load: async () => fetchEmployees(),
  byKey: async (key) => {
    const employees = await fetchEmployees();
    return employees.find((emp) => emp.id === key);
  },
});

const positionsStore = new CustomStore({
  loadMode: "raw",
  load: async () => {
    const employees = await fetchEmployees();
    return ["All", ...new Set(employees.map((emp) => emp.position))];
  },
});

const animateValue = (setState, start, end, duration = 2000) => {
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    setState(Math.floor(progress * (end - start) + start));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchEmployees().then((data) =>
      animateValue(setTotalEmployees, 0, data.length, 1500)
    );
    fetchSales().then((data) => {
      animateValue(
        setTotalRevenue,
        0,
        data.reduce((sum, s) => sum + s.revenue, 0),
        1500
      );
      animateValue(
        setTotalProfit,
        0,
        data.reduce((sum, s) => sum + s.profit, 0),
        1500
      );
      setSalesData(data);
    });
  }, []);

  return (
    <div className="container mt-4 mb-5 position-relative">
      <LoadPanel
        visible={false}
        shadingColor="rgba(0,0,0,0.4)"
        deferRendering={true}
      />
      <h2 className="mb-4 text-center fw-bold">
        <i className="dx-icon-chart fs-3 me-2"></i> Dashboard Overview
      </h2>
      <div className="row g-3">
        <div className="col-xl-4 col-md-6 col-12">
          <div className="card text-center shadow-sm p-4">
            <i className="dx-icon-group fs-1 text-primary"></i>
            <h5 className="mt-3">Total Employees</h5>
            <p className="fs-3 fw-bold text-primary">{totalEmployees}</p>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-12">
          <div className="card text-center shadow-sm p-4">
            <i className="dx-icon-money fs-1 text-success"></i>
            <h5 className="mt-3">Monthly Revenue</h5>
            <p className="fs-3 fw-bold text-success">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 col-12">
          <div className="card text-center shadow-sm p-4">
            <i className="dx-icon-percent fs-1 text-warning"></i>
            <h5 className="mt-3">Monthly Profit</h5>
            <p className="fs-3 fw-bold text-warning">
              ${totalProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="mb-3">Employees Overview</h4>
        <div className="mb-3 d-flex flex-wrap align-items-center">
          <h5 className="me-3">Filter by Position</h5>
          <SelectBox
            dataSource={positionsStore}
            value={selectedPosition}
            onValueChanged={(e) => setSelectedPosition(e.value)}
            placeholder="Select Position"
            searchEnabled={true}
          />
        </div>
        <CustomDataGrid dataSource={employeesStore} />
      </div>
      <div className="mt-5">
        {salesData.length > 0 ? (
          <CustomChart
            data={salesData}
            chartType="bar"
            title="Sales Performance"
          />
        ) : (
          <p className="text-center text-muted">Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
