import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import smoothScrollTop from '../../common/functions/smoothScrollTop'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import LoggedOutWrapper from '../../wrappers/LoggedOut/components/LoggedOutWrapper'
import Blog from '../../wrappers/LoggedOut/components/blog/Blog'
import dummyBlogPosts from '../../wrappers/LoggedOut/dummyData/blogPosts'

const Pace = dynamic(() => import('../../common/components/Pace'), { ssr: false })

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  const selectBlog = useCallback(() => {
    smoothScrollTop()
    document.title = 'prb - Blog'
    setSelectedTab('Blog')
  }, [setSelectedTab])

  const fetchBlogPosts = useCallback(() => {
    const blogPosts = dummyBlogPosts.map((blogPost) => {
      let title = blogPost.title
      title = title.toLowerCase()
      /* Remove unwanted characters, only accept alphanumeric and space */
      title = title.replace(/[^A-Za-z0-9 ]/g, '')
      /* Replace multi spaces with a single space */
      title = title.replace(/\s{2,}/g, ' ')
      /* Replace space with a '-' symbol */
      title = title.replace(/\s/g, '-')
      blogPost.url = `/blog/post/${title}`
      blogPost.params = `?id=${blogPost.id}`
      return blogPost
    })
    setBlogPosts(blogPosts)
  }, [setBlogPosts])

  useEffect(fetchBlogPosts, [fetchBlogPosts])

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <LoggedOutWrapper {...{ selectedTab }} {...{ setSelectedTab }}>
          <Blog {...{ blogPosts }} {...{ selectBlog }} />
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default IndexPage
