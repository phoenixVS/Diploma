import React, { useState, useCallback, useRef, Fragment } from 'react'
import classNames from 'classnames'
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
  Theme,
} from '@material-ui/core'
import FormDialog from '../../../../common/components/FormDialog'
import HighlightedInformation from '../../../../common/components/HighlightedInformation'
import ButtonCircularProgress from '../../../../common/components/ButtonCircularProgress'
import VisibilityPasswordTextField from '../../../../common/components/VisibilityPasswordTextField'
import { useRouter } from 'next/dist/client/router'

const styles = (theme: Theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:enabled:hover': {
      color: theme.palette.primary.dark,
    },
    '&:enabled:focus': {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: 'auto',
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
})

interface LoginDialogProps {
  classes: any
  onClose: () => void
  setStatus: (status: Nullable<string>) => void
  openChangePasswordDialog: () => void
  history?: any
  status: string
}
const LoginDialog: React.FC<LoginDialogProps> = (props) => {
  const { setStatus, history, classes, onClose, openChangePasswordDialog, status } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const loginEmail = useRef<{ value: string }>()
  const loginPassword = useRef<{ value: string }>()
  const router = useRouter()
  const login = useCallback(() => {
    setIsLoading(true)
    setStatus(null)
    if (loginEmail?.current?.value !== 'test@web.com') {
      setTimeout(() => {
        setStatus('invalidEmail')
        setIsLoading(false)
      }, 1500)
    } else if (loginPassword?.current?.value !== 'HaRzwc') {
      setTimeout(() => {
        setStatus('invalidPassword')
        setIsLoading(false)
      }, 1500)
    } else {
      setTimeout(() => {
        router.push('/c/dashboard')
      }, 150)
    }
  }, [setIsLoading, loginEmail, loginPassword, history, setStatus])

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault()
          login()
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === 'invalidEmail'}
              required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === 'invalidEmail') {
                  setStatus(null)
                }
              }}
              helperText={
                status === 'invalidEmail' && "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === 'invalidPassword'}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === 'invalidPassword') {
                  setStatus(null)
                }
              }}
              helperText={
                status === 'invalidPassword' ? (
                  <span>
                    Incorrect password. Try again, or click on <b>&quot;Forgot Password?&quot;</b>{' '}
                    to reset it.
                  </span>
                ) : (
                  ''
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            {status === 'verificationEmailSend' ? (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your email address
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
            )}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              role="button"
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? () => {} : openChangePasswordDialog}
              tabIndex={0}
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if ((!isLoading && event.keyCode === 13) || event.keyCode === 32) {
                  openChangePasswordDialog()
                }
              }}
            >
              Forgot Password?
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  )
}

export default withStyles(styles)(LoginDialog)
