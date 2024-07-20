import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';
const POST_REVIEW = 'reviews/postReview';
const DELETE_REVIEW = 'reviews/deleteReview';

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

const deleteReview = (deletedReview) => {
  return {
    type: DELETE_REVIEW,
    payload: deletedReview
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

export const postReviewThunk = (reviewForm) => async (dispatch) => {
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

    let res = await csrfFetch(`/api/spots/${spotId}/reviews`, options)

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

export const deleteReviewThunk = (review) => async (dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify(review)
    };

    const res = await csrfFetch(`/api/reviews/${review.id}`, options);

    if (res.ok) {
      const data = await res.json();
      dispatch(deleteReview(data));
    } else {
      throw res
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
    case POST_REVIEW:
      newState = {...state};
      console.log('action payload', action.payload.review);
      newState.spotReviews.Reviews = [action.payload, ...newState.spotReviews.Reviews];
      console.log('spot reviews', state.spotReviews.Reviews);
      newState.byId = {...newState.byId, [action.payload.id]: action.payload};
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
