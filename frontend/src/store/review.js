const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';

const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    payload: reviews
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
