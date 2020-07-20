import React from 'react';
import App from '../App';
import * as Strings from '../constants/strings'
import { render, screen } from '../../test-utils'

it('Renders the connected app with initialState', () => {
  render(<App />, { initialState: { customers: [] } })

  expect(screen.getByText(Strings.appHeading)).toBeInTheDocument()
})
describe