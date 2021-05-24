import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import LoggedInWrapper from 'wrappers/LoggedIn/components/LoggedInWrapper'
import Subscription from 'wrappers/LoggedIn/components/subscription/Subscription'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import { PageHead } from 'common/components/PageHead'

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false)

  const openAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(true)
  }, [setIsAddBalanceDialogOpen])

  const selectSubscription = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Subscription'
    setSelectedTab('Subscription')
  }, [setSelectedTab])

  const fetchRandomTransactions = useCallback(() => {
    const transactions: any[] = []
    const iterations = 32
    const oneMonthSeconds = Math.round(60 * 60 * 24 * 30.5)
    const transactionTemplates = [
      {
        description: 'Starter subscription',
        isSubscription: true,
        balanceChange: -1499,
      },
      {
        description: 'Premium subscription',
        isSubscription: true,
        balanceChange: -2999,
      },
      {
        description: 'Business subscription',
        isSubscription: true,
        balanceChange: -4999,
      },
      {
        description: 'Tycoon subscription',
        isSubscription: true,
        balanceChange: -9999,
      },
      {
        description: 'Added funds',
        isSubscription: false,
        balanceChange: 2000,
      },
      {
        description: 'Added funds',
        isSubscription: false,
        balanceChange: 5000,
      },
    ]
    let curUnix = Math.round(new Date().getTime() / 1000 - iterations * oneMonthSeconds)
    for (let i = 0; i < iterations; i += 1) {
      const randomTransactionTemplate =
        transactionTemplates[Math.floor(Math.random() * transactionTemplates.length)]
      const transaction = {
        id: i,
        description: randomTransactionTemplate.description,
        balanceChange: randomTransactionTemplate.balanceChange,
        paidUntil: curUnix + oneMonthSeconds,
        timestamp: curUnix,
      }
      curUnix += oneMonthSeconds
      transactions.push(transaction)
    }
    transactions.reverse()
    setTransactions(transactions)
  }, [setTransactions])

  useEffect(() => {
    fetchRandomTransactions()
  }, [fetchRandomTransactions])

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
          <Subscription
            transactions={transactions}
            selectSubscription={selectSubscription}
            openAddBalanceDialog={openAddBalanceDialog}
          />
        </LoggedInWrapper>
      </MuiThemeProvider>
    </>
  )
}
export default IndexPage
