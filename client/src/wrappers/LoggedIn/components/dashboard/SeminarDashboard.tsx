import { Container, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import KnapsackChart from 'common/components/KnapsackChart'
import { branchesAndBoundes } from 'common/functions/knapsack/bnb'
import { dynamicProgramming } from 'common/functions/knapsack/dynamicProgramming'
import { euristic } from 'common/functions/knapsack/euristic'
import { Input } from 'common/functions/knapsack/interfaces'
import { defaultTheme } from 'common/theme'
import { useTranslation } from 'i18n'
import React, { FC, useEffect, useState } from 'react'

const styles = (theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    '@media (max-width: 350px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
})

type SeminarDashboardProps = {
  theme?: Theme
  classes: any
  selectCreateTeam: () => void
}
const SeminarDashboard: FC<SeminarDashboardProps> = ({ theme, classes, selectCreateTeam }) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])

  useEffect(selectCreateTeam, [selectCreateTeam])
  useEffect(() => {
    if (theme) {
      setStyles(theme)
    }
  }, [theme])

  type testingData = Array<{ pr: number; time: number }>

  const generateTestingInputs = () => {
    const testingData = []

    const genRandArr = (size: number) => {
      const res = []
      for (let i = 0; i < size; i += 1) {
        res.push(Math.floor(Math.random() * 10) + Math.abs(i - Math.floor(Math.random() * 10)))
      }
      return res
    }

    for (let i = 4; i <= 32; i += 4) {
      testingData.push({
        n: i,
        cost: genRandArr(i),
        value: genRandArr(i),
        resource:
          Math.floor(Math.random() * 10) + 2 * Math.abs(i - Math.floor(Math.random() * 10)) + i,
      })
    }

    return testingData
  }

  useEffect(() => {
    // const input: Input = { n: 4, cost: [3, 8, 4, 5], value: [3, 7, 2, 6], resource: 11 }
    const inputs = generateTestingInputs()
    console.log('inputs', inputs)
    const dpOut: testingData = [],
      euOut: testingData = [],
      bnbOut: testingData = []
    inputs.forEach((input) => {
      const dp = dynamicProgramming(input)
      dpOut.push({ pr: input.n, time: dp.time })
      const eu = euristic(input)
      euOut.push({ pr: input.n, time: eu.time })
      const bnb = branchesAndBoundes(input)
      bnbOut.push({ pr: input.n, time: bnb.time })
    })
    console.log('dp', dpOut)
    console.log('eu', euOut)
    console.log('bnb', bnbOut)
    setDp(dpOut)
    setEu(euOut)
    setBnb(bnbOut)
    setData(
      dpOut.map((item, idx) => ({ ...item, time0: euOut[idx].time, time1: bnbOut[idx].time }))
    )
  }, [])

  const [dp, setDp] = useState<testingData>([])
  const [eu, setEu] = useState<testingData>([])
  const [bnb, setBnb] = useState<testingData>([])
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('dat', data)
  }, [data])
  return (
    <Container className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        {t('Create seminar')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={eu}
            color={styles.palette.primary.light}
            height="500px"
            title={t('Euristic method')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={bnb}
            color={styles.palette.secondary.light}
            height="500px"
            title={t('B&B method')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={dp}
            color={styles.palette.primary.light}
            height="500px"
            title={t('DP method')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={data}
            additionals={[eu, dp]}
            color={styles.palette.primary.light}
            height="500px"
            title={t('Methods comparison')}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withStyles(styles, { withTheme: true })(SeminarDashboard)
