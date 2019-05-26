import React, {useState} from 'react'
import {propEq} from 'ramda'
import Login from './Login'
import ChangePassword from './ChangePassword'

const needPasswordChange = propEq('changePasswordRequired', true)

const LoginFlow = ({onAuthenticate}) => {
  const [changePassword, setChangePassword] = useState(false)
  const checkUserConditions = async user => {
    if(needPasswordChange(await user)) return setChangePassword( true )
    onAuthenticate(user)
  }

  if (changePassword) return <ChangePassword onChange={onAuthenticate}/>
  return <Login onAuthenticate={checkUserConditions}/>
}

export default LoginFlow
