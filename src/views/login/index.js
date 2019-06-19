import React, {useState} from 'react'
import {propEq} from 'ramda'
import Login from './Login'
import ChangePassword from './ChangePassword'
import authService from '../../service/firebase/auth-service'

const needPasswordChange = propEq('changePasswordRequired', true)

const LoginFlow = ({onSuccessLogin}) => {
  const [changePassword, setChangePassword] = useState(false)

  const checkUserConditions = user => {
    if(needPasswordChange(user)) return setChangePassword( true )
    onSuccessLogin(user)
  }

  authService.init({onAuthenticate: checkUserConditions})

  if (changePassword) return <ChangePassword onChange={onSuccessLogin}/>
  return <Login />
}

export default LoginFlow
