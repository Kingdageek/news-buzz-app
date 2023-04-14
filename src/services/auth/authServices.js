import Api from "../Api";
import { NEWSBUZZ_CORE_URL } from "../../config/appConfig";
import { isNotLogin } from "../../utils";

const tokenKey = "nb_token";
const user_details = "user_details";

export const getToken = () => {
  try {
    return localStorage.getItem(tokenKey);
  } catch (e) {
    return null;
  }
};

export const setUserDetails = (data, token) => {
  try {
    localStorage.setItem(user_details, JSON.stringify(data));
    if (token) {
      localStorage.setItem(tokenKey, JSON.stringify(token));
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const AuthHeader = () => {
  const AuthString = "Bearer ".concat(getToken());
  return { "Content-Type": "application/json", Authorization: AuthString };
};

export const NoAuthHeader = () => {
  return { "Content-Type": "application/json" };
};

export const Logout = () => {
  localStorage.removeItem(user_details);
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    let userObj = JSON.parse(localStorage.getItem(user_details));
    if (userObj === undefined || userObj === null) {
      isNotLogin();
    }
    return userObj;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserNoAuth = () => {
  const userObj = JSON.parse(localStorage.getItem(user_details));
  if (userObj === undefined || userObj === null) {
    return null;
  }
  return userObj;
};

export const LoginService = async (payload, callback) => {
  let response = null;
  let auth_endpoint = "api/v1/login";

  Api(NEWSBUZZ_CORE_URL)
    .post(auth_endpoint, payload, { headers: NoAuthHeader() })
    .then((res) => {
      if (res) {
        let { data } = res;
        if (res.status === 200) {
          let token = data.data.access_token;
          setUserDetails(data.data, token);
          response = data;
        } else {
          response = data;
        }
        return callback(response);
      }
    })
    .catch(({ response: { data } }) => {
      return callback({ ...data });
    });
};

export const RegisterService = async (payload, callback) => {
  let response = null;
  Api(NEWSBUZZ_CORE_URL)
    .post("/api/v1/register", payload, { headers: NoAuthHeader() })
    .then((res) => {
      if (res) {
        let { data } = res;
        if (res.status === 201) {
          response = data;
        } else {
          response = { ...data, message: data.message };
        }
        return callback(response);
      }
    })
    .catch(({ response: { data } }) => {
      return callback({ ...data, message: data.message });
    });
};
