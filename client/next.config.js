const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
  ua: 'ua',
  en: 'en'
}

module.exports = withPWA({
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    PUBLIC_URL: ''
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  i18n: {
    locales: ['en-US', 'uk-UA'],
    defaultLocale: 'en-US'
  },
  async redirects() {
    return [
      {
        source: '/en/c',
        destination: '/en/c/dashboard',
        permanent: true,
      },
      {
        source: '/ua/c',
        destination: '/ua/c/dashboard',
        permanent: true,
      },
    ]
  },
 rewrites: async () => nextI18NextRewrites(localeSubpaths)
})