import { RECEIVE_DATA } from "../actions/shared";

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.decks;
    default:
      return state;
  }
};

export default decks;