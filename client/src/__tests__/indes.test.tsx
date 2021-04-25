import React from 'react'
import renderer from 'react-test-renderer'

test('Index page', () => {
  const component = renderer.create(
    <main>
      <h1>Nextjs app</h1>
      <p>Using typescript, eslint, prettier, husky, jest, cli...</p>
    </main>
  )
  const tree = component.toJSON()
  expect(tree).toBeDefined()
})
