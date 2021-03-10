import { ADD_CARD, ADD_DECK, DELETE_DECK } from "../actions/decks";
import { RECEIVE_DATA } from "../actions/shared";

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.concat(action.question),
        }
      };
    case ADD_DECK:
      return {
        ...state,
        [action.id]: {
          title: action.name,
          questions: [],
        }
      };
    case DELETE_DECK:
      state[action.id] = undefined;
      delete state[action.id];
      return {
        ...state,
      };
    case RECEIVE_DATA:
      return action.decks;
    default:
      return state;
  }
};

export default decks;