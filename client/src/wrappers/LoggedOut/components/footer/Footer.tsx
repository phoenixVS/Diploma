import React from 'react'
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Hidden,
  withStyles,
  withWidth,
  isWidthUp,
  TextField,
} from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'
import WaveBorder from '../../../../common/components/WaveBorder'
import transitions from '@material-ui/core/styles/transitions'
import ColoredButton from '../../../../common/components/ColoredButton'
import { useTranslation } from 'i18n'

const styles = (theme: any) => ({
  footerInner: {
    backgroundColor: theme.palette.common.darkBlack,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    color: theme.palette.common.white,
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white,
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: '#33383b !important',
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: '#33383b',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  link: {
    cursor: 'Pointer',
    color: theme.palette.common.white,
    transition: transitions.create(['color'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  whiteBg: {
    backgroundColor: theme.palette.common.white,
  },
})

const infos = [
  {
    icon: <PhoneIcon />,
    description: '+380 067 782 16 87',
  },
  {
    icon: <MailIcon />,
    description: 'shapoval.vad.nick@gmail.com',
  },
]

const socialIcons = [
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    label: 'Github',
    href: 'https://github.com/phoenixVS/Diploma',
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Facebook</title>
        <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
      </svg>
    ),
    label: 'Facebook',
    href: 'https://facebook.com',
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="14 14 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Instagram</title>
        <g
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          fillRule="evenodd"
          id="black"
          stroke="none"
          strokeWidth="1"
        >
          <g id="instagram">
            <path
              d="M30,60 C46.5685433,60 60,46.5685433 60,30 C60,13.4314567 46.5685433,0 30,0 C13.4314567,0 0,13.4314567 0,30 C0,46.5685433 13.4314567,60 30,60 Z"
              fill="#000000"
              id="Instagram"
            />
            <path
              d="M21.7673614,24.2307692 L12.6923077,24.2307692 L12.6923077,23.0769231 L12.692308,23.0769231 C12.6923085,34.2046259 12.6923077,41.1538462 12.6923077,41.1538462 C12.6923077,46.1538451 17.6923077,46.1538451 17.6923077,46.1538451 L41.1538451,46.1538451 C41.1538451,46.1538451 46.1538451,46.1538451 46.1538462,41.1538462 L46.1538454,24.2307692 L46.1538462,24.2307692 L46.1538462,23.0769231 L36.3467878,23.0769231 C34.7679692,20.9749961 32.2543003,19.6153846 29.4230769,19.6153846 C26.5918536,19.6153846 24.0781847,20.9749961 22.4993661,23.0769231 L12.692308,23.0769231 C12.6923079,21.3763439 12.6923078,19.5781757 12.6923077,17.6923077 C12.6923077,14.53622 14.6844856,13.3723102 16.1538462,12.9430807 L16.1538462,19.6153846 L17.3076923,19.6153846 L17.3076923,12.7168978 L17.3076923,12.7168978 C17.5477091,12.6923077 17.6923077,12.6923077 17.6923077,12.6923077 L41.1538462,12.6923077 C41.1538462,12.6923077 46.1538451,12.6923077 46.1538451,17.6923077 L46.1538454,24.2307692 L37.0787925,24.2307692 C37.716079,25.4363757 38.0769231,26.8106634 38.0769231,28.2692308 C38.0769231,33.0486183 34.2024644,36.9230769 29.4230769,36.9230769 C24.6436894,36.9230769 20.7692308,33.0486183 20.7692308,28.2692308 C20.7692308,26.8106634 21.1300748,25.4363757 21.7673614,24.2307692 L21.7673614,24.2307692 Z M40.0785289,15 C38.9730725,15 38.0769231,15.9014423 38.0769231,17.0016058 L38.0769231,18.767625 C38.0769231,19.8730813 38.9783654,20.7692308 40.0785289,20.7692308 L41.8445481,20.7692308 C42.9500044,20.7692308 43.8461538,19.8677885 43.8461538,18.767625 L43.8461538,17.0016058 C43.8461538,15.8961494 42.9447115,15 41.8445481,15 L40.0785289,15 Z M20.7692308,12.6923077 L20.7692308,19.6153846 L21.9230769,19.6153846 L21.9230769,12.6923077 L20.7692308,12.6923077 Z M18.4615385,12.6923077 L18.4615385,19.6153846 L19.6153846,19.6153846 L19.6153846,12.6923077 L18.4615385,12.6923077 Z M29.4230769,35.1923077 C33.2465869,35.1923077 36.3461538,32.0927408 36.3461538,28.2692308 C36.3461538,24.4457208 33.2465869,21.3461538 29.4230769,21.3461538 C25.5995669,21.3461538 22.5,24.4457208 22.5,28.2692308 C22.5,32.0927408 25.5995669,35.1923077 29.4230769,35.1923077 Z M29.4230769,32.8846154 C31.9720836,32.8846154 34.0384615,30.8182374 34.0384615,28.2692308 C34.0384615,25.7202241 31.9720836,23.6538462 29.4230769,23.6538462 C26.8740703,23.6538462 24.8076923,25.7202241 24.8076923,28.2692308 C24.8076923,30.8182374 26.8740703,32.8846154 29.4230769,32.8846154 Z"
              fill="#FFFFFF"
            />
          </g>
        </g>
      </svg>
    ),
    label: 'Instagram',
    href: 'https://instagram.com/',
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Twitter</title>
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
      </svg>
    ),
    label: 'Twitter',
    href: 'https://www.twitter.com/',
  },
]

interface FooterProps {
  theme: any
  classes: any
  width: string
}
const Footer: React.FC<FooterProps> = (props) => {
  const { classes, theme, width } = props
  const { t } = useTranslation(['common'])
  return (
    <footer className="lg-p-top">
      <WaveBorder
        upperColor="#FFFFFF"
        lowerColor={theme.palette.common.darkBlack}
        animationNegativeDelay={4}
      />
      <div className={classes.footerInner}>
        <Grid container spacing={isWidthUp('md', width) ? 10 : 5}>
          <Grid item xs={12} md={6} lg={4}>
            <form>
              <Box display="flex" flexDirection="column">
                <Box mb={1}>
                  <TextField
                    variant="outlined"
                    multiline
                    placeholder={t('Get in touch with us')}
                    inputProps={{ 'aria-label': 'Get in Touch' }}
                    InputProps={{
                      className: classes.whiteBg,
                    }}
                    rows={4}
                    fullWidth
                    required
                  />
                </Box>
                <ColoredButton color={theme.palette.common.white} variant="outlined" type="submit">
                  {t('Send Message')}
                </ColoredButton>
              </Box>
            </form>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6} lg={4}>
              <Box display="flex" justifyContent="center">
                <div>
                  {infos.map((info, index) => (
                    <Box display="flex" mb={1} key={index}>
                      <Box mr={2}>
                        <IconButton className={classes.infoIcon} tabIndex={-1} disabled>
                          {info.icon}
                        </IconButton>
                      </Box>
                      <Box display="flex" flexDirection="column" justifyContent="center">
                        <Typography variant="h6" className="text-white">
                          {info.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" paragraph className="text-white">
              {t('About the Company')}
            </Typography>
            <Typography style={{ color: '#8f9296' }} paragraph>
              {t(
                'Our team specialized on training athletes of all categories. We have worked with plenty tournaments champions and even more students have been inspired with sport.'
              )}
            </Typography>
            <Box display="flex">
              {socialIcons.map((socialIcon, index) => (
                <Box key={index} mr={index !== socialIcons.length - 1 ? 1 : 0}>
                  <IconButton
                    aria-label={socialIcon.label}
                    className={classes.socialIcon}
                    href={socialIcon.href}
                  >
                    {socialIcon.icon}
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </div>
    </footer>
  )
}

export default withWidth()(withStyles(styles, { withTheme: true })(Footer))
