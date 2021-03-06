import React, { useState, useCallback, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  LineChart,
  Line,
  Legend,
  Label,
} from 'recharts'
import format from 'date-fns/format'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  withStyles,
  Box,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useTranslation } from 'i18n'

const styles = (theme: any) => ({
  cardContentInner: {
    marginTop: theme.spacing(-4),
  },
  xAxis: {
    position: 'relative',
    textAlign: 'right',
  },
})

// function labelFormatter(label) {
//   return format(new Date(label * 1000), 'MMMM d, p yyyy')
// }

function calculateMin(data, yKey, factor) {
  let max = Number.POSITIVE_INFINITY
  data.forEach((element) => {
    if (max > element[yKey]) {
      max = element[yKey]
    }
  })
  return Math.round(max - max * factor)
}

const itemHeight = 216
const options = ['1 Week', '1 Month', '6 Months']

interface KnapsackChartProps {
  color: string
  data: any[]
  additionals?: any[]
  yAxisName?: string
  title: string
  classes: any
  theme: any
  height: string
  legend: any
}
const KnapsackChart: React.FC<KnapsackChartProps> = (props) => {
  const { color, data, title, classes, theme, height, legend, additionals, yAxisName } = props
  const { t } = useTranslation(['dashboard'])
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOption, setSelectedOption] = useState('1 Month')

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const formatter = useCallback(
    (value) => {
      return [value, title]
    },
    [title]
  )

  const getSubtitle = useCallback(() => {
    switch (selectedOption) {
      case '1 Week':
        return 'Last week'
      case '1 Month':
        return yAxisName ?? 'Time (ms)'
      case '6 Months':
        return 'Last 6 months'
      default:
        throw new Error('No branch selected in switch-statement')
    }
  }, [selectedOption])

  // const processData = useCallback(() => {
  //   let seconds
  //   switch (selectedOption) {
  //     case '1 Week':
  //       seconds = 60 * 60 * 24 * 7
  //       break
  //     case '1 Month':
  //       seconds = 60 * 60 * 24 * 31
  //       break
  //     case '6 Months':
  //       seconds = 60 * 60 * 24 * 31 * 6
  //       break
  //     default:
  //       throw new Error('No branch selected in switch-statement')
  //   }
  //   const minSeconds = new Date() / 1000 - seconds
  //   const arr = []
  //   for (let i = 0; i < data.length; i += 1) {
  //     if (minSeconds < data[i].timestamp) {
  //       arr.unshift(data[i])
  //     }
  //   }
  //   return arr
  // }, [data, selectedOption])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const selectOption = useCallback(
    (selectedOption) => {
      setSelectedOption(selectedOption)
      handleClose()
    },
    [setSelectedOption, handleClose]
  )

  const isOpen = Boolean(anchorEl)

  const getTime = (): 'dp' | 'bnb' | 'eu' => {
    if (data[0]?.dp) return 'dp'
    if (data[0]?.bnb) return 'bnb'
    if (data[0]?.eu) return 'eu'
    return 'dp'
  }

  const [state, setState] = useState({
    opacity: {
      dp: 1,
      eu: 1,
      bnb: 1,
    },
  })

  useEffect(() => {
    if (data.keys.length > 2) {
      setState({
        opacity: {
          dp: 1,
          eu: 1,
          bnb: 1,
        },
      })
    }
  }, [])

  const handleMouseEnter = (o) => {
    const { dataKey } = o
    const { opacity } = state

    setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    })
  }

  const handleMouseLeave = (o) => {
    const { dataKey } = o
    const { opacity } = state

    setState({
      opacity: { ...opacity, [dataKey]: 1 },
    })
  }

  return (
    <Card>
      <Box pt={2} px={2} pb={4}>
        <Box display="flex" justifyContent="space-between">
          <div>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {t(getSubtitle())}
            </Typography>
          </div>
          <div>
            <IconButton
              aria-label="More"
              aria-owns={isOpen ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: itemHeight,
                  width: 200,
                },
              }}
              disableScrollLock
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === selectedOption}
                  onClick={() => {
                    selectOption(option)
                  }}
                  name={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Box>
      </Box>
      <CardContent>
        <Box className={classes.cardContentInner} height={height}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey={getTime()}
                strokeOpacity={state.opacity[getTime()]}
                stroke="#8884d8"
              />
              <Label value="Pages of my website" offset={0} position="insideBottom" />
              {additionals &&
                additionals.map((_, idx) => (
                  <Line
                    key={idx}
                    type="monotone"
                    dataKey={idx === 0 ? 'eu' : 'bnb'}
                    strokeOpacity={state.opacity[idx === 0 ? 'eu' : 'bnb']}
                    stroke={`#${idx === 0 ? 'f' : '2'}422${idx}a`}
                  />
                ))}
              <XAxis dataKey="pr" type="number" />
              <YAxis dataKey={getTime()} />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Tooltip
                /* formatter={formatter} */
                cursor={false}
                contentStyle={{
                  border: 'none',
                  padding: theme.spacing(1),
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[1],
                }}
                labelStyle={theme.typography.body1}
                itemStyle={{
                  fontSize: theme.typography.body1.fontSize,
                  letterSpacing: theme.typography.body1.letterSpacing,
                  fontFamily: theme.typography.body1.fontFamily,
                  lineHeight: theme.typography.body1.lineHeight,
                  fontWeight: theme.typography.body1.fontWeight,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <Typography variant="body2" className={classes.xAxis} color="textSecondary">
            {t('Number of students')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(KnapsackChart)
