import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import reducer from './src/reducers';
import middleware from './src/middlewares';
import Main from './src/components/Main';
import { initializeNotification } from './src/utils/notification';

const store = createStore(reducer, middleware);

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    initializeNotification();
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // console.log("[App.addNotificationReceivedListener] notification:", notification);
      // alert(notification.request.content.title);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log("[App.addNotificationResponseReceivedListener] response:", response);
    });  

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}





