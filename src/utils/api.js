import { AsyncStorage } from 'react-native'
import { sampleDecks } from '../_DATA';

const STORAGE_KEY = "FLASHCARDS:DECKS";

const setDummyData = () => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDecks));
  return sampleDecks;
};

const formatDecksResult = (result) => {
  console.log("[formatDecksResult] result:", result);
  return (result === null)
    ? setDummyData()
    : JSON.parse(result);
};

export const getDecks = () => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatDecksResult);
};

// export function fetchCalendarResults () {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then(formatCalendarResults)
// }

// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }