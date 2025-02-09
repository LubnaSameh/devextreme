import React, { useState } from "react";
import PieChart, { Label, Connector } from "devextreme-react/pie-chart";
import {
  Chart,
  Series,
  Legend,
  Tooltip,
  ArgumentAxis,
  ValueAxis,
  Title,
  ZoomAndPan,
  Export,
} from "devextreme-react/chart";
import { SelectBox } from "devextreme-react/select-box";
import { LoadIndicator } from "devextreme-react/load-indicator";

// Comment: بيانات ثابتة (Static Data)
const sales = [
  {
    month: "January",
    year: 2023,
    revenue: 12000,
    expenses: 5000,
    profit: 7000,
  },
  {
    month: "February",
    year: 2023,
    revenue: 15000,
    expenses: 6000,
    profit: 9000,
  },
  { month: "March", year: 2023, revenue: 18000, expenses: 7000, profit: 11000 },
  { month: "April", year: 2023, revenue: 20000, expenses: 7500, profit: 12500 },
  {
    month: "January",
    year: 2024,
    revenue: 22000,
    expenses: 8000,
    profit: 14000,
  },
  {
    month: "February",
    year: 2024,
    revenue: 25000,
    expenses: 9000,
    profit: 16000,
  },
];

const orders = [
  {
    id: 101,
    customer_name: "Omar Ali",
    order_date: "2024-02-05",
    status: "Pending",
    total_price: 2500,
  },
  {
    id: 102,
    customer_name: "Nour Hassan",
    order_date: "2024-02-06",
    status: "Completed",
    total_price: 5000,
  },
  {
    id: 103,
    customer_name: "Layla Ahmed",
    order_date: "2024-02-07",
    status: "Shipped",
    total_price: 3200,
  },
  {
    id: 104,
    customer_name: "Karim Adel",
    order_date: "2024-02-08",
    status: "Pending",
    total_price: 2800,
  },
];

const products = [
  { id: 301, name: "Laptop", price: 1500, category: "Electronics", stock: 25 },
  {
    id: 302,
    name: "Smartphone",
    price: 800,
    category: "Electronics",
    stock: 50,
  },
  { id: 303, name: "Desk Chair", price: 200, category: "Furniture", stock: 10 },
  { id: 304, name: "Monitor", price: 300, category: "Electronics", stock: 30 },
];

const stockPrices = [
  { date: "2024-02-01", open: 1400, high: 1550, low: 1380, close: 1500 },
  { date: "2024-02-02", open: 1500, high: 1600, low: 1450, close: 1580 },
  { date: "2024-02-03", open: 1580, high: 1650, low: 1550, close: 1620 },
  { date: "2024-02-04", open: 1620, high: 1700, low: 1600, close: 1680 },
  { date: "2024-02-05", open: 1680, high: 1750, low: 1650, close: 1720 },
  { date: "2024-02-06", open: 1720, high: 1800, low: 1700, close: 1780 },
];

const loadingSales = false;
const salesError = null;
const loadingOrders = false;
const ordersError = null;
const loadingProducts = false;
const productsError = null;
const loadingStockPrices = false;
const stockPricesError = null;
const ChartWrapper = React.memo(({ loading, error, data, children }) => {
  if (loading)
    return (
      <div className="text-center p-4">
        <LoadIndicator visible={true} />
      </div>
    );
  if (error)
    return <p className="text-danger text-center">⚠️ Failed to load data!</p>;
  if (!data || data.length === 0)
    return <p className="text-center text-muted">No data available.</p>;
  return children;
});

const Reports = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const years = sales.length
    ? ["All", ...new Set(sales.map((s) => s.year))]
    : ["All"];
  const filteredSales =
    selectedYear === "All"
      ? sales
      : sales.filter((s) => s.year === selectedYear);

  // Comment: group orders by status
  const groupedOrders = Object.values(
    orders.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = { status: order.status, total_price: 0 };
      }
      acc[order.status].total_price += order.total_price;
      return acc;
    }, {})
  );

  // Comment: add range for bubble chart
  const formattedStockPrices = stockPrices.map((sp) => ({
    ...sp,
    range: sp.high - sp.low,
  }));

  // Comment: chart configs
  const CHART_CLASS = "shadow-sm mt-4 border p-0 p-md-3 w-100";
  const chartsConfig = [
    {
      id: "lineChart",
      data: filteredSales,
      loading: loadingSales,
      error: salesError,
      chart: (
        <Chart dataSource={filteredSales} className={CHART_CLASS}>
          <Title text="Monthly Sales Trends" />
          <ArgumentAxis title="Month" />
          <ValueAxis title="Amount ($)" />
          <Series
            type="line"
            valueField="revenue"
            argumentField="month"
            name="Revenue"
            color="#28a745"
          />
          <Series
            type="line"
            valueField="expenses"
            argumentField="month"
            name="Expenses"
            color="#dc3545"
          />
          <Series
            type="line"
            valueField="profit"
            argumentField="month"
            name="Profit"
            color="#007bff"
          />
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <ZoomAndPan argumentAxis="both" />
          <Export enabled={true} />
        </Chart>
      ),
    },
    {
      id: "bubbleChart",
      data: formattedStockPrices,
      loading: loadingStockPrices,
      error: stockPricesError,
      chart: (
        <Chart dataSource={formattedStockPrices} className={CHART_CLASS}>
          <Title text="Stock Prices Overview" />
          <ArgumentAxis title="Open Price" />
          <ValueAxis title="Close Price" />
          <Series
            type="bubble"
            argumentField="open"
            valueField="close"
            sizeField="range"
            name="Stock Prices"
            color="#3498db"
          />
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <Export enabled={true} />
        </Chart>
      ),
    },
    {
      id: "pieChart",
      data: sales,
      loading: loadingSales,
      error: salesError,
      chart: (
        <PieChart dataSource={sales} className={CHART_CLASS}>
          <Title text="Expense Breakdown by Month" />
          <Series argumentField="month" valueField="expenses">
            <Label visible={true}>
              <Connector visible={true} />
            </Label>
          </Series>
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <Export enabled={true} />
        </PieChart>
      ),
    },
    {
      id: "ordersBarChart",
      data: groupedOrders,
      loading: loadingOrders,
      error: ordersError,
      chart: (
        <Chart dataSource={groupedOrders} className={CHART_CLASS}>
          <Title text="Orders by Status" />
          <ArgumentAxis />
          <ValueAxis />
          <Series
            type="bar"
            valueField="total_price"
            argumentField="status"
            name="Orders"
            color="#ff9800"
          />
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <Export enabled={true} />
        </Chart>
      ),
    },
    {
      id: "productsBarChart",
      data: products,
      loading: loadingProducts,
      error: productsError,
      chart: (
        <Chart dataSource={products} rotated={true} className={CHART_CLASS}>
          <Title text="Top Selling Products" />
          <ArgumentAxis />
          <ValueAxis />
          <Series
            type="bar"
            valueField="price"
            argumentField="name"
            name="Products"
            color="#673ab7"
          />
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <Export enabled={true} />
        </Chart>
      ),
    },
    {
      id: "areaChart",
      data: filteredSales,
      loading: loadingSales,
      error: salesError,
      chart: (
        <Chart dataSource={filteredSales} className={CHART_CLASS}>
          <Title text="Revenue vs Expenses" />
          <Series
            type="area"
            valueField="revenue"
            argumentField="month"
            name="Revenue"
            color="#2ecc71"
          />
          <Series
            type="area"
            valueField="expenses"
            argumentField="month"
            name="Expenses"
            color="#e74c3c"
          />
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <Export enabled={true} />
        </Chart>
      ),
    },
    {
      id: "funnelChart",
      data: groupedOrders,
      loading: loadingOrders,
      error: ordersError,
      chart: (
        <PieChart
          dataSource={groupedOrders}
          className={CHART_CLASS}
          type="doughnut"
        >
          <Title text="Sales Funnel" />
          <Series argumentField="status" valueField="total_price">
            <Label visible={true}>
              <Connector visible={true} />
            </Label>
          </Series>
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Tooltip enabled={true} />
          <Export enabled={true} />
        </PieChart>
      ),
    },
  ];

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 text-center fw-bold">Reports & Analytics</h2>
      <div className="d-flex flex-column justify-content-start align-items-start mb-4 flex-wrap">
        <label className="fw-bold mb-1">Select Year:</label>
        <SelectBox
          dataSource={years}
          value={selectedYear}
          onValueChanged={(e) => setSelectedYear(e.value)}
          className="me-3"
          placeholder="Select Year"
          showClearButton={true}
        />
      </div>

      {chartsConfig.map(({ id, data, loading, error, chart }) => (
        <ChartWrapper key={id} loading={loading} error={error} data={data}>
          {chart}
        </ChartWrapper>
      ))}
    </div>
  );
};

export default React.memo(Reports);
