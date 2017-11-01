import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Switcher from '../Switcher'

configure({ adapter: new Adapter() })

const opts = {
  val1: { label: 'val1' },
  val2: { label: 'val2' },
}

const switcher = (
  <Switcher
    opts={opts}
    name="name"
    id="id"
    onChange={() => ({})}
    value={'val1'}
    label={'label'}
  />
)

describe('Switcher', () => {
  test('matches snapshot', () => {
    const component = renderer.create(switcher)
    expect(component).toMatchSnapshot()
  })

  test('renders checkbox selected', () => {
    const $switcher = shallow(switcher)
    expect($switcher.find('#id-0').props().checked).toBe(true)
    expect($switcher.find('#id-1').props().checked).toBe(false)
  })

  test('call onChange on input change', () => {
    const mock = jest.fn()
    const switcher = (
      <Switcher
        opts={opts}
        name="name"
        id="id"
        onChange={mock}
        value={'val1'}
        label={'label'}
      />
    )
    const $switcher = shallow(switcher)

    $switcher.find('#id-1').simulate('change')
    expect(mock.mock.calls.length).toBe(1)
  })
})
