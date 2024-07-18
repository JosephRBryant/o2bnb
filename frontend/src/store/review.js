import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';
const POST_REVIEW = 'reviews/postReview';

const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload: reviews
  }
}

const postReview = (review) => {
  return {
    type: POST_REVIEW,
    payload: review
  }
}

export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getSpotReviews(data))
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
}

export const postReviewThunk = (reviewForm, spotId) => async (dispatch) => {
  try {
    const {userId, spotId, review, stars} = reviewForm;

    const reviewData = {
      userId,
      spotId,
      review,
      stars
    }

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reviewData)
    }

    let res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
      const data = await res.json();
      await dispatch(postReview(data));
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
}

const initialState = {
  spotReviews: [],
  byId: {}
}

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_SPOT_REVIEWS:
      newState = {...state};
      newState.spotReviews = action.payload

      for (let review in action.payload) {
        newState.byId[review.id] = review
      }
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
