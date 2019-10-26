import { createSelector } from "reselect";
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_REMOVAL, TOP_FETHCED, ADD_LIKE, CHANGE_PROGRESS } from "../types";

const initialState = {
  loading: false,
  error: null,
  data: {}
};

export default function books(state = initialState, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
      return { ...state, data: action.data.entities.books, loading: true, error: null };
    case BOOK_CREATED:
      return { ...state, ...action.data.entities.books };
    case TOP_FETHCED:
      return { ...state, ...action.data.entities.books.undefined };
    case BOOK_REMOVAL:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case ADD_LIKE:
      const n = Object.assign({}, state);
      n.data[action.id].likeStatus = true;
      return n;
    case CHANGE_PROGRESS:
      const { id, readPages } = action.data;
      const c = Object.assign({}, state);
      c.data[id].readPages = readPages;
      return c;
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books.data;

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);
