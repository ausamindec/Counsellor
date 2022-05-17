import {
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  UPLOAD_PHOTO_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actions/actionType";

const initialUserState = { userDetail: {}, isLoggedIn: false, error: null };
export default function user(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        userDetail: { ...action.userDetail },
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialUserState,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        userDetail: { ...action.userDetail },
      };
    case GET_USER_DETAIL_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        // error: action.error,
      };
    case UPLOAD_PHOTO_SUCCESS:
      let { userDetail } = state;
      userDetail.photo = action.photo;
      return {
        ...state,
        userDetail,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userDetail: action.userDetail,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
