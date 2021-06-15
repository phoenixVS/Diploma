import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../common/theme'
import GlobalStyles from '../common/GlobalStyles'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import LoggedOutWrapper from 'wrappers/LoggedOut/components/LoggedOutWrapper'
import { PageHead } from 'common/components/PageHead'
import Library from 'wrappers/LoggedOut/components/home/Library'
import Gallery from 'wrappers/LoggedOut/components/home/Gallery'

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)

  return (
    <>
      <PageHead />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoggedOutWrapper {...{ selectedTab }} {...{ setSelectedTab }}>
          {/*@ts-ignore*/}
          <Gallery />
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default IndexPage
