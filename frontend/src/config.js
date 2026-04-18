const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

export const apiUrl = (path = "") => `${API_BASE_URL}${path}`;

export const uploadUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}/uploads/${normalizedPath}`;
};
