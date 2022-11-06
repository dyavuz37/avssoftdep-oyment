import i18next from "i18next";
import { initReactI18next } from "react-i18next";


import en from "./Localization/en.json";
import tr from "./Localization/tr.json";

i18next.use(initReactI18next).init({

    resources:{
    en:{
        translation:en,

    },
    tr:{
        translation: tr,
    }
},
    lng:"en",

});



export default i18next;