import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import LoggedInWrapper from 'wrappers/LoggedIn/components/LoggedInWrapper'
import Dashboard from 'wrappers/LoggedIn/components/dashboard/Dashboard'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import { PageHead } from 'common/components/PageHead'
import { useTranslation } from 'i18n'

type StatisticsType = {
  profit: Array<{ value: number; timestamp: number }>
  views: Array<{ value: number; timestamp: number }>
}
const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<any>(null)
  const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false)
  const [isAccountActivated, setIsAccountActivated] = useState(false)
  const [CardChart, setCardChart] = useState<any>(null)
  const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false)
  const [statistics, setStatistics] = useState<StatisticsType>({ views: [], profit: [] })
  const [targets, setTargets] = useState<any[]>([])

  const { t } = useTranslation(['common'])

  const selectDashboard = useCallback(() => {
    smoothScrollTop()
    document.title = 'Workout - Dashboard'
    setSelectedTab(t('Dashboard'))
    if (!hasFetchedCardChart) {
      setHasFetchedCardChart(true)
      import('../../common/components/CardChart').then((Component) => {
        setCardChart(Component.default)
      })
    }
  }, [setSelectedTab, setCardChart, hasFetchedCardChart, setHasFetchedCardChart])

  const fetchRandomStatistics = useCallback(() => {
    const statistics: StatisticsType = {
      profit: [],
      views: [],
    }
    const iterations = 300
    const oneYearSeconds = 60 * 60 * 24 * 365
    let curProfit = Math.round(3000 + Math.random() * 1000)
    let curViews = Math.round(3000 + Math.random() * 1000)
    let curUnix = Math.round(new Date().getTime() / 1000) - oneYearSeconds
    for (let i = 0; i < iterations; i += 1) {
      curUnix += Math.round(oneYearSeconds / iterations)
      curProfit += Math.round((Math.random() * 2 - 1) * 10)
      curViews += Math.round((Math.random() * 2 - 1) * 10)
      statistics.profit.push({
        value: curProfit,
        timestamp: curUnix,
      })
      statistics.views.push({
        value: curViews,
        timestamp: curUnix,
      })
    }
    console.log('statistics', statistics)
    setStatistics(statistics)
  }, [setStatistics])

  useEffect(() => {
    fetchRandomStatistics()
  }, [fetchRandomStatistics])

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
    <>
      <PageHead />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoggedInWrapper
          {...{ selectedTab }}
          {...{ setSelectedTab }}
          {...{ isAddBalanceDialogOpen }}
          {...{ setIsAddBalanceDialogOpen }}
        >
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
    </>
  )
}

export default IndexPage
