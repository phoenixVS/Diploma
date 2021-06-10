import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';
import { defaultTheme } from 'common/theme'
import cx from 'classnames';
import { Button, Card, CardContent, Container, Fab, Grid, ListItem, ListItemIcon, ListItemText, Slider, TextField, Theme, Typography, withStyles } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { List } from '@material-ui/core';

const styles = () => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    '@media (max-width: 350px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  partiHeader: {
    paddingLeft: '14px'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
interface ICandidate {
  name: string
  prospects: number
  cost: number
}

type ParticipantsProps = {
  candidates: Array<ICandidate>
  createTeamHandler?: () => void
  removeCandidateHandler: (id: number) => void
  noEdit?: boolean
  classes: any
  theme: Theme
};
const Participants:React.FC<ParticipantsProps> = ({ classes, theme, candidates, noEdit, createTeamHandler, removeCandidateHandler }) => {
  const { t } = useTranslation(['dashboard'])
  return (
    <Container className={classes.root}>
      <Grid container spacing={2} className={classes.center}>
        <Grid item xs={4} md={6}>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Candidates')}
          </Typography>
        </Grid>
        {!noEdit && <Grid item xs={4} md={6}>
          <Button variant="contained" color="primary" onClick={createTeamHandler}>
            {t('Create a team')}
          </Button>
        </Grid>}
      </Grid>
      <Card>
        <CardContent>
          {candidates.length > 0 ?
          <>
            <Grid container spacing={4} className={classes.partiHeader}>
              <Grid item xs={4} md={4}>
                <ListItemText primary={'Name'} />
              </Grid>
              <Grid item xs={2} md={3}>
                <ListItemText secondary={'Cost'} />
              </Grid>
              <Grid item xs={2} md={3}>
                <ListItemText secondary={'Propspects'} />
              </Grid>
            </Grid>
            {candidates.map((candidate, idx) => 
              (<List key={candidate.name + candidate.cost} component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    {noEdit ? <LibraryAddCheckIcon /> : <InboxIcon />}
                  </ListItemIcon>
                  <Grid container spacing={4}>
                    <Grid item xs={4} md={4}>
                      <ListItemText primary={candidate.name} />
                    </Grid>
                    <Grid item xs={2} md={3}>
                      <ListItemText secondary={candidate.cost} />
                    </Grid>
                    <Grid item xs={2} md={4}>
                      <ListItemText secondary={candidate.prospects} />
                    </Grid>
                    <Grid item xs={1} md={1}>
                      {!noEdit && <Fab color="primary" aria-label="delete" onClick={() => removeCandidateHandler(idx)}>
                        <DeleteForeverIcon />
                      </Fab>}
                    </Grid>
                  </Grid>
                </ListItem>
              </List>))}
            </>
          : <div className="noParticipants">{t('Candidates array empty')}</div>
          }
        </CardContent>
      </Card>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(Participants)