import { AsyncStorage } from 'react-native'
import { sampleDecks } from '../_DATA';

const STORAGE_KEY = "FLASHCARDS:DECKS";

const setDummyData = () => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDecks));
  return sampleDecks;
};

const formatDecksResult = (result) => {
  console.log("[formatDecksResult] result:", result ? JSON.parse(result) : null);
  return (result === null)
    ? setDummyData()
    : JSON.parse(result);
};

export const getDeck = (id) => {
  return getDecks()
    .then((decks) => decks[id]);
};

export const getDecks = () => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatDecksResult)
    .catch(() => {
      //TODO: Error Handling
    });
};

export const deleteDeck = (id) => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data);
      decks[id] = undefined;
      delete decks[id];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    });
};

export const addCard = (id, newQuestion) => {
  return getDeck(id)
    .then((deck) => {
      deck.questions = deck.questions.concat(newQuestion);
      return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [id]: deck,
      }));
    })
    .catch(() => {
      //TODO: Error Handling
    });
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