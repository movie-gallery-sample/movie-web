import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "../locales/en/home.json";
import AUTH_EN from "../locales/en/auth.json";
import MOVIE_EN from "../locales/en/movie.json";

import HOME_VI from "../locales/vi/home.json";
import AUTH_VI from "../locales/vi/auth.json";
import MOVIE_VI from "../locales/vi/movie.json";

export const locales = {
  en: "English",
  vi: "Vietnamese",
};

const resources = {
  en: {
    home: HOME_EN,
    auth: AUTH_EN,
    movie: MOVIE_EN,
  },
  vi: {
    home: HOME_VI,
    auth: AUTH_VI,
    movie: MOVIE_VI,
  },
};

const defaultNS = "home";

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  ns: ["home, auth, movie"],
  defaultNS: defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
