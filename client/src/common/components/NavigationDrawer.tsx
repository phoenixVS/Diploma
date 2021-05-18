import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  withStyles,
  IconButton,
  Typography,
  withWidth,
  isWidthUp,
  Toolbar,
  Theme,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import LanguageSwitcher from 'wrappers/LoggedIn/components/navigation/LanguageSwitcher'

const styles = (theme: Theme) => ({
  closeIcon: {
    marginRight: theme.spacing(0.5),
  },
  headSection: {
    width: 200,
  },
  blackList: {
    backgroundColor: theme.palette.common.black,
    height: '100%',
  },
  langs: {
    backgroundColor: theme.palette.common.black,
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
})

interface NavigationDrawerProps {
  anchor?: 'right' | 'left' | 'top' | 'bottom'
  theme: any
  open?: boolean
  onClose?: () => void
  menuItems?: any[]
  classes?: any
  width: Breakpoint
  selectedItem: Nullable<string>
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const { width, open, onClose, anchor, classes, menuItems, selectedItem, theme } = props

  useEffect(() => {
    window.onresize = () => {
      if (isWidthUp('sm', width) && open && onClose) {
        onClose()
      }
    }
  }, [width, open, onClose])

  const selected = selectedItem ?? 'Home'
  return (
    <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}>
      <Toolbar className={classes.headSection}>
        <ListItem
          style={{
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            height: '100%',
            justifyContent: anchor === 'left' ? 'flex-start' : 'flex-end',
          }}
          disableGutters
        >
          <ListItemIcon className={classes.closeIcon}>
            <IconButton onClick={onClose} aria-label="Close Navigation">
              <CloseIcon color="primary" />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </Toolbar>
      <List className={classes.blackList}>
        {menuItems?.map((element: any) => {
          if (element.link) {
            return (
              <Link key={element.name} href={element.link}>
                <a
                  role="link"
                  className={classes.noDecoration}
                  onClick={onClose}
                  onKeyPress={() => null}
                  tabIndex={0}
                >
                  <ListItem
                    button
                    selected={selected === element.name}
                    disableRipple
                    disableTouchRipple
                  >
                    <ListItemIcon>{element.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" className="text-white">
                          {element.name}
                        </Typography>
                      }
                    />
                  </ListItem>
                </a>
              </Link>
            )
          }
          return (
            <ListItem button key={element.name} onClick={element.onClick}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" className="text-white">
                    {element.name}
                  </Typography>
                }
              />
            </ListItem>
          )
        })}
        <ListItem
          style={{
            position: 'absolute',
            bottom: '0',
            justifyContent: anchor === 'left' ? 'flex-start' : 'flex-end',
          }}
          disableGutters
        >
          <LanguageSwitcher className={classes.langs} />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default withWidth()(withStyles(styles, { withTheme: true })(NavigationDrawer))
