import { Box, Grid } from '@material-ui/core'
import React, { Fragment } from 'react'

interface LibraryProps {
  selectHome: () => void
  openLoginDialog: () => void
}
const Library: React.FC<LibraryProps> = () => {
  return (
    <Fragment>
      <Box style={{ marginTop: '70px' }} p={1}>
        <Grid container spacing={1}></Grid>
      </Box>
    </Fragment>
  )
}

export default Library
