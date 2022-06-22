import {GOOGLE_API_KEY, GOOGLE_PACES_API_BASE_URL} from '../configureStore';

export const MAPDATA = 'MAPDATA';
export const TAPPEDPREDICTIONS = 'TAPPEDPREDICTIONS';

export const getMapData = searchTerm => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${searchTerm}`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      if (resData) {
        dispatch({type: MAPDATA, value: resData});
      }
    } catch (err) {
      throw err;
    }
  };
};

export const onTapPrediction = async placeId => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      if (response) {
        dispatch({type: TAPPEDPREDICTIONS, value: response});
      }
    } catch (e) {
      console.log(e);
    }
  };
};
