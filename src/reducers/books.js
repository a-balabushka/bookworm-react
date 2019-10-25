import { createSelector } from "reselect";
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_REMOVAL, TOP_FETHCED } from "../types";

// const initialState = {
//   loading: false,
//   error: null,
//   data: {}
// };

export default function books(state = {}, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
      // return { loading: true, error: null, ...state };
    case BOOK_CREATED:
      return { ...state, ...action.data.entities.books };
    case TOP_FETHCED:
      return { ...state, ...action.data.entities.books.undefined };
    case BOOK_REMOVAL:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books;

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);
