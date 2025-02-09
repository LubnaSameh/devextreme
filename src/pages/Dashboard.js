import React, { useEffect, useState, useMemo } from "react";
import SelectBox from "devextreme-react/select-box";
import LoadPanel from "devextreme-react/load-panel";
import CustomStore from "devextreme/data/custom_store";
import { CustomDataGrid, CustomChart } from "../components";

const employees = [
  { id: 1, name: "Ahmed Mohamed", position: "Software Engineer", salary: 15000 },
  { id: 2, name: "Sara Ali", position: "Product Manager", salary: 20000 },
  { id: 3, name: "Khaled Hassan", position: "HR Manager", salary: 18000 },
  { id: 4, name: "Layla Samir", position: "Marketing Specialist", salary: 14000 },
  { id: 5, name: "Omar Youssef", position: "UI/UX Designer", salary: 16000 },
];

const sales = [
  { month: "January", year: 2023, revenue: 12000, expenses: 5000, profit: 7000 },
  { month: "February", year: 2023, revenue: 15000, expenses: 6000, profit: 9000 },
  { month: "March", year: 2023, revenue: 18000, expenses: 7000, profit: 11000 },
  { month: "April", year: 2023, revenue: 20000, expenses: 7500, profit: 12500 },
  { month: "January", year: 2024, revenue: 22000, expenses: 8000, profit: 14000 },
  { month: "February", year: 2024, revenue: 25000, expenses: 9000, profit: 16000 },
];

const positionsStore = new CustomStore({
  loadMode: "raw",
  load: async () => ["All", ...new Set(employees.map((emp) => emp.position))],
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

  const employeesStore = useMemo(() => {
    return new CustomStore({
      key: "id",
      loadMode: "raw",
      load: async () => {
        if (selectedPosition === "All") return employees;
        return employees.filter((emp) => emp.position === selectedPosition);
      },
      byKey: async (key) => employees.find((emp) => emp.id === key),
    });
  }, [selectedPosition]);

  useEffect(() => {
    animateValue(setTotalEmployees, 0, employees.length, 1500);
    animateValue(
      setTotalRevenue,
      0,
      sales.reduce((sum, s) => sum + s.revenue, 0),
      1500
    );
    animateValue(
      setTotalProfit,
      0,
      sales.reduce((sum, s) => sum + s.profit, 0),
      1500
    );
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
        {/* لما تبقى تعمل Refresh للـ store وبيفلتر فعلياً دلوقتي */}
        <CustomDataGrid dataSource={employeesStore} />
      </div>

      <div className="mt-5">
        {sales.length > 0 ? (
          <CustomChart data={sales} chartType="bar" title="Sales Performance" />
        ) : (
          <p className="text-center text-muted">Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
