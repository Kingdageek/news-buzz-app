import Api from "../Api";
import { NEWSBUZZ_CORE_URL } from "../../config/appConfig";
import { AuthHeader, Logout } from "../auth";

export const FetchUserFeed = async (userId, callback) => {
  let response = null;
  let endpoint = `/api/v1/users/feeds/${userId}`;
  // console.log(AuthHeader());
  return Api(NEWSBUZZ_CORE_URL)
    .get(endpoint, { headers: AuthHeader() })
    .then((res) => {
      if (res) {
        let { data } = res;
        console.log(res);
        if (res.status === 200) {
          response = data;
        } else {
          response = data;
        }
        return callback(response);
      }
    })
    .catch((error) => {
      console.log(error);
      const { data, status } = error.response;
      if (status === 401) {
        // unauthorized
        // log user out
        Logout();
      }
      return callback({ ...data });
    });
};
