import React from 'react'
import { CodePane } from '../CodePane'
import renderer from 'react-test-renderer'

jest.unmock('../CodePane')
jest.mock('react-highlight', () => 'Highlight')

describe('(Component) <DownloadButton />', () => {
  it('Render correct', () => {
    const component = renderer.create(
      <CodePane code='foo' />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
