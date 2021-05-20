import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import s from '@styles/Home.module.sass'
import LoggedInWrapper from 'wrappers/LoggedIn/components/LoggedInWrapper'

const IndexPage: NextPage = () => {
  return (
    <div className={s.root}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoggedInWrapper />
      </MuiThemeProvider>
    </div>
  )
}
export default IndexPage
