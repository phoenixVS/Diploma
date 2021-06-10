import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { Portal, Backdrop, withStyles, Theme } from '@material-ui/core'
import ScrollbarSize from '@material-ui/core/Tabs/ScrollbarSize'
import classNames from 'classnames'
import { Styles } from '@material-ui/styles'

const styles: Styles<Theme, {}> = (theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  portalImgWrapper: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: theme.zIndex.modal,
    cursor: 'pointer',
  },
  portalImgInnerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  portalImg: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  zoomedOutImage: {
    cursor: 'pointer',
  },
})

interface ZoomImageProps {
  classes?: any
  alt: string
  src: string
  theme?: any
  zoomedImgProps?: any
  className: string
}
const ZoomImage: React.FC<ZoomImageProps> = (props) => {
  const { alt, src, zoomedImgProps, classes, className, ...rest } = props
  const [zoomedIn, setZoomedIn] = useState(false)
  const [scrollbarSize, setScrollbarSize] = useState(null)

  const zoomIn = useCallback(() => {
    setZoomedIn(true)
  }, [setZoomedIn])

  const zoomOut = useCallback(() => {
    setZoomedIn(false)
  }, [setZoomedIn])

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) {
      return
    }
    if (zoomedIn) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarSize}px`
      header.style.paddingRight = `${scrollbarSize}px`
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0px'
      header.style.paddingRight = '0px'
    }
  }, [zoomedIn, scrollbarSize])

  return (
    <Fragment>
      <ScrollbarSize onChange={setScrollbarSize}></ScrollbarSize>
      {zoomedIn && (
        <Portal>
          <Backdrop open={zoomedIn} className={classes.backdrop} onClick={zoomOut}></Backdrop>
          <div
            role="button"
            onClick={zoomOut}
            onKeyPress={zoomOut}
            className={classes.portalImgWrapper}
            tabIndex={0}
          >
            <div className={classes.portalImgInnerWrapper}>
              <img
                alt={alt}
                src={src}
                layout="fill"
                className={classes.portalImg}
                {...zoomedImgProps}
              ></img>
            </div>
          </div>
        </Portal>
      )}
      <div role="button" onClick={zoomIn} onKeyDown={() => 1} tabIndex={0}>
        <img
          alt={alt}
          src={src}
          className={classNames(className, classes.zoomedOutImage)}
          {...rest}
        ></img>
      </div>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(ZoomImage)
