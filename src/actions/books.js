import { normalize } from "normalizr";
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_REMOVAL, ADD_LIKE, DELETE_LIKE } from "../types";
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

const bookRemoval = id => ({
  type: BOOK_REMOVAL,
  id
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

export const addLike = id => () => api.books.addLike(id);
