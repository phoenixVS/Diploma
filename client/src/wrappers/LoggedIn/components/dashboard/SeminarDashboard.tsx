import { Container, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import KnapsackChart from 'common/components/KnapsackChart'
import { branchesAndBoundes } from 'common/functions/knapsack/bnb'
import { dynamicProgramming } from 'common/functions/knapsack/dynamicProgramming'
import { euristic } from 'common/functions/knapsack/euristic'
import { defaultTheme } from 'common/theme'
import { useTranslation } from 'i18n'
import React, { FC, useEffect, useState } from 'react'

const styles = () => ({
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

  type testingData = Array<{ pr: number; dp?: number; bnb?: number; eu?: number }>
  type deltaOpti = Array<{ pr: number; bnb: number; eu: number }>

  const generateTestingInputs = () => {
    const testingData = []

    const genRandArr = (size: number) => {
      const res = []
      for (let i = 0; i < size; i += 1) {
        res.push(Math.floor(Math.random() * 10) + Math.abs(i - Math.floor(Math.random() * 10)))
      }
      return res
    }

    for (let i = 8; i <= 36; i += 4) {
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
      bnbOut: testingData = [],
      optOut: deltaOpti = []
    inputs.forEach((input) => {
      const dp = dynamicProgramming(input)
      dpOut.push({ pr: input.n, dp: dp.time })
      const eu = euristic(input)
      euOut.push({ pr: input.n, eu: eu.time })
      const bnb = branchesAndBoundes(input)
      bnbOut.push({ pr: input.n, bnb: bnb.time })

      optOut.push({ pr: input.n, eu: eu.z, bnb: dp.z })
    })
    console.log('dp', dpOut)
    console.log('eu', euOut)
    console.log('bnb', bnbOut)
    setDp(dpOut)
    setEu(euOut)
    setBnb(bnbOut)
    setData(dpOut.map((item, idx) => ({ ...item, eu: euOut[idx].eu, bnb: bnbOut[idx].bnb })))
    setOpti(optOut)
  }, [])

  const [dp, setDp] = useState<testingData>([])
  const [eu, setEu] = useState<testingData>([])
  const [bnb, setBnb] = useState<testingData>([])
  const [opti, setOpti] = useState<deltaOpti>([])
  const [data, setData] = useState<testingData>([])

  useEffect(() => {
    console.log('dat', data)
    console.log('opti', opti)
  }, [data, opti])

  const euLeg = [{ value: 'Euristics', id: 'time', type: 'line' }]
  const dpLeg = [{ value: 'Dynamic Programming', id: 'time', type: 'line' }]
  const bnbLeg = [{ value: 'Branches and Bounds', id: 'time', type: 'line' }]

  return (
    <Container className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        {t('Create seminar')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={eu}
            legend={euLeg}
            color={styles.palette.primary.light}
            height="500px"
            title={t('Euristic method')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={bnb}
            legend={bnbLeg}
            color={styles.palette.secondary.light}
            height="500px"
            title={t('B&B method')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={dp}
            legend={dpLeg}
            color={styles.palette.primary.light}
            height="500px"
            title={t('DP method')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={data}
            legend={Array.prototype.concat(euLeg, bnbLeg, dpLeg)}
            additionals={[eu, dp]}
            color={styles.palette.primary.light}
            height="500px"
            title={t('Methods comparison')}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <KnapsackChart
            data={opti}
            legend={Array.prototype.concat(euLeg, bnbLeg, dpLeg)}
            yAxisName={t('Group prospects')}
            additionals={[opti.map((item) => ({ bnb: item.bnb, pr: item.pr }))]}
            color={styles.palette.primary.light}
            height="500px"
            title={t('Euristic optimum delta')}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withStyles(styles, { withTheme: true })(SeminarDashboard)
