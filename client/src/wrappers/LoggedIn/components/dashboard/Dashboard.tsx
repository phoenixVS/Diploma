import React, { Fragment, useEffect } from 'react'
import { Typography, Box } from '@material-ui/core'
import SettingsArea from './SettingsArea'
import UserDataArea from './UserDataArea'
import AccountInformationArea from './AccountInformationArea'
import StatisticsArea from './StatisticsArea'

interface DashboardProps {
  CardChart: any
  statistics: any
  toggleAccountActivation: () => void
  pushMessageToSnackbar: (msg: string) => void
  targets: any[]
  setTargets: (newTargets: any[]) => void
  isAccountActivated: boolean
  selectDashboard: () => void
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
  } = props

  useEffect(selectDashboard, [selectDashboard])

  return (
    <Fragment>
      <StatisticsArea CardChart={CardChart} data={statistics} />
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Your Account
        </Typography>
      </Box>
      <AccountInformationArea
        isAccountActivated={isAccountActivated}
        toggleAccountActivation={toggleAccountActivation}
      />
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Settings
        </Typography>
      </Box>
      <SettingsArea pushMessageToSnackbar={pushMessageToSnackbar} />
      <UserDataArea
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={targets}
        setTargets={setTargets}
      />
    </Fragment>
  )
}

export default Dashboard
