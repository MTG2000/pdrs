import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import home_en from "../langs/en/home.json";
import home_ar from "../langs/ar/home.json";
import common_en from "../langs/en/common.json";
import common_ar from "../langs/ar/common.json";
import about_en from "../langs/en/about.json";
import about_ar from "../langs/ar/about.json";

const lang = localStorage.getItem("lang") || "en";

if (lang === "ar") configureForArabic();

function configureForArabic() {
  import("./App-rtl.scss").then().catch();
  document.querySelector("body").setAttribute("dir", "rtl");
}

const resources = {
  en: {
    home: home_en,
    common: common_en,
    about: about_en,
  },
  ar: {
    home: home_ar,
    common: common_ar,
    about: about_ar,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
