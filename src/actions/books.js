import api from "../api";
import {
  FETCH_TOP_REQUEST,
  FETCH_TOP_SUCCESS,
  FETCH_TOP_FAILURE,
  FETCH_BOOK_DATA_REQUEST,
  FETCH_BOOK_DATA_SUCCESS,
  FETCH_BOOK_DATA_FAILURE,
  FETCH_USER_BOOKS_REQUEST,
  FETCH_USER_BOOKS_SUCCESS,
  FETCH_USER_BOOKS_FAILURE,
  SEARCH_BOOKS_BY_PAGE_REQUEST,
  SEARCH_BOOKS_BY_PAGE_SUCCESS,
  SEARCH_BOOKS_BY_PAGE_FAILURE,
  ADD_BOOK,
  DELETE_BOOK,
  ADD_LIKE,
  UPDATE_PROGRESS,
  BOOK_DELETE_IN_LIST,
  DELETE_LIKE,
  ADD_LIKE_IN_LIST,
  ADD_BOOK_IN_LIST,
  DELETE_LIKE_IN_LIST,
  UPDATE_PROGRESS_IN_LIST,
  CHANGE_FILTERS
} from "../types";

const fetchTop = () => ({
  type: FETCH_TOP_REQUEST
});

const fetchTopSuccess = data => ({
  type: FETCH_TOP_SUCCESS,
  data
});

const fetchTopFailure = error => ({
  type: FETCH_TOP_FAILURE,
  error
});

const fetchBookData = () => ({
  type: FETCH_BOOK_DATA_REQUEST
});

const fetchBookDataSuccess = data => ({
  type: FETCH_BOOK_DATA_SUCCESS,
  data
});

const fetchBookDataFailure = error => ({
  type: FETCH_BOOK_DATA_FAILURE,
  error
});

const fetchUserBooks = () => ({
  type: FETCH_USER_BOOKS_REQUEST
});

const fetchUserBooksSuccess = data => ({
  type: FETCH_USER_BOOKS_SUCCESS,
  data
});

const fetchUserBooksFailure = error => ({
  type: FETCH_USER_BOOKS_FAILURE,
  error
});

const searchBooksByPage = () => ({
  type: SEARCH_BOOKS_BY_PAGE_REQUEST
});

const searchSuccess = data => ({
  type: SEARCH_BOOKS_BY_PAGE_SUCCESS,
  data
});

const searchFailure = error => ({
  type: SEARCH_BOOKS_BY_PAGE_FAILURE,
  error
});

const addBook = data => ({
  type: ADD_BOOK,
  data
});

const addBookInList = data => ({
  type: ADD_BOOK_IN_LIST,
  data
});

const bookRemoval = data => ({
  type: DELETE_BOOK,
  data
});

const bookDeleteInList = id => ({
  type: BOOK_DELETE_IN_LIST,
  id
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

/* ============================================= */

export const getTop = () => dispatch =>
  api.books.getTop().then(dispatch(fetchTop()));

export const getTopSuccess = books => dispatch =>
  dispatch(fetchTopSuccess(books));

export const getTopFailure = error => dispatch =>
  dispatch(fetchTopFailure(error));

/* --------------------------------------------- */

export const getBookData = id => dispatch =>
  api.books.getBookData(id).then(dispatch(fetchBookData()));

export const getBookDataSuccess = book => dispatch =>
  dispatch(fetchBookDataSuccess(book));

export const getBookDataFailure = error => dispatch =>
  dispatch(fetchBookDataFailure(error));

/* --------------------------------------------- */

export const getUserBooks = () => dispatch =>
  api.books.fetchUserBooks().then(dispatch(fetchUserBooks()));

export const getUserBooksSuccess = books => dispatch =>
  dispatch(fetchUserBooksSuccess(books));

export const getUserBooksFailure = error => dispatch =>
  dispatch(fetchUserBooksFailure(error));

/* --------------------------------------------- */

export const search = title => () => api.books.search(title);

export const searchByPage = (title, pageNum) => dispatch =>
  api.books.searchByPage(title, pageNum).then(dispatch(searchBooksByPage()));

export const searchBooksSuccess = books => dispatch =>
  dispatch(searchSuccess(books));

export const searchBooksFailure = error => dispatch =>
  dispatch(searchFailure(error));

/* --------------------------------------------- */

export const readBook = data => dispatch =>
  api.books.create(data).then(book => {
    dispatch(addBook(book));
  });

export const readBookInList = data => dispatch =>
  api.books.create(data).then(book => {
    dispatch(addBookInList({ goodreadsId: book.goodreadsId, readStatus: book.readStatus }));
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

export const addLikeInList = id => dispatch =>
  api.books.addLike(id).then(book => {
    dispatch(addBookLikeInList(book));
  });

export const deleteLike = id => dispatch =>
  api.books.deleteLike(id).then(book => {
    dispatch(deleteBookLike(book));
  });

export const deleteLikeInList = id => dispatch =>
  api.books.deleteLike(id).then(book => {
    dispatch(deleteBookLikeInList(book));
  });

export const updateBookProgress = (num, id) => dispatch =>
  api.books.updateProgress(num, id).then(progress => {
    dispatch(changeProgress(progress));
  });

export const updateBookProgressInList = (num, id) => dispatch =>
  api.books.updateProgress(num, id).then(progress => {
    dispatch(updateProgressInList(progress));
  });

const changeBookFilters = filter => ({
  type: CHANGE_FILTERS,
  filter
});

export const changeFilters = filter => dispatch =>
  dispatch(changeBookFilters(filter));

