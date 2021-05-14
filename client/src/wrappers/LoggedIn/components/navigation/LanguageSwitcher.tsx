import React from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { i18n } from 'i18n'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    color: '#cf55fc',
    fontWeight: 700,
  },
}))

const options = ['English', 'Русский', 'Українська']
const langsIndices = ['en', 'ru', 'ua']

interface languageSwitcherProps {
  className?: string
}
const LanguageSwitcher: React.FC<languageSwitcherProps> = ({ className = '' }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

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
      <List component="nav" aria-label="Language">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="select language"
          onClick={handleClickListItem}
        >
          <ListItemText
            className={classes.label}
            primary="Language"
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
