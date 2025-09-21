import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const responseBody = (response) => response.data;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  console.log(document.cookie);
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axiosInstance.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error) => {
    console.log(error.message);

    return Promise.reject(error);
  }
);

const request = {
  get: (url) => axiosInstance.get(url).then(responseBody),
  post: (url, body) => axiosInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosInstance.put(url, body).then(responseBody),
  delete: (url) => axiosInstance.delete(url).then(responseBody),
};

const authentication = {
  login: (credentials) => request.post("/auth/login", credentials),
  register: (userData) => request.post("/auth/register", userData),
  updateProfile: (userData) => request.put("/auth/updateProfile", userData),
  logout: () => request.post("/auth/logout"),
  getCurrentUser: () => request.get("/auth/me"),
};

const EmailService = {
  sendOtp: (to, subject, body) =>
    request.post(
      `/email/send?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    ),
};

const PostingService = {
  createPost: (message, email) =>
    request.post(
      `/CreatePost?message=${encodeURIComponent(
        message
      )}&email=${encodeURIComponent(email)}`
    ),
  getPosts: () => request.get("/getMyPosts"),
  getPostById: (id) => request.get(`/posts/${id}`),
  updatePost: (id, postData) => request.put(`/posts/${id}`, postData),
  deletePost: (postId) => request.delete(`/DeletePost/${postId}`),
  getDashBoardPosts: () => request.get("/getDashboardPosts"),
};

const user = {
  getAllUser: () => request.get("/GetAllUsers"),
};

const chat = {
  sendMessage: (user, text) => request.post("/Message", { user, text }),
};

const connections = {
  sendRequest: (recieverName) =>
    request.post(`/sendRequest?recieverName=${recieverName}`),
  acceptRequest: (recieverName) =>
    request.post(`/acceptRequest?recieverName=${recieverName}`),
  activeRequests: () => request.get("/Requests"),
  sentRequests: () => request.get("/RequestSent"),
  GetFriends: () => request.get("/GetFriends"),
};

const apicall = {
  authentication,
  EmailService,
  PostingService,
  user,
  chat,
  connections,
};
export default apicall;
