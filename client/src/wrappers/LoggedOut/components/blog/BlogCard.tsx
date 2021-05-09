import React from 'react'
import Link from 'next/link'
import format from 'date-fns/format'
import classNames from 'classnames'
import { Typography, Card, Box, withStyles, Theme } from '@material-ui/core'

const styles = (theme: Theme) => ({
  img: {
    width: '100%',
    height: 'auto',
    marginBottom: 8,
  },
  card: {
    boxShadow: theme.shadows[2],
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  title: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  link: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  showFocus: {
    '&:focus span': {
      color: theme.palette.secondary.dark,
    },
  },
})

interface BlogCardProps {
  classes?: any
  url: string
  title: string
  date: number
  snippet: string
  src?: string
}
const BlogCard: React.FC<BlogCardProps> = (props) => {
  const { classes, url, src, date, title, snippet } = props

  return (
    <Card className={classes.card}>
      {src && (
        <Link href={url}>
          <a role="link" tabIndex={-1}>
            <img src={src} className={classes.img} alt="" />
          </a>
        </Link>
      )}
      <Box p={2}>
        <Typography variant="body2" color="textSecondary">
          {format(new Date(date * 1000), 'PPP', {
            awareOfUnicodeTokens: true,
          })}
        </Typography>
        <Link href={url}>
          <a className={classNames(classes.noDecoration, classes.showFocus)}>
            <Typography variant="h6">
              <span className={classes.title}>{title}</span>
            </Typography>
          </a>
        </Link>
        <Typography variant="body1" color="textSecondary">
          {snippet}
          <Link href={url}>
            <a className={classes.noDecoration} tabIndex={-1}>
              <span className={classes.link}> read more...</span>
            </a>
          </Link>
        </Typography>
      </Box>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(BlogCard)
