import axiosClient from "./axiosClient";

const authAPI = {
  login: (params) => {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  logout: () => {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
  register: (params) => {
    const url = "/auth/register";
    return axiosClient.post(url, params);
  },
};

export default authAPI;
