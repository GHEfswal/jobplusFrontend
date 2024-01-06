import axios from "axios";
import { parseErrors } from "../utils/parseErrors";
import { useCookie } from "./useCookie";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useApi = () => {
  const { getAuthCookie } = useCookie();

  const token = getAuthCookie();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["X-User-Id"] = 28;
  }

  const request = async (endpoint, options = {}) => {
    try {
      const res = await axios({
        method: options.method || "GET",
        url: `${BACKEND_URL}/${endpoint}`,
        data: options.data || {},
        params: options.params || {},
      });

      options.onSuccess && options.onSuccess(res);
      //
    } catch (error) {
      options.onFailure && options.onFailure(parseErrors(error));
    }
  };

  return {
    post: (endpoint, options) =>
      request(endpoint, { ...options, method: "POST" }),

    get: (endpoint, options) =>
      request(endpoint, { ...options, method: "GET" }),

    put: (endpoint, options) =>
      request(endpoint, { ...options, method: "PUT" }),

    delete: (endpoint, options) =>
      request(endpoint, { ...options, method: "DELETE" }),
  };
};
