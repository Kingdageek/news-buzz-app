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

export const Numeric = (length) => {
  var result = "";
  var characters = "012345678901234567890123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const sharePage = async (url, message) => {
  let links = URL_PROTOCOL + APP_URL + url;

  const shareData = { title: "Prova Sharing", text: message, url: links };
  try {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Sharing failed", err);
    }
  } catch (err) {}
};

export const validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
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

export const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
