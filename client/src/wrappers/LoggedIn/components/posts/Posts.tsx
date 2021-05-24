import React, { useState, useCallback, useEffect } from 'react'
import PostContent from './PostContent'
import AddPost from './AddPost'

interface PostsProps {
  EmojiTextArea: any
  ImageCropper: any
  Dropzone: any
  DateTimePicker: any
  posts: any[]
  setPosts: (posts: any[]) => void
  pushMessageToSnackbar: () => void
  selectPosts: () => void
}
const Posts: React.FC<PostsProps> = (props) => {
  const {
    selectPosts,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    posts,
    setPosts,
  } = props
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false)

  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true)
  }, [setIsAddPostPaperOpen])

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false)
  }, [setIsAddPostPaperOpen])

  useEffect(() => {
    selectPosts()
  }, [selectPosts])

  if (isAddPostPaperOpen) {
    return (
      <AddPost
        onClose={closeAddPostModal}
        EmojiTextArea={EmojiTextArea}
        ImageCropper={ImageCropper}
        Dropzone={Dropzone}
        DateTimePicker={DateTimePicker}
        pushMessageToSnackbar={pushMessageToSnackbar}
      />
    )
  }
  return (
    <PostContent
      openAddPostModal={openAddPostModal}
      posts={posts}
      setPosts={setPosts}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  )
}

export default Posts
