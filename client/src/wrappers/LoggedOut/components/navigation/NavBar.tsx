import React from 'react'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles,
  Theme,
  Box,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import BookIcon from '@material-ui/icons/Book'
import DuoIcon from '@material-ui/icons/Duo'
import ScheduleIcon from '@material-ui/icons/Schedule'
import NavigationDrawer from '../../../../common/components/NavigationDrawer'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import { Styles } from '@material-ui/styles'
import LanguageSwitcher from 'wrappers/LoggedIn/components/navigation/LanguageSwitcher'
import { useTranslation } from 'i18n'

const styles: Styles<Theme, {}> = (theme: Theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    zIndex: 10,
  },
  appBar: {
    position: 'relative',
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
})

interface NavBarProps {
  classes?: any
  handleMobileDrawerOpen?: () => any
  handleMobileDrawerClose?: () => any
  mobileDrawerOpen?: boolean
  selectedTab: Nullable<string>
  selectTab: (name: string) => void
  openRegisterDialog?: any
  openLoginDialog?: any
}
const NavBar: React.FC<NavBarProps> = (props) => {
  const {
    classes,
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab,
  } = props
  const { t } = useTranslation(['common'])
  const menuItems = [
    {
      link: '/blog',
      name: t('News'),
      icon: <DynamicFeedIcon className="text-white" />,
    },
    {
      link: '/gallery',
      name: t('Gallery'),
      icon: <PhotoAlbumIcon className="text-white" />,
    },
    {
      link: '/library',
      name: t('Library'),
      icon: <BookIcon className="text-white" />,
    },
    // {
    //   link: '/c/online',
    //   name: t('Online lesson'),
    //   icon: <DuoIcon className="text-white" />,
    // },
    // {
    //   link: '/test',
    //   name: t('Create seminar'),
    //   icon: <ScheduleIcon className="text-white" />,
    // },
    {
      name: t('Sign up'),
      onClick: openRegisterDialog,
      icon: <HowToRegIcon className="text-white" />,
    },
    {
      name: t('Login'),
      onClick: openLoginDialog,
      icon: <LockOpenIcon className="text-white" />,
    },
  ]
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box display="flex" alignItems="center">
            <Hidden xsDown>
              <LanguageSwitcher />
            </Hidden>
            <Link href="/">
              <a>
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
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map((element) => {
                if (element.link) {
                  return (
                    <Link key={element.name} href={element.link}>
                      <a
                        className={classes.noDecoration}
                        onClick={handleMobileDrawerClose}
                        role="link"
                        onKeyPress={handleMobileDrawerClose}
                        tabIndex={0}
                      >
                        <Button
                          color="secondary"
                          size="large"
                          classes={{ text: classes.menuButtonText }}
                        >
                          {element.name}
                        </Button>
                      </a>
                    </Link>
                  )
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                )
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(NavBar)
