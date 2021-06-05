import React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { i18n } from 'i18n'

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: '58px',
    padding: '0',
  },
  label: {
    color: '#cf55fc',
    fontWeight: 700,
    padding: '0',
  },
  sec: {
    fontWeight: 700,
    padding: '0 8px',
  },
  secDark: {
    fontWeight: 700,
    color: '#fff',
    padding: '0 8px',
  },
  overrides: {
    MUITypography: {
      root: {
        fontWeight: 700,
      },
      body1: {
        fontWeight: 700,
        color: '#fff',
      },
    },
    MuiListItemText: {
      body1: {
        fontWeight: 700,
        color: '#fff',
      },
    },
  },
}))

const options = ['English', 'Русский', 'Українська']
const langsIndices = ['en', 'ru', 'ua']

interface languageSwitcherProps {
  className?: string
  inNavDrawer?: boolean
}
const LanguageSwitcher: React.FC<languageSwitcherProps> = ({
  className = '',
  inNavDrawer = false,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(
    langsIndices.findIndex((lang) => lang === i18n.language)
  )

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    i18n.changeLanguage(langsIndices[index])
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={cx(classes.root, className)}>
      <List
        component="nav"
        aria-label="Language"
        className={inNavDrawer ? classes.sec : classes.secDark}
      >
        <ListItem
          className={inNavDrawer ? classes.sec : classes.secDark}
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="select language"
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Language"
            className={classes.label}
            style={{
              fontWeight: 700,
            }}
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 1}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default LanguageSwitcher
