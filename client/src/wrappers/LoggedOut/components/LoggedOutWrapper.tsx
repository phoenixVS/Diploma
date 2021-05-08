import React, { memo, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
// import AOS from 'aos/dist/aos'
import { Theme, withStyles } from '@material-ui/core'
import 'aos/dist/aos.css'
import { Styles } from '@material-ui/styles'
import NavBar from './navigation/NavBar'
import Footer from './footer/Footer'
import CookieRulesDialog from './cookies/CookieRulesDialog'
import CookieConsent from './cookies/CookieConsent'
import dummyBlogPosts from '../dummyData/blogPosts'
import DialogSelector from './register_login/DialogSelector'
import smoothScrollTop from '../../../common/functions/smoothScrollTop'
import { Nullable } from '@helpers/commonInterfaces/interfaces'

// AOS.init({ once: true })

const styles: Styles<Theme, {}, 'wrapper'> = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: 'hidden',
  },
})

function Main(props) {
  const { classes, children, selectedTab, setSelectedTab } = props
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [blogPosts, setBlogPosts] = useState([])
  const [dialogOpen, setDialogOpen] = useState<Nullable<string>>(null)
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false)

  const selectBlog = useCallback(() => {
    smoothScrollTop()
    document.title = 'WaVer - Blog'
    setSelectedTab('Blog')
  }, [setSelectedTab])

  const openLoginDialog = useCallback(() => {
    setDialogOpen('login')
    setIsMobileDrawerOpen(false)
  }, [setDialogOpen, setIsMobileDrawerOpen])

  const closeDialog = useCallback(() => {
    setDialogOpen(null)
  }, [setDialogOpen])

  const openRegisterDialog = useCallback(() => {
    setDialogOpen('register')
    setIsMobileDrawerOpen(false)
  }, [setDialogOpen, setIsMobileDrawerOpen])

  const openTermsDialog = useCallback(() => {
    setDialogOpen('termsOfService')
  }, [setDialogOpen])

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true)
  }, [setIsMobileDrawerOpen])

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false)
  }, [setIsMobileDrawerOpen])

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen('changePassword')
  }, [setDialogOpen])

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

  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true)
  }, [setIsCookieRulesDialogOpen])

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false)
  }, [setIsCookieRulesDialogOpen])

  useEffect(fetchBlogPosts, [fetchBlogPosts])

  return (
    <div className={classes.wrapper}>
      {!isCookieRulesDialogOpen && (
        <CookieConsent handleCookieRulesDialogOpen={handleCookieRulesDialogOpen} />
      )}
      <DialogSelector
        openLoginDialog={openLoginDialog}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        openTermsDialog={openTermsDialog}
        openRegisterDialog={openRegisterDialog}
        openChangePasswordDialog={openChangePasswordDialog}
      />
      <CookieRulesDialog open={isCookieRulesDialogOpen} onClose={handleCookieRulesDialogClose} />
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      {/* <Routing blogPosts={blogPosts} selectHome={selectHome} selectBlog={selectBlog} /> */}
      {children}
      <Footer />
    </div>
  )
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(memo(Main))
