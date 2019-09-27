import { combineReducers } from 'redux';

import user from './reducers/user';
import locale from './reducers/locale';
import books from './reducers/books';

export default combineReducers({
  user,
  locale,
  books
});
