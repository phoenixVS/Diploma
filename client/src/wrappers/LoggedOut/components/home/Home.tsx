import React, { Fragment, useEffect } from 'react'
import HeadSection from './HeadSection'
import FeatureSection from './FeatureSection'
import PricingSection from './PricingSection'

interface HomeProps {
  selectHome: () => void
  openLoginDialog: () => void
}

const Home: React.FC<HomeProps> = (props) => {
  const { selectHome, openLoginDialog } = props
  useEffect(() => {
    selectHome()
  }, [selectHome])

  return (
    <Fragment>
      <HeadSection {...{ openLoginDialog }} />
      {/* <SeminarDashboard /> */}
      <FeatureSection />
      <PricingSection />
    </Fragment>
  )
}

export default Home
