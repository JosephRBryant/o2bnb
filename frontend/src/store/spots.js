import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const GET_USER_SPOTS = 'spots/getUserSpots';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = 'spots/deleteSpot';

const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots
  }
}

const getSpotDetails = (spotDetails) => {
  return {
    type: GET_SPOT_DETAILS,
    payload: spotDetails
  }
}

const getUserSpots = (userSpots) => {
  return {
    type: GET_USER_SPOTS,
    payload: userSpots
  }
}

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot
  }
}

const deleteSpot = (deletedSpot) => {
  return {
    type: DELETE_SPOT,
    payload: deletedSpot
  }
}

export const getAllSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
      const data = await res.json();
      await dispatch(getAllSpots(data))
    } else {
      throw res;
    }
  } catch(error) {
    return error;
  }
}

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
      // step 5
      const data = await res.json();
      await dispatch(getSpotDetails(data))
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
}

export const getUserSpotsThunk = (userId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/current`);
    if (res.ok) {
      const data = await res.json();
      console.log('user spots', data);
      await dispatch(getUserSpots(data))
    } else {
      throw res
    }
  } catch (error) {
    return error;
  }
}

export const createSpotThunk = (spotForm) => async (dispatch) => {
  try {
    const {address, city, state, country, lat, lng, name, description, price, previewImage, imageA, imageB, imageC, imageD} = spotForm;

    const spotData = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
      imageA,
      imageB,
      imageC,
      imageD
    }

    for (let data in spotData) {
      if (data === undefined || data === '') {
        console.log('data missing or undefined', data);
        delete spotData[data]
      }
    }

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spotData)
    }

    let res = {}
    if (spotData.previewImage) {
      res = await csrfFetch('/api/spots', options);
    }

    if (res.ok) {
      const data = await res.json();
      await dispatch(createSpot(data));
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
}

export const deleteSpotThunk = (spot) => async (dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
    };

    const res = await csrfFetch(`/api/spots/${spot.id}`, options);

    if (res.ok) {
      const data = await res.json();
      dispatch(deleteSpot(data))
    } else {
      throw res
    }
  } catch (error) {
    return error;
  }
}

const initialState = {
  allSpots: [],
  byId: {},
  spotDetails: {},
  userSpots: []
}

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_ALL_SPOTS:
      newState = {...state};
      newState.allSpots = action.payload.Spots

      for (let spot of action.payload.Spots) {
        newState.byId[spot.id] = spot
      }
      return newState;
    case GET_SPOT_DETAILS:
      newState = {...state};
      // build out spotDetails
      newState.spotDetails = action.payload;

      // build out the byId
      for (let spot in action.payload) {
        newState.byId[spot.id] = spot;
      }
      return newState;
    case GET_USER_SPOTS:
      newState = {...state};
      newState.userSpots = action.payload.Spots;
      for (let spot of action.payload.Spots) {
        newState.byId[spot.id] = spot
      }
      return newState;
    case CREATE_SPOT:
      newState = {...state};
      newState.allSpots = [action.payload, ...newState.allSpots];
      newState.byId = {...newState.byId, [action.payload.id]: action.payload};
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
