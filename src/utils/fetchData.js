const BASE_URL = process.env.REACT_APP_API_URL || "https://devextreme-dashboard.vercel.app/api";

// Function to fetch data with error handling
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Exported functions for specific data fetching
export const fetchEmployees = () => fetchData("employees");
export const fetchOrders = () => fetchData("orders");
export const fetchAppointments = () => fetchData("appointments");
export const fetchSales = () => fetchData("sales");
export const fetchProducts = () => fetchData("products");
export const fetchStockPrices = () => fetchData("stock_prices");
