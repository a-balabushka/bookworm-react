import api from '../api';

export const search = (title) => () => api.books.search(title);
