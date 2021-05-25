import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import LoggedInWrapper from 'wrappers/LoggedIn/components/LoggedInWrapper'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import { PageHead } from 'common/components/PageHead'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import SeminarDashboard from 'wrappers/LoggedIn/components/dashboard/SeminarDashboard'
import { useTranslation } from 'i18n'

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false)
  const [KnapsackChart, setKnapsackChart] = useState<any>(null)
  const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false)

  const { t } = useTranslation(['common'])

  const selectCreateTeam = useCallback(() => {
    smoothScrollTop()
    document.title = 'Workout - Dashboard'
    setSelectedTab(t('Create team'))
    if (!hasFetchedCardChart) {
      setHasFetchedCardChart(true)
      import('../../common/components/KnapsackChart').then((Component) => {
        setKnapsackChart(Component.default)
      })
    }
  }, [setSelectedTab, setKnapsackChart, hasFetchedCardChart, setHasFetchedCardChart])

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
          <SeminarDashboard {...{ selectCreateTeam }} />
        </LoggedInWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default IndexPage
