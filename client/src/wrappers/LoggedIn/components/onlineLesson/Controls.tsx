import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Fab,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { useTranslation } from 'i18n'
import { defaultTheme } from 'common/theme'
import { useRouter } from 'next/router'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import ChatIcon from '@material-ui/icons/Chat'
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff'
import SecurityIcon from '@material-ui/icons/Security'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'

const styles = () => ({
  root: {
    backgroundColor: '#111',
    width: '93vw',
    maxWidth: '95vw',
    height: '93vh',
    paddingLeft: 0,
    paddingRight: 0,
    overflow: 'hidden',
    '@media (max-width: 350px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
})

type ControlsProps = {
  classes: any
  theme: Theme
  mute: boolean
  volume: boolean
  chat: boolean
  toggleMuteHandler: () => void
  toggleVolumeHandler: () => void
  toggleChatHandler: () => void
}

const Controls: React.FC<ControlsProps> = ({
  classes,
  theme,
  volume,
  mute,
  chat,
  toggleMuteHandler,
  toggleChatHandler,
  toggleVolumeHandler,
}) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])

  useEffect(() => {
    if (theme) {
      setStyles(theme)
    }
  }, [theme])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Fab
              color={volume ? 'secondary' : 'primary'}
              aria-label="volume"
              onClick={toggleVolumeHandler}
            >
              {volume ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </Fab>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fab
              color={mute ? 'primary' : 'secondary'}
              aria-label="mute"
              onClick={toggleMuteHandler}
            >
              {mute ? <MicOffIcon /> : <MicIcon />}
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Fab color={'secondary'} aria-label="security" onClick={() => 1}>
              <SecurityIcon />
            </Fab>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fab color={'secondary'} aria-label="volume" onClick={() => 1}>
              <PeopleAltIcon />
            </Fab>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fab
              color={chat ? 'secondary' : 'primary'}
              aria-label="mute"
              onClick={toggleChatHandler}
            >
              {chat ? <ChatIcon /> : <SpeakerNotesOffIcon />}
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles, { withTheme: true })(Controls)
