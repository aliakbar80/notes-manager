import Cookies from "js-cookie";
import { location } from "./baseUrl";
import {
  ActonType,
  CrudOptions,
  ErrorResponse,
  methods,
} from "@/types"
import { fixPath } from "./fixPath"; 

export interface RefreshTokenResponse {
  access: string;
}

// Token refresh function
const refreshAccessToken = async (): Promise<RefreshTokenResponse | null> => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await fetch(`${location.origin}/auth/api/v1/jwt/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) throw new Error(`Failed to refresh token. Status: ${response.status}`);

    const newTokenData: RefreshTokenResponse = await response.json();
    Cookies.set("accessToken", newTokenData.access);
    return newTokenData;
  } catch (error) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/login";
    console.error("Error refreshing token:", error);
    return null;
  }
};

// CRUD operation execution function
const performCrudOperation = async (
  url: string,
  options: CrudOptions,
  data?: any,
  formdata = false
): Promise<any> => {
  const defaultHeaders: HeadersInit = formdata ? {} : { "Content-Type": "application/json" };
  const token = Cookies.get("accessToken");
  if (token) defaultHeaders["Authorization"] = `Bearer ${token}`;

  const mergedOptions: CrudOptions = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
    body: data ? (formdata ? data : JSON.stringify(data)) : undefined,
  };

  const finalUrl = new URL(url, location.origin).href;

  try {
    const response = await fetch(finalUrl, mergedOptions);

    if (!response.ok) {
      if (response.status === 401 && Cookies.get("refreshToken")) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          mergedOptions.headers!["Authorization"] = `Bearer ${newAccessToken.access}`;
          return performCrudOperation(url, mergedOptions, data, formdata);
        }
      }
      
      const errorData: ErrorResponse = await response.json().catch(() => ({}));
      throw { message: errorData.message || "Failed CRUD operation", status: response.status, data: errorData } as ErrorResponse;
    }

    return response.json().catch(() => ({ statusCode: response.status }));
  } catch (error) {
    throw error as ErrorResponse;
  }
};

// CRUD operations
export const performPost = (url: string, data: any, formdata = false) => performCrudOperation(url, { method: "POST" }, data, formdata);
export const performGet = (url: string) => performCrudOperation(url, { method: "GET" });
export const performPut = (url: string, data: any) => performCrudOperation(url, { method: "PUT" }, data);
export const performDelete = (url: string, data?: any) => performCrudOperation(url, { method: "DELETE" }, data);

export default performCrudOperation;

// Custom auth-related operations
export const performUser = (acton: ActonType, path: string, data?: any, formdata = false) => {
  return performCrudOperation(`/auth/api/v1/${path}`, { method: methods[acton] }, data, formdata);
};