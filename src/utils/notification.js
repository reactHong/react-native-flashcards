import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { getNotification, setNotification, removeNotification } from './api';

Notifications.setNotificationHandler({
  handlerNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const initializeNotification = () => {
  registerForPushNotificationsAsync().then(token => {
    // setPushToken(token);
  });
  schedulePushNotification();
};

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};

export const schedulePushNotification = async (tomorrow) => {

  const content = {
    title: "Study!!",
    body: "It's time to study with your flashcards! 📚",
    data: { data: "Test data" },
  };
  const triggerHours = 11; // 11 AM
  const savedNotification = await getNotification();

  if (!tomorrow) {
    if (!savedNotification) {
      // Set a notification at specific time everyday
      const identifier = await Notifications.scheduleNotificationAsync({
        content, 
        trigger: {
          hour: triggerHours,
          repeats: true,
        }
      });
      await setNotification(identifier);
    } 
    else {
      const { tomorrowDate } = savedNotification;
      const currentDate = new Date().getTime();
      
      if (tomorrowDate && tomorrowDate < currentDate) { 
        // Reset the notification if the notification stored is expired
        await Notifications.cancelAllScheduledNotificationsAsync();
        const identifier = await Notifications.scheduleNotificationAsync({
          content, 
          trigger: {
            hour: triggerHours,
            repeats: true,
          }
        });
        await setNotification(identifier);
      }
    }
  } else {
    const now = new Date();
    const currentHours = now.getHours();

    if (currentHours >= triggerHours) {
      return;
    }

    // Set a notification tomorrow at specific time
    const tomorrowDate = new Date();
    tomorrowDate.setDate(new Date().getDate()+1);
    tomorrowDate.setHours(triggerHours);
    tomorrowDate.setMinutes(0);
    tomorrowDate.setSeconds(0);

    await Notifications.cancelAllScheduledNotificationsAsync();
    const identifier = await Notifications.scheduleNotificationAsync({
      content,
      trigger: tomorrowDate,
    });
    await setNotification(identifier, tomorrowDate.getTime());
  }
};

export const logNextTriggerDate = async () => {
  try {
    const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
      hour: 10,
      minute: 0,
    });
    console.log("[logNextTriggerDate]");
    console.log(nextTriggerDate === null ? "No next trigger date" : new Date(nextTriggerDate));
  } catch (e) {
    console.warn(`Couldn't have calculated next trigger date: ${e}`);
  }
}

export const debugDeleteNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log("[handleDelete.cancelAllScheduledNotificationsAsync] canceled");
  const objects = await Notifications.getAllScheduledNotificationsAsync();
  console.log("[handleDelete.getAllScheduledNotificationsAsync] objects:", objects);
  API.removeNotification();
  console.log("[handleDelete.removeNotification]");
};

const convertUTCtoKST = (utc) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  return kr_curr;
};

