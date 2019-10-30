import { createSelector } from "reselect";
import {
  BOOKS_FETCHED,
  BOOK_CREATED,
  BOOK_DELETE,
  TOP_FETHCED,
  ADD_LIKE,
  UPDATE_PROGRESS,
  BOOK_DATA_FETCH,
  BOOK_DELETE_IN_LIST,
  DELETE_LIKE,
  ADD_LIKE_IN_LIST,
  DELETE_LIKE_IN_LIST,
  UPDATE_PROGRESS_IN_LIST,
  LOADING_DATA
} from "../types";

const initialState = {
  loading: false,
  error: null,
  data: {}
};

export default function books(state = initialState, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
    case BOOK_DATA_FETCH:
      return {
        ...state,
        data: action.data,
        loading: true,
        error: null
      };
    case BOOK_CREATED:
      return { ...state, data: { ...action.data } };
    case TOP_FETHCED:
      return {
        ...state,
        data: action.data,
        loading: true,
        error: null
      };

    case ADD_LIKE:
    case DELETE_LIKE:
      return {
        ...state,
        data: action.data,
        loading: true,
        error: null
      };
    case BOOK_DELETE:
      return { ...state, data: { ...action.data } };
    case UPDATE_PROGRESS:
      return {
        ...state,
        data: { ...state.data, readPages: action.data.readPages }
      };

    case ADD_LIKE_IN_LIST:
    case DELETE_LIKE_IN_LIST:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, likeStatus: action.data.likeStatus }
            : item
        ),
        loading: true,
        error: null
      };
    case BOOK_DELETE_IN_LIST:
      const i = state.data.findIndex(item => item.goodreadsId === action.id);
      return {
        ...state,
        data: { ...state.data.slice(0, i), ...state.data.slice(i + 1) },
        loading: true,
        error: null
      };
    case UPDATE_PROGRESS_IN_LIST:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, readPages: action.data.readPages }
            : item
        ),
        loading: true,
        error: null
      };

    case LOADING_DATA:
      return { ...state, loading: action.loading };
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
