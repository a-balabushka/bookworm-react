import { createSelector } from "reselect";
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_REMOVAL } from "../types";

export default function books(state = {}, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
    case BOOK_CREATED:
      return { ...state, ...action.data.entities.books };
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
