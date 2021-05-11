import React, { Fragment, useEffect } from 'react'
import HeadSection from './HeadSection'
import FeatureSection from './FeatureSection'
import PricingSection from './PricingSection'
import SeminarDashboard from 'wrappers/LoggedIn/components/dashboard/SeminarDashboard'

interface HomeProps {
  selectHome: () => void
}

const Home: React.FC<HomeProps> = (props) => {
  const { selectHome } = props

  useEffect(() => {
    selectHome()
  }, [selectHome])

  return (
    <Fragment>
      <HeadSection />
      <SeminarDashboard />
      <FeatureSection />
      <PricingSection />
    </Fragment>
  )
}

export default Home
