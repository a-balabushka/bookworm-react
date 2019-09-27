import { LOCALE_SET } from '../types';

export const localeSet = lang => ({
  type: LOCALE_SET,
  lang
});

export const setLocale = lang => (dispatch) => {
  localStorage.bookwormLang = lang;
  dispatch(localeSet(lang));
};
