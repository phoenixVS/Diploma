import React, { Fragment, useEffect } from 'react'
import HeadSection from './HeadSection'
import FeatureSection from './FeatureSection'
import PricingSection from './PricingSection'

interface HomeProps {
  selectHome: any
}
const Home: React.FC<HomeProps> = (props) => {
  const { selectHome } = props

  useEffect(() => {
    selectHome()
  }, [selectHome])

  return (
    <Fragment>
      <HeadSection />
      <FeatureSection />
      <PricingSection />
    </Fragment>
  )
}

export default Home
