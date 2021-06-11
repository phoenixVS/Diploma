import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Button, Card, CardContent, Container, Grid, TextField, Theme, Typography, withStyles } from '@material-ui/core'
import { useTranslation } from 'i18n';
import { defaultTheme } from 'common/theme'
import { useRouter } from 'next/router';

const styles = () => ({
  root: {
    backgroundColor: '#111',
    width: '90vw',
    maxWidth: '90vw',
    height: '90vh',
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
    alignItems: 'center'
  }
})

type RoomProps = {
  classes: any;
  theme: Theme
  selectEnterLobby: () => void
};

const Room:React.FC<RoomProps> = ({ classes, theme, selectEnterLobby }) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])
  const router = useRouter()

  const [room, setRoom] = useState('')
  const [error, setError] = useState(false)
  const videoRef = useRef(null)

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

  useEffect(() => {
    let myVideoStream
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      myVideoStream = stream
      
      videoRef.current.srcObject = stream
      videoRef.current.addEventListener('loadmetadata', () => {
        videoRef.current.play()
        videoRef.current.muted = true
      })
    })
  }, [])

  return (
    <Container className={classes.root}>
            <Grid container spacing={4} className={classes.wrapper}>
              <Grid item xs={12} md={4}>
                <video ref={videoRef}></video>
              </Grid>
              <Grid item xs={12} md={3}>
              </Grid>
            </Grid>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(Room)