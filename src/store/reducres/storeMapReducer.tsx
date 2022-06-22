import {MAPDATA, TAPPEDPREDICTIONS} from '../actions/storeMapAction';

const intialState = {
  mapData: [],
  prediction: [],
};

export const storeMapReducer = (state = intialState, action) => {
  switch (action.type) {
    case MAPDATA:
      return {...state, mapData: state.mapData.concat(action.value)};
      break;
    default:
      return state;
  }

  return state;
};

export const onTapPredictionReducer = (state = intialState, action) => {
  switch (action.type) {
    case TAPPEDPREDICTIONS:
      return {...state, prediction: state.prediction.concat(action.value)};
      break;

    default:
      return state;
  }

  return state;
};
