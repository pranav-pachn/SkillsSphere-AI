import { apiRequest } from "./apiClient";

export const register = ({ name, email, password, role }) =>
  apiRequest("/api/auth/register", {
    method: "POST",
    body: { name, email, password, role },
  });

export const login = ({ email, password }) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });

export const verifyEmail = ({ email, otp }) =>
  apiRequest("/api/auth/verify-email", {
    method: "POST",
    body: { email, otp },
  });

export const resendOtp = ({ email }) =>
  apiRequest("/api/auth/resend-otp", {
    method: "POST",
    body: { email },
  });

export const getCurrentUser = () => {
  // Retrieve token from storage (authSlice stores it in localStorage or sessionStorage)
  const token = 
    localStorage.getItem("skillssphere.auth.token") || 
    sessionStorage.getItem("skillssphere.auth.token");

  return apiRequest("/api/auth/me", {
    method: "GET",
    token,
  });
};
