import i18n from '../../shared/i18n/i18next';
import LEGAL_PAGE from './constants/LegalPage';

/* eslint-disable no-tabs */
/* eslint-disable max-len */
/* eslint-disable no-irregular-whitespace */
export const LEGAL_TERMS_OF_SERVICE = 'termsOfService';
export const LEGAL_SECURITY_POLICY = 'securityPolicy';
export const LEGAL_PRIVACY_STATEMENT = 'privacyStatement';

export default {
  [LEGAL_TERMS_OF_SERVICE]: {
    navTitle: i18n.translate(LEGAL_PAGE.TERMS_OF_SERVICE.NAV_TITLE),
    title: i18n.translate(LEGAL_PAGE.TERMS_OF_SERVICE.TITLE),
    content: i18n.translate(LEGAL_PAGE.TERMS_OF_SERVICE.CONTENT),
  },
  [LEGAL_SECURITY_POLICY]: {
    navTitle: i18n.translate(LEGAL_PAGE.PRIVACY_STATEMENT.NAV_TITLE),
    title: i18n.translate(LEGAL_PAGE.PRIVACY_STATEMENT.TITLE),
    content: i18n.translate(LEGAL_PAGE.PRIVACY_STATEMENT.CONTENT),
  },
  [LEGAL_PRIVACY_STATEMENT]: {
    navTitle: i18n.translate(LEGAL_PAGE.SECURITY_POLICY.NAV_TITLE),
    title: i18n.translate(LEGAL_PAGE.SECURITY_POLICY.TITLE),
    content: i18n.translate(LEGAL_PAGE.SECURITY_POLICY.CONTENT),
  },
};

