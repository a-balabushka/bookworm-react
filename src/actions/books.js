import { normalize } from "normalizr";
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_REMOVAL, TOP_FETHCED, ADD_LIKE, CHANGE_PROGRESS } from "../types";
import api from "../api";
import { bookSchema } from "../schemas";

const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
});

const bookCreated = data => ({
  type: BOOK_CREATED,
  data
});

const bookRemoval = data => ({
  type: BOOK_REMOVAL,
  id: data.id
});

const topFetched = data => ({
  type: TOP_FETHCED,
  data
});

const addBookLike = id => ({
  type: ADD_LIKE,
  id
});

const changeProgress = data => ({
  type: CHANGE_PROGRESS,
  data
});

export const search = (title) => () => api.books.search(title);

export const searchByPage = (title, pageNum) => () => api.books.searchByPage(title, pageNum);

export const fetchBookData = id => () => api.books.fetchBookData(id);

export const fetchBooks = () => dispatch =>
  api.books.fetchAll().then(books => {
    dispatch(booksFetched(normalize(books, [bookSchema])));
  });

export const createBook = data => dispatch =>
  api.books.create(data).then(book => {
    dispatch(bookCreated(normalize(book, bookSchema)));
  });

export const deleteBook = id => dispatch =>
  api.books.delete(id).then(bookId => {
    dispatch(bookRemoval(bookId));
  });

export const checkLike = id => () => api.books.checkLike(id);

export const deleteLike = id => () => api.books.deleteLike(id);

export const addLike = id => dispatch =>
  api.books.addLike(id).then(bookId => {
    dispatch(addBookLike(bookId));
  });

export const getTop = () => dispatch => {
  api.books.getTop().then(books => {
    dispatch(topFetched(books));
  })
};

export const checkRead = id => () => api.books.checkRead(id);

export const saveProgress = (num, id) => dispatch =>
  api.books.saveProgress(num, id).then(data => {
    dispatch(changeProgress(data));
  });
