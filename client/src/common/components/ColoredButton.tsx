import React, { memo } from 'react'
import { Button, ButtonProps, createMuiTheme, MuiThemeProvider } from '@material-ui/core'

type ColoredButtonProps = {
  theme?: any
  color: string
} & ButtonProps
const ColoredButton: React.FC<ColoredButtonProps> = (props) => {
  const { color, children, theme, ...buttonProps } = props
  const buttonTheme = createMuiTheme({
    ...theme,
    palette: {
      primary: {
        main: color,
      },
    },
  })
  // const buttonProps = (({ color, theme, children, ...o }) => o)(props)
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Button {...buttonProps} color="primary">
        {children}
      </Button>
    </MuiThemeProvider>
  )
}

export default memo(ColoredButton)
