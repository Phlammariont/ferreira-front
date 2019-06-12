import React from 'react'
import 'jest-dom/extend-expect'
import { render } from 'react-testing-library'

import Login from './Login'

describe('In a suit of tests for Login component', () => {
  test('should render without crashing', () => {
    const { getByLabelText } = render(<Login />)
  })

  test('should render with both fields', () => {
    const { getByLabelText, getByText } = render(<Login />)
    const passwordTxt = getByLabelText('Contraseña')
    const userTxt = getByLabelText('Usuario')
    const loginBtn = getByText('Entrar')
    expect(passwordTxt).toBeVisible()
    expect(userTxt).toBeVisible()
    expect(loginBtn).toBeVisible()
  })
})