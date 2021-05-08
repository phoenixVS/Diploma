import IndexPage from 'pages'
import React from 'react'
import renderer from 'react-test-renderer'

test('trying to render app', () => {
  const component = renderer.create(<IndexPage />)
  const tree = component.toJSON()
  expect(tree).toBeDefined()
})
