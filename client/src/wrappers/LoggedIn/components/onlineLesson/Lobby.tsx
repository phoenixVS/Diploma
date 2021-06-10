import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Container, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import { useTranslation } from 'i18n';
import { defaultTheme } from 'common/theme'

const styles = () => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    '@media (max-width: 350px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
})

type LobbyProps = {
  classes: any;
  theme: Theme
  selectCreateTeam: () => void
};

const Lobby:React.FC<LobbyProps> = ({ classes, theme, selectCreateTeam }) => {
  const [styles, setStyles] = useState(defaultTheme)
  const { t } = useTranslation(['dashboard'])

  useEffect(selectCreateTeam, [selectCreateTeam])
  useEffect(() => {
    if (theme) {
      setStyles(theme)
    }
  }, [theme])
  
  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h2" gutterBottom>
        {t('Lobby')}
      </Typography>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(Lobby)