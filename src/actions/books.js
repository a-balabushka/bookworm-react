import api from "../api";
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

const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
});

const bookDataFetch = data => ({
  type: BOOK_DATA_FETCH,
  data
});

const bookCreated = data => ({
  type: BOOK_CREATED,
  data
});

const bookRemoval = data => ({
  type: BOOK_DELETE,
  data
});

const bookDeleteInList = id => ({
  type: BOOK_DELETE_IN_LIST,
  id
});

const topFetched = data => ({
  type: TOP_FETHCED,
  data
});

const addBookLike = data => ({
  type: ADD_LIKE,
  data
});

const deleteBookLike = data => ({
  type: DELETE_LIKE,
  data
});

const addBookLikeInList = data => ({
  type: ADD_LIKE_IN_LIST,
  data
});

const deleteBookLikeInList = data => ({
  type: DELETE_LIKE_IN_LIST,
  data
});

const changeProgress = data => ({
  type: UPDATE_PROGRESS,
  data
});

const updateProgressInList = data => ({
  type: UPDATE_PROGRESS_IN_LIST,
  data
});

const loadingData = loading => ({
  type: LOADING_DATA,
  loading
});

export const search = title => () => api.books.search(title);

export const searchByPage = (title, pageNum) => () =>
  api.books.searchByPage(title, pageNum);

export const fetchBookData = id => dispatch => {
  dispatch(loadingData(false));
  api.books.fetchBookData(id).then(book => {
    dispatch(bookDataFetch(book));
  });
};

export const fetchBooks = () => dispatch => {
  dispatch(loadingData(false));
  api.books.fetchAll().then(books => {
    dispatch(booksFetched(books));
  });
};

export const createBook = data => dispatch =>
  api.books.create(data).then(book => {
    dispatch(bookCreated(book));
  });

export const deleteBook = id => dispatch =>
  api.books.delete(id).then(book => {
    dispatch(bookRemoval(book));
  });

export const deleteBookInList = id => dispatch =>
  api.books.deleteBookInList(id).then(bookId => {
    dispatch(bookDeleteInList(bookId));
  });

export const addLike = id => dispatch =>
  api.books.addLike(id).then(book => {
    dispatch(addBookLike(book));
  });

export const deleteLike = id => dispatch =>
  api.books.deleteLike(id).then(book => {
    dispatch(deleteBookLike(book));
  });

export const addLikeInList = id => dispatch =>
  api.books.addLike(id).then(book => {
    dispatch(addBookLikeInList(book));
  });

export const deleteLikeInList = id => dispatch =>
  api.books.deleteLike(id).then(book => {
    dispatch(deleteBookLikeInList(book));
  });

export const getTop = () => dispatch => {
  dispatch(loadingData(false));
  api.books.getTop().then(books => {
    dispatch(topFetched(books));
  });
};

export const updateBookProgress = (num, id) => dispatch =>
  api.books.updateProgress(num, id).then(progress => {
    dispatch(changeProgress(progress));
  });

export const updateBookProgressInList = (num, id) => dispatch =>
  api.books.updateProgress(num, id).then(progress => {
    dispatch(updateProgressInList(progress));
  });
