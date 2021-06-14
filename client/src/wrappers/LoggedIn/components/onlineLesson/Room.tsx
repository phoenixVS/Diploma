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
import Chat from './Chat/Chat'
import Controls from './Controls'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import classNames from 'classnames'

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
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 'auto',
    height: '100%',
  },
  video: {
    height: '300px',
    width: '400px',
    backgroundColor: '#4829B2',
    objectFit: 'cover',
  },
  videoPlaceholder: {
    height: '300px',
    width: '400px',
    backgroundColor: '#4829B2',
  },
  v_view: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  controls: {
    marginTop: '300px',
    marginLeft: '300px',
  },
  noVideoPlaceholder: {
    position: 'absolute',
    top: '50%',
    color: 'red',
  },
  noVideoIcon: {
    width: '100px',
    height: '100px',
  },
})

type RoomProps = {
  classes: any
  theme: Theme
  selectEnterLobby: () => void
}

const Room: React.FC<RoomProps> = ({ classes, theme, selectEnterLobby }) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])
  const router = useRouter()

  useEffect(selectEnterLobby, [selectEnterLobby])

  const [room, setRoom] = useState('')
  const [error, setError] = useState(false)
  const [volume, setVolume] = useState(true)
  const [chat, setChat] = useState(true)
  const [mute, setMute] = useState(false)
  const videoRef = useRef(null)

  const toggleVolumeHandler = () => {
    setVolume(!volume)
  }
  const toggleMuteHandler = () => {
    setMute(!mute)
  }
  const toggleChatHandler = () => {
    setChat(!chat)
  }

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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current.play()
          videoRef.current.muted = true
        })
      })
  }, [])

  return (
    <Container className={classes.root}>
      <Grid container spacing={2} className={classes.wrapper}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4} className={classes.wrapper}>
            <Grid item xs={12} md={6} className={classes.v_view}>
              <div className={classes.noVideoPlaceholder}>
                <VideocamOffIcon style={{ width: '50px', height: '50px', marginTop: '-20px' }} />
              </div>
              <video ref={videoRef} className={classes.video}>
                <track default kind="captions" srcLang="en" />
                Sorry, your browser doesnt support embedded videos.
              </video>
            </Grid>
            <Grid item xs={12} md={6} className={classes.v_view}>
              <div className={classes.noVideoPlaceholder}>
                <VideocamOffIcon style={{ width: '50px', height: '50px', marginTop: '-20px' }} />
              </div>
              <div className={classes.videoPlaceholder}></div>
            </Grid>
            <Grid item xs={12} md={12} className={classes.controls}>
              <Controls
                {...{ mute }}
                {...{ volume }}
                {...{ chat }}
                {...{ toggleChatHandler }}
                {...{ toggleMuteHandler }}
                {...{ toggleVolumeHandler }}
              />
            </Grid>
          </Grid>
        </Grid>
        {chat && (
          <Grid item xs={12} md={3}>
            <Chat />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default withStyles(styles, { withTheme: true })(Room)
