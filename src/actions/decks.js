export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const addDeck = () => ({
  type: ADD_DECK,
});

export const addCard = (id, question) => ({
  type: ADD_CARD,
  id,
  question,
});
