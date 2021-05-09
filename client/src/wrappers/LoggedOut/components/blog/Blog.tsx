import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, withStyles, Theme } from '@material-ui/core'
import BlogCard from './BlogCard'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

const styles = (theme: Theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: '100%',
  },
  wrapper: {
    minHeight: '60vh',
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
})

const getVerticalBlogPosts = (width: Breakpoint, blogPosts: any[]) => {
  const gridRows: any = [[], [], []]
  let rows: number
  let xs: number
  if (isWidthUp('md', width)) {
    rows = 3
    xs = 4
  } else if (isWidthUp('sm', width)) {
    rows = 2
    xs = 6
  } else {
    rows = 1
    xs = 12
  }
  blogPosts.forEach((blogPost, index) => {
    gridRows[index % rows].push(
      <Grid key={blogPost.id} item xs={12}>
        <Box mb={3}>
          <BlogCard
            src={blogPost.src}
            title={blogPost.title}
            snippet={blogPost.snippet}
            date={blogPost.date}
            url={blogPost.url}
          />
        </Box>
      </Grid>
    )
  })
  return gridRows.map((element, index) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ))
}

interface BlogProps {
  selectBlog: () => void
  classes: any
  width: Breakpoint
  blogPosts: any[]
}

const Blog: React.FC<BlogProps> = (props) => {
  const { classes, width, blogPosts, selectBlog } = props

  useEffect(() => {
    selectBlog()
  }, [selectBlog])

  return (
    <Box display="flex" justifyContent="center" className={classNames(classes.wrapper, 'lg-p-top')}>
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={3}>
          {getVerticalBlogPosts(width, blogPosts)}
        </Grid>
      </div>
    </Box>
  )
}

export default withWidth()(withStyles(styles, { withTheme: true })(Blog))
