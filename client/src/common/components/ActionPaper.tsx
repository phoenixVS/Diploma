import React from 'react'
import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  withStyles,
  Theme,
} from '@material-ui/core'

const styles = (theme: Theme) => ({
  helpPadding: {
    '@media (max-width:  400px)': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  fullWidth: {
    width: '100%',
  },
})

interface ActionPaperProps {
  theme: any
  classes: any
  title: any
  content: any
  maxWidth: string
  actions: any
  helpPadding: boolean
  fullWidthActions: boolean
}
const ActionPaper: React.FC<ActionPaperProps> = (props) => {
  const { theme, classes, title, content, maxWidth, actions, helpPadding, fullWidthActions } = props
  return (
    <Box pt={1}>
      <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && (
          <DialogContent classes={helpPadding ? { root: classes.helpPadding } : undefined}>
            {content}
          </DialogContent>
        )}
        {actions && (
          <Box pb={2} pr={2}>
            <DialogActions classes={fullWidthActions ? classes.fullWidth : undefined}>
              {actions}
            </DialogActions>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default withStyles(styles, { withTheme: true })(ActionPaper)
