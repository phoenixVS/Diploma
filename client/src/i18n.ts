import path from 'path'
import NextI18Next from 'next-i18next'

const localeSubpaths = {
  ua: 'ua',
  en: 'en',
}

const i18next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['ua'],
  localeSubpaths,
  localePath: path.resolve('./public/locales'),
  keySeparator: false,
})

export const { Link, Router, useTranslation, appWithTranslation, i18n, withTranslation } = i18next
