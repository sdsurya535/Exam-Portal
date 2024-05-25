import BaseUrl from "../api/BaseUrl";
import axiosInstance from "./intercepter";

export class AuthService {
  getCurrentUser = () => {
    return axiosInstance.get(`${BaseUrl}/current-user`);
  };
  loginUser = (token) => {
    return localStorage.setItem("jwtToken", token);
  };

  //LOGIN
  isLoggedIn = () => {
    let token = localStorage.getItem("jwtToken");
    if (token == undefined || token == "" || token == null) {
      return false;
    } else {
      return true;
    }
  };

  //LOGOUT
  logOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    return true;
  };
  //GET TOKEN
  getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  getUser = () => {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut();
      return null;
    }
  };

  getUserRole = () => {
    let user = this.getUser();
    return user.authorities[0].authority;
  };
}

const authService = new AuthService();

export default authService;
