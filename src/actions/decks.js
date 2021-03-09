export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

export const addDeck = () => ({
  type: ADD_DECK,
});

export const deleteDeck = (id) => ({
  type: DELETE_DECK,
  id,
});

export const addCard = (id, question) => ({
  type: ADD_CARD,
  id,
  question,
});
