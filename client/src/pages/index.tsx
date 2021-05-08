import React, { lazy, useCallback, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../common/theme'
import GlobalStyles from '../common/GlobalStyles'
import Pace from '../common/components/Pace'
import s from '@styles/Home.module.sass'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import Home from 'wrappers/LoggedOut/components/home/Home'
import LoggedOutWrapper from 'wrappers/LoggedOut/components/LoggedOutWrapper'

// const LoggedInComponent = lazy(() => import('../wrappers/LoggedIn/components/LoggedInWrapper'))

// const LoggedOutWrapper = lazy(() => import('../wrappers/LoggedOut/components/LoggedOutWrapper'))

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const selectHome = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Free template for building a SaaS or admin application'
    setSelectedTab('Home')
  }, [setSelectedTab])

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
        <Pace color={theme.palette.primary.light} />
        <LoggedOutWrapper {...{ selectedTab }} {...{ setSelectedTab }}>
          <Home {...{ selectHome }} />
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </div>
  )
}
export default IndexPage
