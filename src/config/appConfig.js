let NEWSBUZZ_CORE_URL = "";
let APP_URL = "";
let NEXTJS_APP_URL = "";
let URL_PROTOCOL = "";
const APP_NAME = "News-Buzz";

if (process.env.REACT_APP_WEB_ENV === "backend_dev") {
  NEWSBUZZ_CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
  NEXTJS_APP_URL = "localhost:3000";
} else if (process.env.REACT_APP_WEB_ENV === "staging") {
  NEWSBUZZ_CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
  NEXTJS_APP_URL = "localhost:3000";
} else if (process.env.REACT_APP_WEB_ENV === "prod") {
  NEWSBUZZ_CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
  NEXTJS_APP_URL = "localhost:3000";
} else {
  NEWSBUZZ_CORE_URL = "http://localhost:80";
  APP_URL = "localhost:3000";
  URL_PROTOCOL = "http://";
  NEXTJS_APP_URL = "localhost:3000";
}

export { APP_URL, NEWSBUZZ_CORE_URL, APP_NAME, URL_PROTOCOL };
