import React, { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  fetchSales,
  fetchOrders,
  fetchProducts,
  fetchStockPrices,
} from "../utils/fetchData";
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
const CHART_CLASS = "shadow-sm mt-4 border p-0 p-md-3 w-100";
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
  const [
    { data: sales, isLoading: loadingSales, error: salesError },
    { data: orders, isLoading: loadingOrders, error: ordersError },
    { data: products, isLoading: loadingProducts, error: productsError },
    {
      data: stockPrices,
      isLoading: loadingStockPrices,
      error: stockPricesError,
    },
  ] = useQueries({
    queries: [
      { queryKey: ["sales"], queryFn: fetchSales, staleTime: 1000 * 60 * 5 },
      { queryKey: ["orders"], queryFn: fetchOrders, staleTime: 1000 * 60 * 5 },
      {
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["stockPrices"],
        queryFn: fetchStockPrices,
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  const [selectedYear, setSelectedYear] = useState("All");

  const years = useMemo(
    () => (sales ? ["All", ...new Set(sales.map((s) => s.year))] : ["All"]),
    [sales]
  );

  const filteredSales = useMemo(
    () =>
      sales?.filter((s) => selectedYear === "All" || s.year === selectedYear),
    [sales, selectedYear]
  );

  const groupedOrders = useMemo(() => {
    if (!orders) return [];
    return Object.values(
      orders.reduce((acc, order) => {
        if (!acc[order.status])
          acc[order.status] = { status: order.status, total_price: 0 };
        acc[order.status].total_price += order.total_price;
        return acc;
      }, {})
    );
  }, [orders]);

  const formattedStockPrices = useMemo(() => {
    if (!stockPrices) return [];
    return stockPrices.map((sp) => ({ ...sp, range: sp.high - sp.low }));
  }, [stockPrices]);

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
