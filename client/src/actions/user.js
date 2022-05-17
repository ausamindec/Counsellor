import axios from "axios";
import { apiUrls } from "../utils/apiUrls";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "./actionType";
import { toast } from "react-toastify";

// Login Actions
export function login(data) {
  return (dispatch) => {
    const url = apiUrls.login();
    axios
      .post(url, data)
      .then((response) => dispatch(loginSuccess(response)))
      .catch((error) => dispatch(loginFailed(error.response.data)));
  };
}

function loginSuccess(response) {
  toast.success("Successfully Logged In");
  return {
    type: LOGIN_SUCCESS,
    userDetail: response.data.user,
  };
}

function loginFailed(response) {
  toast.error(response.error);
  return {
    type: LOGIN_FAILED,
    error: response.error,
  };
}

// Logout Actions
export function logout() {
  return (dispatch) => {
    const url = apiUrls.logout();
    axios
      .get(url)
      .then(() => dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFailed(error.response.data)));
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

function logoutFailed(response) {
  return {
    type: LOGOUT_FAILED,
    error: response.error,
  };
}

// Signup
export function signup(data) {
  return (dispatch) => {
    const url = apiUrls.signup();
    axios
      .post(url, data)
      .then((response) => dispatch(signupSuccess(response)))
      .catch((error) => signupFailed(error.response.data));
  };
}

function signupSuccess(response) {
  toast.success("Successfully Registered.");
  return { type: SIGNUP_SUCCESS, userDetail: response.data.user };
}

function signupFailed(response) {
  toast.error(response.error);
  return {
    type: SIGNUP_FAILED,
    error: response.error,
  };
}

// Authenticating - Getting User Detail
export function getUserDetail() {
  return (dispatch) => {
    const url = apiUrls.getUser();
    axios
      .get(url)
      .then((response) => dispatch(getUserDetailSuccess(response)))
      .catch((error) => dispatch(getUserDetailFailed(error.response.data)));
  };
}

function getUserDetailSuccess(response) {
  return {
    type: GET_USER_DETAIL_SUCCESS,
    userDetail: response.data.user,
  };
}

function getUserDetailFailed(response) {
  return {
    type: GET_USER_DETAIL_FAILED,
    error: response.error,
  };
}

// Change Photo
export function uploadPhoto(data) {
  return (dispatch) => {
    const url = apiUrls.uploadPhoto();
    axios
      .patch(url, data)
      .then((response) => dispatch(uploadPhotoSuccess(response)))
      .catch((error) => dispatch(uploadPhotoFailed(error.response.data)));
  };
}

function uploadPhotoSuccess(response) {
  toast.success("Successfully Updated.");
  return {
    type: UPLOAD_PHOTO_SUCCESS,
    photo: response.data.photo,
  };
}

function uploadPhotoFailed(response) {
  toast.error(response.error);
  return {
    type: UPLOAD_PHOTO_FAILED,
    error: response.error,
  };
}

// Change User Data
export function updateUser(data) {
  return (dispatch) => {
    const url = apiUrls.updateUser();
    axios
      .patch(url, data)
      .then((response) => dispatch(updateUserSuccess(response)))
      .catch((error) => dispatch(updateUserFailed(error.response.data)));
  };
}

function updateUserSuccess(response) {
  toast.success("Successfully Updated.");
  return {
    type: UPDATE_USER_SUCCESS,
    userDetail: response.data.user,
  };
}

function updateUserFailed(response) {
  toast.error(response.error);
  return {
    type: UPDATE_USER_FAILED,
    error: response.error,
  };
}

// Test Route
export function testRoute(data) {
  return (dispatch) => {
    axios
      .post(apiUrls.testRoute(), data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
}
