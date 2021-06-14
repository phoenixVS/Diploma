import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { useTranslation } from 'i18n'
import { defaultTheme } from 'common/theme'
import { useRouter } from 'next/router'

const styles = () => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    '@media (max-width: 350px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

type LobbyProps = {
  classes: any
  theme: Theme
  selectEnterLobby: () => void
}

const Lobby: React.FC<LobbyProps> = ({ classes, theme, selectEnterLobby }) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])
  const router = useRouter()

  const [room, setRoom] = useState('')
  const [error, setError] = useState(false)

  useEffect(selectEnterLobby, [selectEnterLobby])
  useEffect(() => {
    if (theme) {
      setStyles(theme)
    }
  }, [theme])

  const joinRoomHandler = () => {
    if (/[A-za-z0–9_]/g.test(room)) {
      router.push('/c/online-lesson/room/' + room)
    } else {
      setError(true)
    }
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h2" gutterBottom>
        {t('Lobby')}
      </Typography>
      <Card style={{ margin: '15px' }}>
        <CardContent>
          <Grid container spacing={4} className={classes.wrapper}>
            <Grid item xs={12} md={4}>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  {...{ error }}
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  label={t('Enter room id')}
                  variant="outlined"
                  style={{ width: '100%' }}
                />
              </form>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button variant="contained" color="primary" onClick={joinRoomHandler}>
                {t('Join room')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default withStyles(styles, { withTheme: true })(Lobby)
