const BASE_URL = "https://devextreme-uqem.vercel.app/api"; // غير اللينك لو اللينك مختلف

export async function fetchEmployees() {
  const response = await fetch(`${BASE_URL}/employees`);
  return response.json();
}

export async function fetchOrders() {
  const response = await fetch(`${BASE_URL}/orders`);
  return response.json();
}

export async function fetchAppointments() {
  const response = await fetch(`${BASE_URL}/appointments`);
  return response.json();
}

export async function fetchSales() {
  const response = await fetch(`${BASE_URL}/sales`);
  return response.json();
}

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

export async function fetchStockPrices() {
  const response = await fetch(`${BASE_URL}/stock_prices`);
  return response.json();
}
