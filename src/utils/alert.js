import { Alert } from "react-native";

export const confirmDelete = (title, msg, callbackOk) => {
  alertOkCancel(title, msg, true, callbackOk);
};

export const alertOkCancel = (title, msg, redOk, callbackOk) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Cancel",
          onPress: () => {console.log("Cancel Pressed")},
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: callbackOk,
          style: redOk ? "destructive" : "default",
        }
      ],
      { cancelable: false }
    );