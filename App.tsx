import React, {useState, useCallback} from 'react';
import {createStore, combineReducers} from 'redux';

import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {
  storeMapReducer,
  onTapPredictionReducer,
} from './src/store/reducres/storeMapReducer';

import {ScreenNavigator} from './src/navigation/ScreenNavigator';

const App = () => {
  const rootReducer = combineReducers({
    mapData: storeMapReducer,
    onTapPrediction: onTapPredictionReducer,
  });

  const Store = createStore(rootReducer);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <ScreenNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
