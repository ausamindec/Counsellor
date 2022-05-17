import axios from "axios";
import { apiUrls } from "../utils/apiUrls";
import {
  FILL_COUNSELLOR_OFFER,
  EMPTY_COUNSELLOR_OFFER,
  DELETE_OFFER_SUCCESS,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAILED,
} from "./actionType";
import { toast } from "react-toastify";

// Get Session Details if any (Counsellor Specific)
export function getCounsellorOffer() {
  return (dispatch) => {
    axios
      .get(apiUrls.getCounsellorOffer())
      .then((response) => {
        // On Success Fill Offer Form
        dispatch(fillCounsellorOffer(response.data.data));
      })
      .catch((error) => {
        // If error log error and empty offer form
        console.log(error.response.data);
        dispatch(
          emptyCounsellorOffer({
            title: "",
            license: "",
            description: "",
            workingDays: [],
            fromTime: "",
            toTime: "",
            expertise: "",
            experience: "",
            price: "",
          })
        );
      });
  };
}

function fillCounsellorOffer(data) {
  return {
    type: FILL_COUNSELLOR_OFFER,
    data,
  };
}

function emptyCounsellorOffer(data) {
  return {
    type: EMPTY_COUNSELLOR_OFFER,
    data,
  };
}

// Delete Session offered by Counsellor (Counsellor Specific)
export function deleteOffer() {
  return (dispatch) => {
    const url = apiUrls.deleteOffer();
    axios
      .delete(url)
      .then((response) => {
        dispatch(deleteOfferSuccess());
        dispatch(getOffers());
      })
      .catch((error) => console.log(error));
  };
}

function deleteOfferSuccess() {
  toast.success("Successfully Deleted.");
  return {
    type: DELETE_OFFER_SUCCESS,
    data: {
      title: "",
      license: "",
      description: "",
      workingDays: [],
      fromTime: "",
      toTime: "",
      expertise: "",
      experience: "",
      price: "",
    },
  };
}

// Add Session Details
export function addCounsellorOffer(data) {
  return (dispatch) => {
    const url = apiUrls.addOffer();
    axios
      .post(url, data)
      .then((response) => {
        {
          toast.success("Successfully Updated.");
          dispatch(fillCounsellorOffer(response.data.data));
          dispatch(getOffers());
        }
      })
      .catch((error) => toast.error(error.response.data.error));
  };
}

// Update or Change data in session
export function updateCounsellorOffer(data) {
  return (dispatch) => {
    const url = apiUrls.getUpdateOffer();
    axios
      .patch(url, data)
      .then((response) => {
        toast.success("Successfully Updated.");
        dispatch(fillCounsellorOffer(response.data.data));
        dispatch(getOffers());
      })
      .catch((error) => toast.error(error.response.data.error));
  };
}

// Get Offers to display on main page (Any User)
export function getOffers() {
  return (dispatch) => {
    const url = apiUrls.getOffers();
    axios
      .get(url)
      .then((response) => dispatch(getOffersSuccess(response.data)))
      .catch((error) => getOffersFailed(error.response.data));
  };
}

function getOffersSuccess(response) {
  return {
    type: GET_OFFERS_SUCCESS,
    offers: response.offers,
  };
}

function getOffersFailed(response) {
  return {
    type: GET_OFFERS_FAILED,
    error: response.error,
  };
}
