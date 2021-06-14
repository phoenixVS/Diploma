import React, { useCallback, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
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
  Input,
} from '@material-ui/core'
import { useTranslation } from 'i18n'
import { defaultTheme } from 'common/theme'
import { useRouter } from 'next/router'
import { borderRadius } from '@material-ui/system'
import { Avatar } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import sass from './Chat.module.scss'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const styles = () => ({
  root: {
    height: '100vh',
    backgroundColor: '#111',
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
    marginTop: '20px',
  },
  chatHistory: {
    backgroundColor: '#fff',
    height: '77vh',
    borderRadius: '4px 4px 0 0',
    padding: '12px',
  },
  newMessageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    outline: 'none',
    backgroundColor: '#eee',
    border: '2px solid #ddd',
  },
  sendButton: {
    height: '24px',
    cursor: 'pointer',
  },
})

interface IMessage {
  id: string
  avatar: string
  sender: string
  text: string
  date: Date
  isMyMessage: boolean
}
const defaultChatHistory: Array<IMessage> = [
  {
    id: uuidv4(),
    avatar: `${process.env.PUBLIC_URL}/images/logged_in/image2.jpg`,
    sender: 'Алексей Иванов',
    text: 'Привет:)',
    date: new Date('March 30, 2021 03:24:00'),
    isMyMessage: false,
  },
  {
    id: uuidv4(),
    avatar: `${process.env.PUBLIC_URL}/images/logged_in/image2.jpg`,
    sender: 'Алексей Иванов',
    text: 'Если есть какие-то вопросы - спрашивайте',
    date: new Date('May 15, 2021 07:11:00'),
    isMyMessage: false,
  },
]

type ChatProps = {
  classes: any
  theme: Theme
}
const Chat: React.FC<ChatProps> = ({ classes, theme }) => {
  const { t } = useTranslation(['dashboard'])
  const [chatHistory, setChatHistory] = useState(defaultChatHistory)

  const [value, setValue] = useState('')
  const [room, setRoom] = useState('')
  const [error, setError] = useState(false)

  const [hasErrorOccurred, setHasErrorOccurred] = useState(false)
  const handleError = useCallback(
    (e) => {
      setHasErrorOccurred(true)
    },
    [setHasErrorOccurred]
  )
  const addMessageHandler = (text: string) => {
    if (text === '') {
      return
    }
    setChatHistory([
      ...chatHistory,
      {
        id: uuidv4(),
        avatar: `${process.env.PUBLIC_URL}/images/logged_in/image2.jpg`,
        sender: 'Valentyn Shapoval',
        text: text,
        date: new Date(),
        isMyMessage: true,
      },
    ])
    setValue('')
  }
  const keyPressHandler = (e) => {
    if (e.code === 'Enter') {
      addMessageHandler(value)
    }
  }

  const messageClass = (message): string =>
    cx(sass.messageRow, {
      [sass.yourMessage]: message.isMyMessage,
      [sass.otherMessage]: !message.isMyMessage,
    })
  return (
    <Container className={classes.root}>
      <Grid container spacing={4} className={classes.wrapper}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" component="h5" style={{ color: '#fff' }}>
            {t('Chat')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className={classes.chatHistory}>
            {chatHistory.map((message) => (
              <div key={message.id} className={messageClass(message)}>
                <div className={sass.messageContent}>
                  {!message.isMyMessage && (
                    <Avatar src={hasErrorOccurred ? null : sass.avatar} onError={handleError} />
                  )}
                  <div className={sass.messageText}>{message.text}</div>
                  <div className={sass.messageTime}>
                    {message.date.getDate() + ' ' + monthNames[message.date.getMonth()]}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.newMessageContainer}>
            <AttachFileIcon />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={keyPressHandler}
              placeholder={t('Type something...')}
              fullWidth
              inputProps={{ 'aria-label': 'input' }}
            />
            <div
              role="button"
              className={classes.sendButton}
              onClick={() => addMessageHandler(value)}
              onKeyPress={keyPressHandler}
              tabIndex={0}
            >
              <SendIcon />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withStyles(styles, { withTheme: true })(Chat)
