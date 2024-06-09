import axios from "axios";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import {
  SET_CURRENT_USER,
  SET_INVALID_CREDENTIALS,
  SET_INTERNAL_SERVER_ERROR,
  SET_CONNECTION_REFUSED_ERROR,
} from "./types/types";

const URL = "http://localhost:8080";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function setInvalidCredentials(errorStatus) {
  return {
    type: SET_INVALID_CREDENTIALS,
    error: {
      status: errorStatus,
      message:
        "There was an error with your username or password combination. Please try again.",
    },
  };
}

export function setInternalServerError(errorStatus) {
  return {
    type: SET_INTERNAL_SERVER_ERROR,
    error: {
      status: errorStatus,
      message: "An unexpected error occurred. Please try again later.",
    },
  };
}

export function setConnectionRefusedError() {
  return {
    type: SET_CONNECTION_REFUSED_ERROR,
    error: {
      status: 502,
      message: "Bad Gateway - Connection refused. Please try again later.",
    },
  };
}

export function userSignInRequest(userData) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/login`, userData);
      if (res.headers.authorization) {
        // Expect "Bearer "
        const token = res.headers.authorization.substring(
          7,
          res.headers.authorization.length
        );
        localStorage.setItem("token", token);
        setAuthorizationToken(token);
        // dispatch(setCurrentUser(jwtDecode(token)));

        const avatarId = await axios.get(
          `${URL}/users/avatar?username=${userData.username}`
        );
        dispatch(
          setCurrentUser({ ...jwtDecode(token), avatarId: avatarId.data })
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          dispatch(setInvalidCredentials(error.response.status));
        } else {
          dispatch(setInternalServerError(error.response.status));
        }
      } else {
        dispatch(setConnectionRefusedError());
      }
    }
  };
}

export function userSignOutRequest() {
  return (dispatch) => {
    localStorage.removeItem("token");
    // Remove authorization header from future requests.
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
