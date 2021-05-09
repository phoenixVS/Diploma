import React, { useEffect } from 'react'
import App from 'next/app'
import AOS from 'aos'
import 'aos/dist/aos.css'

import '../styles/globals.sass'

const MyApp = ({ Component, pageProps }: any) => {
  useEffect(() => {
    AOS.init({
      once: true,
    })
  }, [])

  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: any) => ({
  ...(await App.getInitialProps(appContext)),
})

export default MyApp
