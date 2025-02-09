export async function fetchEmployees() {
  const response = await fetch("http://localhost:5000/employees");
  return response.json();
}

export async function fetchOrders() {
  const response = await fetch("http://localhost:5000/orders");
  return response.json();
}

export async function fetchAppointments() {
  const response = await fetch("http://localhost:5000/appointments");
  return response.json();
}

export async function fetchSales() {
  const response = await fetch("http://localhost:5000/sales");
  return response.json();
}

export async function fetchProducts() {
  const response = await fetch("http://localhost:5000/products");
  return response.json();
}

export async function fetchStockPrices() {
  const response = await fetch("http://localhost:5000/stock_prices");
  return response.json();
}
