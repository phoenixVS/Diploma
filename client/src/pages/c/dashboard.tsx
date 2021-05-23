import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import s from '@styles/Home.module.sass'
import LoggedInWrapper from 'wrappers/LoggedIn/components/LoggedInWrapper'
import Dashboard from 'wrappers/LoggedIn/components/dashboard/Dashboard'
import smoothScrollTop from 'common/functions/smoothScrollTop'

type StatisticsType = {
  profit: Array<{ value: number; timestamp: number }>
  views: Array<{ value: number; timestamp: number }>
}
const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<any>(null)
  const [isAccountActivated, setIsAccountActivated] = useState(false)
  const [CardChart, setCardChart] = useState<any>(null)
  const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false)
  const [statistics, setStatistics] = useState<StatisticsType>({ views: [], profit: [] })
  const [targets, setTargets] = useState<any[]>([])

  const selectDashboard = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Dashboard'
    setSelectedTab('Dashboard')
    if (!hasFetchedCardChart) {
      setHasFetchedCardChart(true)
      import('../../common/components/CardChart').then((Component) => {
        setCardChart(Component.default)
      })
    }
  }, [setSelectedTab, setCardChart, hasFetchedCardChart, setHasFetchedCardChart])

  const toggleAccountActivation = useCallback(() => {
    if (pushMessageToSnackbar) {
      if (isAccountActivated) {
        pushMessageToSnackbar({
          text: 'Your account is now deactivated.',
        })
      } else {
        pushMessageToSnackbar({
          text: 'Your account is now activated.',
        })
      }
    }
    setIsAccountActivated(!isAccountActivated)
  }, [pushMessageToSnackbar, isAccountActivated, setIsAccountActivated])

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
        <LoggedInWrapper>
          <Dashboard
            toggleAccountActivation={toggleAccountActivation}
            pushMessageToSnackbar={pushMessageToSnackbar}
            CardChart={CardChart}
            statistics={statistics}
            targets={targets}
            setTargets={setTargets}
            isAccountActivated={isAccountActivated}
            selectDashboard={selectDashboard}
          />
        </LoggedInWrapper>
      </MuiThemeProvider>
    </div>
  )
}
export default IndexPage
