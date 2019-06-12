import React, {useState} from 'react'
import {propEq} from 'ramda'
import Login from './Login'
import ChangePassword from './ChangePassword'

const needPasswordChange = propEq('changePasswordRequired', true)

const LoginFlow = () => {
  const [changePassword, setChangePassword] = useState(false)
  const checkUserConditions = async user => {
    if(needPasswordChange(await user)) return setChangePassword( true )
  }

  if (changePassword) return <ChangePassword />
  return <Login onAuthenticate={checkUserConditions}/>
}

export default LoginFlow
