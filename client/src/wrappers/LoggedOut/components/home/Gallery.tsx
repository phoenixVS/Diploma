import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { Box, Grid } from '@material-ui/core'
import HeadSection from './HeadSection'
import SelfAligningImage from 'common/components/SelfAligningImage'
import persons from '../../../LoggedIn/dummyData/persons'
import DeleteIcon from '@material-ui/icons/Delete'

const rowsPerPage = 25
interface GalleryProps {
  selectHome: () => void
  openLoginDialog: () => void
}
const Gallery: React.FC<GalleryProps> = (props) => {
  const { openLoginDialog } = props
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(0)

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

  return (
    <Fragment>
      {/* <HeadSection {...{ openLoginDialog }} /> */}
      <Box style={{ marginTop: '70px' }} p={1}>
        <Grid container spacing={1}>
          {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
            <Grid item xs={6} sm={4} md={3} key={post.id}>
              <SelfAligningImage
                src={post.src}
                title={post.name}
                timeStamp={post.timestamp}
                options={[
                  {
                    name: 'Delete',
                    onClick: () => 1,
                    icon: <DeleteIcon />,
                  },
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  )
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default Gallery
