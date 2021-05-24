import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '../../common/theme'
import GlobalStyles from '../../common/GlobalStyles'
import LoggedInWrapper from 'wrappers/LoggedIn/components/LoggedInWrapper'
import smoothScrollTop from 'common/functions/smoothScrollTop'
import Posts from 'wrappers/LoggedIn/components/posts/Posts'
import { Nullable } from '@helpers/commonInterfaces/interfaces'

import persons from '../../wrappers/LoggedIn/dummyData/persons'
import { PageHead } from 'common/components/PageHead'

const IndexPage: NextPage = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [selectedTab, setSelectedTab] = useState<Nullable<string>>(null)
  const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false)
  const [EmojiTextArea, setEmojiTextArea] = useState<any>(null)
  const [hasFetchedEmojiTextArea, setHasFetchedEmojiTextArea] = useState(false)
  const [ImageCropper, setImageCropper] = useState<any>(null)
  const [hasFetchedImageCropper, setHasFetchedImageCropper] = useState(false)
  const [hasFetchedDropzone, setHasFetchedDropzone] = useState(false)
  const [hasFetchedDateTimePicker, setHasFetchedDateTimePicker] = useState(false)
  const [DateTimePicker, setDateTimePicker] = useState<any>(null)
  const [Dropzone, setDropzone] = useState<any>(null)

  const fetchRandomPosts = useCallback(() => {
    shuffle(persons)
    const posts = []
    const iterations = persons.length
    const oneDaySeconds = 60 * 60 * 24
    let curUnix = Math.round(new Date().getTime() / 1000 - iterations * oneDaySeconds)
    for (let i = 0; i < iterations; i += 1) {
      const person = persons[i]
      const post = {
        id: i,
        src: person.src,
        timestamp: curUnix,
        name: person.name,
      }
      curUnix += oneDaySeconds
      posts.push(post)
    }
    posts.reverse()
    setPosts(posts)
  }, [setPosts])

  useEffect(() => {
    fetchRandomPosts()
  }, [fetchRandomPosts])

  const selectPosts = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Posts'
    setSelectedTab('Posts')
    if (!hasFetchedEmojiTextArea) {
      setHasFetchedEmojiTextArea(true)
      import('../../common/components/EmojiTextArea').then((Component) => {
        setEmojiTextArea(Component.default)
      })
    }
    if (!hasFetchedImageCropper) {
      setHasFetchedImageCropper(true)
      import('../../common/components/ImageCropper').then((Component) => {
        setImageCropper(Component.default)
      })
    }
    if (!hasFetchedDropzone) {
      setHasFetchedDropzone(true)
      import('../../common/components/Dropzone').then((Component) => {
        setDropzone(Component.default)
      })
    }
    if (!hasFetchedDateTimePicker) {
      setHasFetchedDateTimePicker(true)
      import('../../common/components/DateTimePicker').then((Component) => {
        setDateTimePicker(Component.default)
      })
    }
  }, [
    setSelectedTab,
    setEmojiTextArea,
    setImageCropper,
    setDropzone,
    setDateTimePicker,
    hasFetchedEmojiTextArea,
    setHasFetchedEmojiTextArea,
    hasFetchedImageCropper,
    setHasFetchedImageCropper,
    hasFetchedDropzone,
    setHasFetchedDropzone,
    hasFetchedDateTimePicker,
    setHasFetchedDateTimePicker,
  ])

  return (
    <>
      <PageHead />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <LoggedInWrapper
          {...{ selectedTab }}
          {...{ setSelectedTab }}
          {...{ isAddBalanceDialogOpen }}
          {...{ setIsAddBalanceDialogOpen }}
        >
          {/*@ts-ignore*/}
          <Posts
            EmojiTextArea={EmojiTextArea}
            ImageCropper={ImageCropper}
            Dropzone={Dropzone}
            DateTimePicker={DateTimePicker}
            posts={posts}
            setPosts={setPosts}
            selectPosts={selectPosts}
          />
        </LoggedInWrapper>
      </MuiThemeProvider>
    </>
  )
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default IndexPage
