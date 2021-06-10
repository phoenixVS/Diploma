import React, { useEffect } from 'react'
import AOS from 'aos'
import { Grid, Typography, isWidthUp, withWidth } from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import BuildIcon from '@material-ui/icons/Build'
import ComputerIcon from '@material-ui/icons/Computer'
import BarChartIcon from '@material-ui/icons/BarChart'
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import CloudIcon from '@material-ui/icons/Cloud'
import MeassageIcon from '@material-ui/icons/Message'
import CancelIcon from '@material-ui/icons/Cancel'
import calculateSpacing from './calculateSpacing'
import FeatureCard from './FeatureCard'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { useTranslation } from 'i18n'

const iconSize = 30


interface FeatureSectionProps {
  width?: Breakpoint
}

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  const { width } = props
  const { t } = useTranslation(['home'])
const features = [
  {
    color: '#00C853',
    headline: t('Individual approach'),
    text: t('Adjust studying program for each and every student.'),
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: '0',
    smDelay: '0',
  },
  {
    color: '#6200EA',
    headline: t('Schedule'),
    text: t('Convinient sheduling tools to make your time focused on maximal productivity.'),
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: '200',
    smDelay: '200',
  },
  {
    color: '#0091EA',
    headline: t('Friendly community'),
    text:
      t('Learn new together with benevolent classmates, mutual help and friendship - quintessence of inside atmosphere.'),
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: '400',
    smDelay: '0',
  },
  {
    color: '#d50000',
    headline: t('Educational material'),
    text:
      t('A lot of exercises videos, gallery and educational literature and waiting for you:)'),
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: '0',
    smDelay: '200',
  },
  {
    color: '#DD2C00',
    headline: t('Track progress'),
    text:
      t('Track your progress and share with friends.'),
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: '200',
    smDelay: '0',
  },
  {
    color: '#64DD17',
    headline: t('Online lessons'),
    text:
      t('Studying isnt ended with quarantine. Keep improve yourself and get knowledge in video lessons with instructor.'),
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: '400',
    smDelay: '200',
  },
]

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          {t('Features')}
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUp('md', width) ? element.mdDelay : element.smDelay}
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default withWidth()(FeatureSection)
