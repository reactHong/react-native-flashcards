import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import middleware from './src/middlewares';
import Main from './src/components/Main';

const store = createStore(reducer, middleware);

export default function App() {
  console.log("### [App.render]");

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
