import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import user from './reducers/user';
import books from './reducers/books';

export default combineReducers({
  user,
  books,
  toastr: toastrReducer
});
