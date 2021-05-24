import { Nullable } from '@helpers/commonInterfaces/interfaces'
import cx from 'classnames'
import {
  Box,
  Card,
  CssBaseline,
  Grid,
  MuiThemeProvider,
  Typography,
  withStyles,
  Theme,
} from '@material-ui/core'
import GlobalStyles from 'common/GlobalStyles'
import theme from 'common/theme'
import Head from 'next/head'
import React, { useState } from 'react'
import LoggedOutWrapper from 'wrappers/LoggedOut/components/LoggedOutWrapper'
import Link from 'next/link'
import { Styles } from '@material-ui/styles'
import { PageHead } from 'common/components/PageHead'

interface Custom500Props {
  classes: any
}

const styles: Styles<Theme, any> = (theme) => ({
  wrapper: {
    position: 'relative',
    height: '50vh',
  },
  image: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    width: '100%',
    padding: '80px 60px',
  },
  header: {
    color: theme.palette.primary.light,
  },
  link: {
    color: theme.palette.secondary.light,
    textAlign: 'center',
  },
})

const Custom500: React.FC<Custom500Props> = (props) => {
  const { classes } = props
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  return (
    <>
      <PageHead />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoggedOutWrapper {...{ selectedTab }} {...{ setSelectedTab }}>
          <div className={cx(classes.wrapper)}>
            <div className={cx('container-fluid', classes.container)}>
              <Box display="flex" justifyContent="center" className="row">
                <Card className={classes.card} data-aos-delay="200" data-aos="zoom-in">
                  <div className={cx(classes.containerFix, 'container')}>
                    <Box justifyContent="space-between" className="row">
                      <Grid item xs={12} md={12}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          height="100%"
                        >
                          <Link href="/">
                            <a className={classes.link}>
                              <Typography className={classes.header} variant={'h2'}>
                                500 - Server error
                              </Typography>
                              <Typography className={classes.link} variant={'h5'}>
                                press to go home
                              </Typography>
                            </a>
                          </Link>
                        </Box>
                      </Grid>
                    </Box>
                  </div>
                </Card>
              </Box>
            </div>
          </div>
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default withStyles(styles, { withTheme: true })(Custom500)
