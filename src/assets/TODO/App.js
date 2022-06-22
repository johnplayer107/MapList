import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ScreenNavigator from './navigation/ScreenNavigator';
import TodoReducer from './store/reducers/TodoReducer';

const rootReducer = combineReducers({
    todo:TodoReducer
});

const Store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={Store}>
         <ScreenNavigator/>
    </Provider>
  );
}
