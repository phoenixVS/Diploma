import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Typography, isWidthUp, withWidth, withStyles } from '@material-ui/core'
import PriceCard from './PriceCard'
import calculateSpacing from './calculateSpacing'
import { useTranslation } from 'i18n'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

const styles = (theme: any) => ({
  containerFix: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: 'hidden',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  cardWrapper: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 340,
    },
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 360,
    },
  },
})

interface PricingSectionProps {
  width: Breakpoint
  classes: any
}
const PricingSection: React.FC<PricingSectionProps> = (props) => {
  const { width, classes } = props
  const { t } = useTranslation(['home'])

  return (
    <div className="lg-p-top" style={{ backgroundColor: '#FFFFFF' }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        {t('Pricing')}
      </Typography>
      <div className={classNames('container-fluid', classes.containerFix)}>
        <Grid container spacing={calculateSpacing(width)} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} lg={3} className={classes.cardWrapper} data-aos="zoom-in-up">
            <PriceCard
              title={t("Starter")}
              pricing={
                <span>
                  ₴300.00
                  <Typography display="inline"> / {t('month')}</Typography>
                </span>
              }
              features={[t('Work in group'), t('Dive in program'), t('Trener advices')]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <PriceCard
              highlighted
              title={t("Default")}
              pricing={
                <span>
                  ₴500
                  <Typography display="inline"> / {t('month')}</Typography>
                </span>
              }
              features={[t('Work in group'), t('Dive in program'), t('Trener advices')]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp('md', width) ? '400' : '0'}
          >
            <PriceCard
              title={t("Advanced")}
              pricing={
                <span>
                  ₴600.00
                  <Typography display="inline"> / {t('month')}</Typography>
                </span>
              }
              features={[t('Work in group'), t('Dive in program'), t('Trener advices')]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp('md', width) ? '600' : '200'}
          >
            <PriceCard
              title={t("Personal")}
              pricing={
                <span>
                  ₴1200.00
                  <Typography display="inline"> / {t('month')}</Typography>
                </span>
              }
              features={[t('Work in group'), t('Dive in program'), t('Trener advices')]}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(withWidth()(PricingSection))
