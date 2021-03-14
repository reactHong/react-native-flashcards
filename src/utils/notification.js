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
    try {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      console.log("[App.registerForPushNotificationsAsync] finalStatus:", finalStatus);
      
      if (finalStatus !== 'granted') {
        const object = await Notifications.requestPermissionsAsync();
        // console.log("[App.registerForPushNotificationsAsync] object:", object);
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("[App.registerForPushNotificationsAsync] finalStatus:", finalStatus);
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("[App.registerForPushNotificationsAsync] token:", token);
    } catch (err) {
      alert("[registerForPushNotificationsAsync] Error!!");
      console.log("[registerForPushNotificationsAsync] Error:", err);
    }
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

const convertUTCtoKST = (utc) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  return kr_curr;
};

export const schedulePushNotification = async (tomorrow) => {

  const triggerHours = 11; // 11 AM
  const content = {
    title: "Study!!",
    body: "It's time to study with your flashcards! 📚",
    data: { data: "Test data" },
  };
  const savedNotification = await getNotification();

  if (!tomorrow) {
    const trigger = {
      hour: triggerHours,
      repeats: true,
    };
    console.log("[일반][schedulePushNotification] notification:", savedNotification);

    // Check if notification is in storage 
    if (!savedNotification) {
      const identifier = await Notifications.scheduleNotificationAsync({
        content, 
        trigger,
      });
      
      // Set a notification 11 AM everyday
      await setNotification(identifier);
      
      console.log("[일반] 처음으로 notification 세팅!!");
      console.log("[일반][schedulePushNotification.setNotifiaction] identifier:", identifier);

    } else {
      const { tomorrowDate } = savedNotification;
      const currentDate = new Date();
      
      const tomorrowTime = convertUTCtoKST(tomorrowDate);
      const currentTime = convertUTCtoKST(currentDate.getTime());

      console.log("[일반] 저장되어 있는 notification이 있어서, tomorrowDate 확인 후, 다시 초기화");
      tomorrowDate 
        ? console.log("[일반] 저장되어 있는 tomorrowDate:", tomorrowTime) 
        : console.log("[일반] 저장되어 있는 tomorrowDate:", tomorrowDate);
      
      if (tomorrowDate) { 
        console.log("[일반] tomorrowDate와 currentDate 비교:",tomorrowTime, "<", currentTime);

        if (tomorrowTime < currentTime) {
          await Notifications.cancelAllScheduledNotificationsAsync();
          const identifier = await Notifications.scheduleNotificationAsync({
            content, 
            trigger,
          });
          await setNotification(identifier);
          
          const savedNotification = await getNotification();
          console.log("[일반] 만료된 tomorrow notification이므로, 초기화 - 일반 notificaiton으로 세팅");
          console.log("[일반][schedulePushNotification] remove current noti & reset noti:", savedNotification);
        } else {
          console.log("[일반] 유효한 tomorrow notification이므로 그냥 놔둠.");
        }
      } else {
        console.log("[일반] tomorrowDate가 없는 초기화되어 있는 notification이 있으므로 그냥 놔둠.");
      }
    }
  } else {
    // Set a notification tomorrow 11 AM
    const now = new Date();
    const currentHours = now.getHours();

    console.log("[내일] 현재 시간과 trigger될 시간을 비교: currentHours, triggerHours", currentHours, triggerHours);

    if (currentHours >= triggerHours) {
      console.log("[내일][schedulePushNotification] 다시 세팅할 필요 없음!! 현재 이미 trigger 시간을 지났으므로!!");
      alert("[내일][schedulePushNotification] 다시 세팅할 필요 없음!! 현재 이미 trigger 시간을 지났으므로!!");
      return;
    }

    const tomorrowDate = new Date();
    tomorrowDate.setDate(new Date().getDate()+1);
    tomorrowDate.setHours(triggerHours);
    tomorrowDate.setMinutes(0);
    tomorrowDate.setSeconds(0);
    
    const trigger = tomorrowDate;
    const tomorrowTime = convertUTCtoKST(tomorrowDate.getTime());

    console.log("[내일][cancelAllScheduledNotificationsAsync] 기존 거 취소");
    await Notifications.cancelAllScheduledNotificationsAsync();
    const identifier = await Notifications.scheduleNotificationAsync({
      content,
      trigger,
    });
    console.log("[내일] 내일 notification으로 설정");
    console.log("[내일][schedulePushNotification] tomorrowDate:", tomorrowTime);
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