const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  env: {
    PUBLIC_URL: ''
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})