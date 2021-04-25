import React from 'react'
import App from 'next/app'

import '../styles/globals.sass'

const MyApp = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: any) => ({
  ...(await App.getInitialProps(appContext)),
})

export default MyApp
