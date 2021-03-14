import { AsyncStorage } from 'react-native'
import { sampleDecks } from '../_DATA';

const STORAGE_KEY = "FLASHCARDS:DECKS";
const NOTIFICATION_KEY = "FLASHCARDS:NOTIFICATION";

function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

const setDummyData = () => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDecks));
  return sampleDecks;
};

const formatDecksResult = (result) => {
  // console.log("[formatDecksResult] result:", result ? JSON.parse(result) : null);
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

export const addDeck = (name) => {
  const id = generateId();
  const newDeck = {
    [id]: {
      title: name,
      questions: [],
    },
  };
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newDeck))
    .then(() => ({ id, name }));
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

export const getNotification = async () => {
  return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse);
};

export const setNotification = async (identifier, tomorrowDate) => {
  return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({
    identifier,
    tomorrowDate: tomorrowDate ? tomorrowDate : null,
  }))
};

export const removeNotification = async () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY);
};