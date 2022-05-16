import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import common_en from './translations/en/common.json'
import common_ru from './translations/ru/common.json'

const resources = {
    en: {
        common: common_en
    },

    ru: {
        common: common_ru
    }


};

const Languages = [

    'ru',
    'en'

];
let userLang = navigator.language.split('-')[0];
if (!Languages.includes(userLang)) {
    userLang = 'en';
}
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: userLang,


        interpolation: {
            escapeValue: false
        }
    });

export default i18n;