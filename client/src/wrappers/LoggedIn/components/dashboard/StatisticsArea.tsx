import React from 'react'
import { Grid, withTheme } from '@material-ui/core'

interface StatisticsAreaProps {
  theme: any
  data: any
  CardChart: any
}
const StatisticsArea: React.FC<StatisticsAreaProps> = (props) => {
  const { theme, CardChart, data } = props
  return (
    CardChart &&
    data.profit.length >= 2 &&
    data.views.length >= 2 && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardChart
            data={data.profit}
            color={theme.palette.secondary.light}
            height="70px"
            title="Profit"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardChart
            data={data.views}
            color={theme.palette.primary.light}
            height="70px"
            title="Views"
          />
        </Grid>
      </Grid>
    )
  )
}

export default withTheme(StatisticsArea)
