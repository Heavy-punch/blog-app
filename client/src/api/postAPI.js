import axiosClient from "./axiosClient";

const postAPI = {
  getPostsByCat: (param) => {
    const url = `/posts${param}`;
    return axiosClient.get(url);
  },
  getSinglePost: (param) => {
    const url = `/posts/${param}`;
    return axiosClient.get(url);
  },
  deletePost: (param) => {
    const url = `/posts/${param}`;
    return axiosClient.delete(url);
  },
  uploadImage: (param) => {
    const url = `/upload`;
    return axiosClient.post(url, param);
  },
  createPost: (param) => {
    const url = `/posts`;
    return axiosClient.post(url, param);
  },
  updatePost: (params) => {
    const url = `/posts/${params.id}`;
    return axiosClient.put(url, params.body);
  },
};

export default postAPI;
