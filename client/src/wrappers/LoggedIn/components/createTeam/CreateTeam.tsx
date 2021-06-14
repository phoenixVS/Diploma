import React, { useEffect, useState } from 'react'
import { useTranslation } from 'i18n'
import { defaultTheme } from 'common/theme'
import cx from 'classnames'
import {
  Button,
  Card,
  CardContent,
  Container,
  Fab,
  Grid,
  Slider,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Participants from './participants/Participants'
import { euristic } from 'common/functions/knapsack/euristic'

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
const defaultCandidates = [
  {
    name: 'Валерій',
    cost: 54,
    prospects: 29,
  },
  {
    name: 'Олексій',
    cost: 36,
    prospects: 36,
  },
  {
    name: 'Іван',
    cost: 54,
    prospects: 29,
  },
  {
    name: 'Артем',
    cost: 19,
    prospects: 21,
  },
  {
    name: 'Кирило',
    cost: 61,
    prospects: 56,
  },
]
function valuetext(value) {
  return `${value} W`
}
interface ICandidate {
  name: string
  prospects: number
  cost: number
}
type CreateTeamProps = {
  classes: any
  theme: Theme
  selectCreateTeam: () => void
}
const CreateTeam: React.FC<CreateTeamProps> = ({ classes, theme, selectCreateTeam }) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])

  const [createdTeam, setCreatedTeam] = React.useState<Array<ICandidate>>([])
  const [resource, setResource] = useState()
  const [resError, setResError] = useState(false)
  const [candidates, setCandidates] = useState<Array<ICandidate>>(defaultCandidates)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [cost, setCost] = React.useState(30)
  const handleCostChange = (event, newValue) => {
    setCost(newValue)
  }
  const [prospects, setProspects] = React.useState(30)
  const handleProspectsChange = (event, newValue) => {
    setProspects(newValue)
  }

  useEffect(selectCreateTeam, [selectCreateTeam])
  useEffect(() => {
    if (theme) {
      setStyles(theme)
    }
  }, [theme])

  const addCandidateHandler = (props: ICandidate) => {
    if (name === '') {
      setNameError(true)
      return
    }
    const newCandidates = [...candidates]
    newCandidates.unshift({ ...props })
    setCandidates(newCandidates)
    setName('')
  }

  const removeCandidateHandler = (id: number) => {
    const cands = [...candidates]
    cands.splice(id, 1)
    setCandidates(cands)
  }

  const inputChangeHandler = (e) => {
    if (nameError) {
      setNameError(false)
    }
    setName(e.target.value)
  }

  const resourceInputChangeHandler = (e) => {
    setResource(e.target.value)
    if (e.target.value === '') {
      setResError(true)
      return
    }
    if (resError) {
      setResError(false)
    }
  }

  const createTeamHandler = () => {
    if (resError || !resource) {
      setResError(true)
      return
    }
    const indices = euristic({
      n: candidates.length,
      cost: candidates.map((item) => item.cost),
      value: candidates.map((item) => item.prospects),
      resource,
    }).items

    setCreatedTeam(candidates.filter((item, idx) => indices.some((i) => i === idx)))
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h2" gutterBottom>
        {t('Create a team')}
      </Typography>
      <Card style={{ margin: '15px' }}>
        <CardContent>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              type="number"
              required
              error={resError}
              value={resource ? resource : ''}
              onChange={resourceInputChangeHandler}
              label={t('Available time')}
              variant="outlined"
              style={{ width: '100%' }}
            />
          </form>
        </CardContent>
      </Card>
      <Card style={{ margin: '15px' }}>
        <CardContent>
          <form noValidate autoComplete="off">
            <Typography variant="h3" component="h3" gutterBottom>
              {t('Create a student')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  id="outlined-basic"
                  required
                  error={nameError}
                  value={name}
                  onChange={inputChangeHandler}
                  label={t('Students name')}
                  variant="outlined"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography id="cost" gutterBottom>
                  {t('Cost')}
                </Typography>
                <Slider
                  defaultValue={30}
                  getAriaValueText={valuetext}
                  aria-labelledby="cost"
                  value={cost}
                  onChange={handleCostChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={10}
                  max={100}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography id="prospects" gutterBottom>
                  {t('Prospects')}
                </Typography>
                <Slider
                  defaultValue={30}
                  getAriaValueText={valuetext}
                  value={prospects}
                  onChange={handleProspectsChange}
                  aria-labelledby="prospects"
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={100}
                />
              </Grid>
              <Grid item xs={12} md={1} style={{ display: 'flex', justifyContent: 'center' }}>
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    addCandidateHandler({ name, cost, prospects })
                  }}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {createdTeam.length > 0 ? (
        <Card style={{ margin: '15px' }}>
          <CardContent>
            <Participants {...{ candidates }} {...{ removeCandidateHandler }} noEdit />
          </CardContent>
        </Card>
      ) : (
        <Card style={{ margin: '15px' }}>
          <CardContent>
            <Participants
              {...{ candidates }}
              {...{ removeCandidateHandler }}
              {...{ createTeamHandler }}
            />
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default withStyles(styles, { withTheme: true })(CreateTeam)
