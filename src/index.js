import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReduxToastr from 'react-redux-toastr';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './app';
import * as serviceWorker from './serviceWorker';
import rootReducer from './root-reducer';
import { fetchCurrentUser, userFetched } from './actions/users';
import setAuthorizationHeader from './utils/set-authorization-header';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUser());
} else {
  store.dispatch(userFetched({}));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <ReduxToastr
        timeOut={4000}
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
