import { Container, Grid, Theme, Typography, withTheme } from '@material-ui/core'
import CardChart from 'common/components/CardChart'
import { defaultTheme } from 'common/theme'
import React, { FC, useEffect, useState } from 'react'

type SeminarDashboardProps = {
  theme?: Theme
}

const SeminarDashboard: FC<SeminarDashboardProps> = ({ theme }) => {
  const [styles, setStyles] = useState(defaultTheme)

  useEffect(() => {
    if (theme) {
      setStyles(theme)
    }
  }, [theme])

  return (
    <Container>
      <Typography variant="subtitle1" gutterBottom>
        Your Account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardChart
            data={[]}
            color={styles.palette.secondary.light}
            height="70px"
            title="Profit"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardChart data={[]} color={styles.palette.primary.light} height="70px" title="Views" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardChart data={[]} color={styles.palette.primary.light} height="70px" title="Views" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withTheme(SeminarDashboard)
