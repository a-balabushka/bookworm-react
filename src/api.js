import axios from 'axios';

export default {
  user: {
    login: (credentials) => axios.post('/api/auth', { credentials })
      .then(res => res.data.user),
    signup: user => axios.post('/api/users', { user })
      .then(res => res.data.user),
    confirm: token => axios.post('/api/auth/confirmation', { token })
      .then(res => res.data.user),
    resetPasswordRequest: email => axios.post('/api/auth/reset_password_request', { email }),
    validateToken: token => axios.post('/api/auth/validate_token', { token }),
    resetPassword: data => axios.post('/api/auth/reset_password', { data }),
    fetchCurrentUser: () => axios.get('/api/users/current_user')
      .then(res => res.data.user)
  },
  books: {
    search: (title) => axios.get(`/api/books/search?q=${title}`)
      .then(res => res.data.books),
    searchByPage: (title, pageNum) => axios.get(`/api/books/search_by_page?q=${title}&page=${pageNum}`)
      .then(res => res.data),
    getBookData: (id) => axios.get(`/api/books/fetch_book_data?goodreadsId=${id}`)
      .then(res => res.data.book),
    fetchUserBooks: () => axios.get('/api/books')
      .then(res => res.data.books),
    create: book => axios.post('/api/books', { book })
      .then(res => res.data.book),
    delete: id => axios.post('/api/books/delete_book', { id })
      .then(res => res.data.book),
    deleteBookInList: id => axios.post('/api/books/delete_book', { id })
      .then(res => res.data.book.goodreadsId),
    addLike: id => axios.post('/api/books/add_like', { id })
      .then(res => res.data.book),
    deleteLike: id => axios.post('/api/books/delete_like', { id })
      .then(res => res.data.book),
    getTop: () => axios.get('/api/books/get_top')
      .then(res => res.data.books),
    updateProgress: (num, id) => axios.post('/api/books/save_progress', { num, id })
      .then(res => res.data.progress)
  }
}
