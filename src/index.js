import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './root-reducer';
import { fetchCurrentUser, userFetched } from './actions/users';
import { localeSet } from './actions/locale';
import setAuthorizationHeader from './utils/set-authorization-header';

addLocaleData(en);
addLocaleData(ru);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUser());
} else {
  store.dispatch(userFetched({}));
}

if (localStorage.bookwormLang) {
  store.dispatch(localeSet(localStorage.bookwormLang));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
