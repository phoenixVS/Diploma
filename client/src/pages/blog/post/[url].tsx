import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../../common/theme'
import GlobalStyles from '../../../common/GlobalStyles'
import { Nullable } from '@helpers/commonInterfaces/interfaces'
import LoggedOutWrapper from 'wrappers/LoggedOut/components/LoggedOutWrapper'
import dummyBlogPosts from '../../../wrappers/LoggedOut/dummyData/blogPosts'
import BlogPost from '../../../wrappers/LoggedOut/components/blog/BlogPost'
import { useRouter } from 'next/dist/client/router'
import { PageHead } from 'common/components/PageHead'

const IndexPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const router = useRouter()

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

  const post = blogPosts.find((item) => {
    let title = item.title
    title = title.toLowerCase()
    /* Remove unwanted characters, only accept alphanumeric and space */
    title = title.replace(/[^A-Za-z0-9 ]/g, '')
    /* Replace multi spaces with a single space */
    title = title.replace(/\s{2,}/g, ' ')
    /* Replace space with a '-' symbol */
    title = title.replace(/\s/g, '-')
    return title === router.query.url
  })
  console.log(
    `%c⚙ Post `,
    "color: #FFFFFF; font: 18px 'Open Sans', sans-serif; font-weight: 500; background: #cff9fc; border-radius: 10px; padding: 0 15px",
    post
  )
  return (
    <>
      <PageHead />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoggedOutWrapper {...{ selectedTab }} {...{ setSelectedTab }}>
          {post ? (
            <BlogPost
              title={post.title}
              key={post.title}
              src={post.src}
              date={post.date}
              content={post.content()}
              otherArticles={blogPosts.filter((blogPost) => blogPost.id !== post.id)}
            />
          ) : (
            <></>
          )}
        </LoggedOutWrapper>
      </MuiThemeProvider>
    </>
  )
}

export default IndexPage
