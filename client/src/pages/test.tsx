import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import theme from '../common/theme'
import GlobalStyles from '../common/GlobalStyles'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import Home from 'wrappers/LoggedOut/components/home/Home'
import LoggedOutWrapper from 'wrappers/LoggedOut/components/LoggedOutWrapper'

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const selectHome = useCallback(() => {
    smoothScrollTop()
    document.title = 'Hand-to-hand combat | Kyiv'
    setSelectedTab('Home')
  }, [setSelectedTab])

  return (
    <>
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
        <LoggedOutWrapper {...{ selectedTab }} {...{ setSelectedTab }}>
          <Home {...{ selectHome }} />
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default IndexPage
