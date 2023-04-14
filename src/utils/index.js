import { URL_PROTOCOL, APP_URL } from "../config/appConfig";
import Api from "../services/Api";
import { NoAuthHeader } from "../services/auth";

export const getDeviceType = () => {
  let deviceType = "";

  if (navigator.appVersion.includes("Android")) {
    deviceType = "Android";
  } else if (navigator.appVersion.includes("IOS")) {
    deviceType = "IOS";
  } else if (navigator.appVersion.includes("Win")) {
    deviceType = "Windows";
  } else if (navigator.appVersion.includes("Mac")) {
    deviceType = "Mac OS";
  } else if (navigator.appVersion.includes("Linux")) {
    deviceType = "Linux";
  }

  return deviceType;
};

export const authRedirect = (route) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const redirect_to = urlParams.get("redirect");
  // we are excluding magic link (hash) url because we don't want
  // to retry using a wrong hash after a successful regular login
  const redirectToAfterLogin =
    redirect_to && !redirect_to.includes("hash/") ? redirect_to : route;
  window.location = redirectToAfterLogin;
};

export const isNotLogin = () => {
  let path = window.location;
  const current_page =
    typeof window !== "undefined" ? path.pathname + path.search : "";
  window.location = "/login?redirect=" + current_page;
};

export const removeDuplicateObjectArray = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter((i) => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

export const ArrayCompareAndSort = (a, b) => {
  if (b.createdAt < a.createdAt) {
    return 1;
  }
  if (b.createdAt > a.createdAt) {
    return -1;
  }
  return 0;
};

export const ArrayCompareAndSortData = (a, b) => {
  if (a.created_at < b.created_at) {
    return 1;
  }
  if (a.created_at > b.created_at) {
    return -1;
  }
  return 0;
};

export const ArrayCompareAndSortMsg = (a, b) => {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 0;
};

export const isObject = function (a) {
  return !!a && a.constructor === Object;
};

export const isArray = function (a) {
  return !!a && a.constructor === Array;
};

export const isString = function (a) {
  return typeof a === "string" || a instanceof String;
};

export const printMaxCharacters = (text, characters = 100) => {
  if (text.length > characters) {
    return `${text.substring(0, characters - 3)}...`;
  }
  return text;
};

export const formatDate = (datestring) => {
  let d = new Date(datestring);
  let formattedDate =
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    d.getFullYear();
  // +
  // " " +
  // ("0" + d.getHours()).slice(-2) +
  // ":" +
  // ("0" + d.getMinutes()).slice(-2);
  return formattedDate;
};
