import React, { memo, useCallback, useState, useEffect, Fragment } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core'
import NavBar from './navigation/NavBar'
import ConsecutiveSnackbarMessages from '../../../common/components/ConsecutiveSnackbarMessages'
import smoothScrollTop from '../../../common/functions/smoothScrollTop'
import persons from '../dummyData/persons'
import LazyLoadAddBalanceDialog from './subscription/LazyLoadAddBalanceDialog'
import { Nullable } from '@helpers/commonInterfaces/interfaces'

const styles = (theme: any) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  fullWidth: {
    width: '100%'
  },
  wrapper: {
    margin: theme.spacing(1),
    width: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: '82.5%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

interface MainProps {
  fw?: boolean
  classes: any
  isAddBalanceDialogOpen?: boolean
  setIsAddBalanceDialogOpen?: (isOpen: boolean) => void
  selectedTab: Nullable<string>
  setSelectedTab: (tab: string) => void
}
const Main: React.FC<MainProps> = (props) => {
  const {
    fw,
    classes,
    children,
    selectedTab,
    setSelectedTab,
    isAddBalanceDialogOpen,
    setIsAddBalanceDialogOpen,
  } = props
  const [CardChart, setCardChart] = useState<any>(null)
  const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false)
  const [EmojiTextArea, setEmojiTextArea] = useState<any>(null)
  const [hasFetchedEmojiTextArea, setHasFetchedEmojiTextArea] = useState(false)
  const [ImageCropper, setImageCropper] = useState<any>(null)
  const [hasFetchedImageCropper, setHasFetchedImageCropper] = useState(false)
  const [Dropzone, setDropzone] = useState<any>(null)
  const [hasFetchedDropzone, setHasFetchedDropzone] = useState(false)
  const [DateTimePicker, setDateTimePicker] = useState<any>(null)
  const [hasFetchedDateTimePicker, setHasFetchedDateTimePicker] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])

  type StatisticsType = {
    profit: Array<{ value: number; timestamp: number }>
    views: Array<{ value: number; timestamp: number }>
  }
  const [statistics, setStatistics] = useState<StatisticsType>({ views: [], profit: [] })
  const [posts, setPosts] = useState([])
  const [targets, setTargets] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [isAccountActivated, setIsAccountActivated] = useState(false)
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<any>(null)

  const fetchRandomTargets = useCallback(() => {
    const targets = []
    for (let i = 0; i < 35; i += 1) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)]
      const target = {
        id: i,
        number1: Math.floor(Math.random() * 251),
        number2: Math.floor(Math.random() * 251),
        number3: Math.floor(Math.random() * 251),
        number4: Math.floor(Math.random() * 251),
        name: randomPerson.name,
        profilePicUrl: randomPerson.src,
        isActivated: Math.round(Math.random()) ? true : false,
      }
      targets.push(target)
    }
    setTargets(targets)
  }, [setTargets])

  const openAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(true)
  }, [setIsAddBalanceDialogOpen])

  const closeAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(false)
  }, [setIsAddBalanceDialogOpen])

  const onPaymentSuccess = useCallback(() => {
    if (pushMessageToSnackbar && pushMessageToSnackbar instanceof any) {
      pushMessageToSnackbar({
        text: 'Your balance has been updated.',
      })
      setIsAddBalanceDialogOpen(false)
    }
  }, [pushMessageToSnackbar, setIsAddBalanceDialogOpen])

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
    setStatistics(statistics)
  }, [setStatistics])

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

  const fetchRandomMessages = useCallback(() => {
    shuffle(persons)
    const messages = []
    const iterations = persons.length
    const oneDaySeconds = 60 * 60 * 24
    let curUnix = Math.round(new Date().getTime() / 1000 - iterations * oneDaySeconds)
    for (let i = 0; i < iterations; i += 1) {
      const person = persons[i]
      const message = {
        id: i,
        src: person.src,
        date: curUnix,
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed.',
      }
      curUnix += oneDaySeconds
      messages.push(message)
    }
    messages.reverse()
    setMessages(messages)
  }, [setMessages])

  const fetchRandomPosts = useCallback(() => {
    shuffle(persons)
    const posts = []
    const iterations = persons.length
    const oneDaySeconds = 60 * 60 * 24
    let curUnix = Math.round(new Date().getTime() / 1000 - iterations * oneDaySeconds)
    for (let i = 0; i < iterations; i += 1) {
      const person = persons[i]
      const post = {
        id: i,
        src: person.src,
        timestamp: curUnix,
        name: person.name,
      }
      curUnix += oneDaySeconds
      posts.push(post)
    }
    posts.reverse()
    setPosts(posts)
  }, [setPosts])

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

  const selectDashboard = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Dashboard'
    setSelectedTab('Dashboard')
    if (!hasFetchedCardChart) {
      setHasFetchedCardChart(true)
      import('../../../common/components/CardChart').then((Component) => {
        setCardChart(Component.default)
      })
    }
  }, [setSelectedTab, setCardChart, hasFetchedCardChart, setHasFetchedCardChart])

  const selectPosts = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Posts'
    setSelectedTab('Posts')
    if (!hasFetchedEmojiTextArea) {
      setHasFetchedEmojiTextArea(true)
      import('../../../common/components/EmojiTextArea').then((Component) => {
        setEmojiTextArea(Component.default)
      })
    }
    if (!hasFetchedImageCropper) {
      setHasFetchedImageCropper(true)
      import('../../../common/components/ImageCropper').then((Component) => {
        setImageCropper(Component.default)
      })
    }
    if (!hasFetchedDropzone) {
      setHasFetchedDropzone(true)
      import('../../../common/components/Dropzone').then((Component) => {
        setDropzone(Component.default)
      })
    }
    if (!hasFetchedDateTimePicker) {
      setHasFetchedDateTimePicker(true)
      import('../../../common/components/DateTimePicker').then((Component) => {
        setDateTimePicker(Component.default)
      })
    }
  }, [
    setSelectedTab,
    setEmojiTextArea,
    setImageCropper,
    setDropzone,
    setDateTimePicker,
    hasFetchedEmojiTextArea,
    setHasFetchedEmojiTextArea,
    hasFetchedImageCropper,
    setHasFetchedImageCropper,
    hasFetchedDropzone,
    setHasFetchedDropzone,
    hasFetchedDateTimePicker,
    setHasFetchedDateTimePicker,
  ])

  const selectSubscription = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Subscription'
    setSelectedTab('Subscription')
  }, [setSelectedTab])

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage)
    },
    [setPushMessageToSnackbar]
  )

  useEffect(() => {
    fetchRandomTargets()
    fetchRandomStatistics()
    fetchRandomTransactions()
    fetchRandomMessages()
    fetchRandomPosts()
  }, [
    fetchRandomTargets,
    fetchRandomStatistics,
    fetchRandomTransactions,
    fetchRandomMessages,
    fetchRandomPosts,
  ])

  return (
    <Fragment>
      <LazyLoadAddBalanceDialog
        open={isAddBalanceDialogOpen}
        onClose={closeAddBalanceDialog}
        onSuccess={onPaymentSuccess}
      />
      <NavBar
        selectedTab={selectedTab}
        messages={messages}
        openAddBalanceDialog={openAddBalanceDialog}
      />
      <ConsecutiveSnackbarMessages getPushMessageFromChild={getPushMessageFromChild} />
      <main className={cx(classes.main)}>
        {/*<Routing
          isAccountActivated={isAccountActivated}
          ImageCropper={ImageCropper}
          EmojiTextArea={EmojiTextArea}
          CardChart={CardChart}
          Dropzone={Dropzone}
          DateTimePicker={DateTimePicker}
          toggleAccountActivation={toggleAccountActivation}
          pushMessageToSnackbar={pushMessageToSnackbar}
          transactions={transactions}
          statistics={statistics}
          posts={posts}
          targets={targets}
          selectDashboard={selectDashboard}
          selectPosts={selectPosts}
          selectSubscription={selectSubscription}
          openAddBalanceDialog={openAddBalanceDialog}
          setTargets={setTargets}
          setPosts={setPosts}
        />*/}
        <div className={cx({[classes.wrapper]: !fw}, {[classes.fullWidth]: fw})}>
          {React.Children.map(children, (child) => {
            // checking isValidElement is the safe way and avoids a typescript errors too
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { pushMessageToSnackbar: pushMessageToSnackbar })
            }
            return child
          })}
        </div>
      </main>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(memo(Main))
