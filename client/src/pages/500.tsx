import { Nullable } from '@helpers/commonInterfaces/interfaces'
import { CssBaseline, MuiThemeProvider, withStyles } from '@material-ui/core'
import GlobalStyles from 'common/GlobalStyles'
import theme from 'common/theme'
import Head from 'next/head'
import React, { useState } from 'react'
import LoggedOutWrapper from 'wrappers/LoggedOut/components/LoggedOutWrapper'

interface Custom500Props {}

const Custom500: React.FC<Custom500Props> = (props) => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
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
          <h1>500 - Page not found</h1>
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default withStyles(styles, { withTheme: true })(Custom500)
