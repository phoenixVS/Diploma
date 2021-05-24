import React, { useEffect } from 'react'
import { List, Divider, Paper, withStyles } from '@material-ui/core'
import SubscriptionTable from './SubscriptionTable'
import SubscriptionInfo from './SubscriptionInfo'

const styles = {
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
  },
}

interface SubscriptionProps {
  classes: any
  transactions: any[]
  selectSubscription: () => void
  openAddBalanceDialog: () => void
}
const Subscription: React.FC<SubscriptionProps> = (props) => {
  const { transactions, classes, openAddBalanceDialog, selectSubscription } = props

  useEffect(selectSubscription, [selectSubscription])

  return (
    <Paper>
      <List disablePadding>
        <SubscriptionInfo openAddBalanceDialog={openAddBalanceDialog} />
        <Divider className={classes.divider} />
        <SubscriptionTable transactions={transactions} />
      </List>
    </Paper>
  )
}

export default withStyles(styles)(Subscription)
