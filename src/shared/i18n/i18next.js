/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import moment from 'moment-timezone';

import TRANSLATION_ES from './es-US/es';
import TRANSLATION_EN from './en-US/en';


const lang = i18n.language ? i18n.language : RNLocalize.getLocales()[0].languageCode;
// eslint-disable-next-line import/no-unresolved

i18n
  .use(reactI18nextModule)
  .init({
    fallbackLng: ['en', 'es'],
    debug: true,
    getAsync: true,
    lng: lang,
    resources: {
      en: TRANSLATION_EN,
      es: TRANSLATION_ES,
    },
  });
i18n.translate = constant => i18n.t(constant);

if (lang !== 'en') {
  // eslint-disable-next-line global-require
  moment().locale(lang, require('moment/locale/es'));
}


export default i18n;
