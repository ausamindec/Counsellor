import {
  DELETE_OFFER_SUCCESS,
  EMPTY_COUNSELLOR_OFFER,
  FILL_COUNSELLOR_OFFER,
  GET_OFFERS_FAILED,
  GET_OFFERS_SUCCESS,
} from "../actions/actionType";

const initialOfferState = {
  counsellor: {
    isNew: true,
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
  },
  success: false,
  offers: [],
  error: null,
};
export default function offer(state = initialOfferState, action) {
  switch (action.type) {
    case FILL_COUNSELLOR_OFFER:
      return {
        ...state,
        counsellor: { isNew: false, data: action.data },
      };
    case EMPTY_COUNSELLOR_OFFER:
      return {
        ...state,
        counsellor: { isNew: true, data: action.data },
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        counsellor: initialOfferState.counsellor,
      };
    case GET_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.offers,
        success: true,
        error: null,
      };

    case GET_OFFERS_FAILED: {
      return {
        ...state,
        offers: [],
        success: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
