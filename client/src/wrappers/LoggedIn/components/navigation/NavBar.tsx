import React, { Fragment, useRef, useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  withStyles,
  isWidthUp,
  withWidth,
  Theme,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import GroupIcon from '@material-ui/icons/Group'
import ImageIcon from '@material-ui/icons/Image'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import DuoIcon from '@material-ui/icons/Duo';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MessagePopperButton from './MessagePopperButton'
import SideDrawer from './SideDrawer'
import Balance from './Balance'
import NavigationDrawer from '../../../../common/components/NavigationDrawer'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { Styles } from '@material-ui/styles'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'i18n'

const styles: Styles<Theme, {}> = (theme: Theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  logo: {
    maxWidth: '30vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  drawerPaper: {
    height: '100%vh',
    whiteSpace: 'nowrap',
    border: 0,
    width: theme.spacing(7),
    overflowX: 'hidden',
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.common.black,
  },
  smBordered: {
    [theme.breakpoints.down('xs')]: {
      borderRadius: '50% !important',
    },
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: 'auto',
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    maxWidth: '15vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  permanentDrawerListItem: {
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
})
interface NavBarProps {
  selectedTab: Nullable<string>
  classes?: any
  width?: Breakpoint
  messages?: any[]
  openAddBalanceDialog: () => void
}
const NavBar: React.FC<NavBarProps> = (props) => {
  const { selectedTab, messages, classes, width, openAddBalanceDialog } = props
  // Will be use to make website more accessible by screen readers
  const links = useRef([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)

  const { t } = useTranslation(['common'])

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true)
  }, [setIsMobileOpen])

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false)
  }, [setIsMobileOpen])

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true)
  }, [setIsSideDrawerOpen])

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false)
  }, [setIsSideDrawerOpen])

  useEffect(() => {
    console.log('selected tab', selectedTab)
  }, [selectedTab])

  const menuItems = [
    {
      link: '/c/dashboard',
      name: t('Dashboard'),
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={selectedTab === t('Dashboard') ? classes.textPrimary : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: '/c/online-lesson',
      name: t('Online lesson'),
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DuoIcon
            className={selectedTab === t('Online lesson') ? classes.textPrimary : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <DuoIcon className="text-white" />,
      },
    },
    {
      link: '/c/create-team',
      name: t('Create team'),
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <GroupIcon
            className={selectedTab === t('Create team') ? classes.textPrimary : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <GroupIcon className="text-white" />,
      },
    },
    {
      link: '/c/stats',
      name: t('Watch stats'),
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <EqualizerIcon
            className={selectedTab === t('Watch stats') ? classes.textPrimary : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <EqualizerIcon className="text-white" />,
      },
    },
    {
      link: '/c/posts',
      name: t('Posts'),
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ImageIcon
            className={selectedTab === t('Posts') ? classes.textPrimary : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <ImageIcon className="text-white" />,
      },
    },
    {
      link: '/c/subscription',
      name: t('Subscription'),
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AccountBalanceIcon
            className={selectedTab === t('Subscription') ? classes.textPrimary : 'text-white'}
            fontSize="small"
          />
        ),
        mobile: <AccountBalanceIcon className="text-white" />,
      },
    },
    {
      link: '/',
      name: t('Logout'),
      icon: {
        desktop: <PowerSettingsNewIcon className="text-white" fontSize="small" />,
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ]
  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton aria-label="Open Navigation" onClick={openMobileDrawer} color="primary">
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <LanguageSwitcher />
            </Hidden>
            <Link href="/">
              <a className={classes.logo}>
                <Typography
                  variant="h4"
                  className={classes.brandText}
                  display="inline"
                  color="primary"
                >
                  {t('Work')}
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.brandText}
                  display="inline"
                  color="secondary"
                >
                  {t('out')}
                </Typography>
              </a>
            </Link>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
            {isWidthUp('sm', width) && (
              <Box mr={3}>
                <Balance balance={2573} openAddBalanceDialog={openAddBalanceDialog} />
              </Box>
            )}
            <MessagePopperButton messages={messages} />
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                src={`${process.env.PUBLIC_URL}/images/logged_in/profilePicture.jpg`}
                className={classNames(classes.accountAvatar)}
              />
              {isWidthUp('sm', width) && (
                <ListItemText
                  className={classes.username}
                  primary={<Typography color="textPrimary">{'valentin.sh@gmail.com'}</Typography>}
                />
              )}
            </ListItem>
          </Box>
          <IconButton onClick={openDrawer} color="primary" aria-label="Open Sidedrawer">
            <SupervisorAccountIcon />
          </IconButton>
          <SideDrawer open={isSideDrawerOpen} onClose={closeDrawer} />
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link href={element.link} key={index}>
                <a
                  ref={(node) => {
                    links.current[index] = node
                  }}
                  role="link"
                  className={classes.menuLink}
                  onClick={element.onClick}
                  onKeyPress={() => 0}
                  tabIndex={0}
                >
                  <Tooltip title={element.name} placement="right" key={element.name}>
                    <ListItem
                      selected={selectedTab === element.name}
                      button
                      divider={index !== menuItems.length - 1}
                      className={classes.permanentDrawerListItem}
                      onClick={() => {
                        links.current[index].click()
                      }}
                      aria-label={element.name === 'Logout' ? 'Logout' : `Go to ${element.name}`}
                    >
                      <ListItemIcon className={classes.justifyCenter}>
                        {element.icon.desktop}
                      </ListItemIcon>
                    </ListItem>
                  </Tooltip>
                </a>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  )
}

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar))
