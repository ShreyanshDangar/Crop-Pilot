import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || !error.response) {
      return Promise.reject({
        message: "Cannot connect to Crop Pilot services. Make sure the backend server and the Vite dev proxy are running.",
        status: 0,
      });
    }

    const contentType = error.response.headers?.["content-type"] || "";
    const backendMessage = error.response?.data?.message;
    const isStructuredError = typeof backendMessage === "string" && backendMessage.length > 0;
    const isUnexpectedGatewayResponse = !contentType.includes("application/json") && !isStructuredError;

    let message = backendMessage || error.message || "Something went wrong";
    if (isUnexpectedGatewayResponse) {
      message = "Crop Pilot received an unexpected response before reaching the backend. Check the API proxy target and backend port.";
    }

    return Promise.reject({
      message,
      status: error.response?.status,
    });
  }
);

export default api;
