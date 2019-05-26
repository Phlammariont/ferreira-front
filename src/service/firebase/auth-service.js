import firebase from 'firebase/app'
import 'firebase/auth'
import {find, identity, memoizeWith, omit, pick, pipe, prop, propEq, propOr} from 'ramda'
import firebaseService from './index'

const getUId = prop('uid')
const removeAudit = omit(['audit'])
const getChangePasswordRequired = propOr(true, 'changePasswordRequired')
const findByUid = userUId => find(propEq('authId', userUId))


const getUserInfo = memoizeWith(identity, async (user) => {
  const users = await firebaseService.getModel('users')
  return findByUid(getUId(user))(users)
})

const getAudit = async () => {
  const user = firebase.auth().currentUser;
  const userInfo = await getUserInfo(user)
  return {
    audit: {
      user: user.uid,
      locationId: userInfo.locationId
    }
  }
}

const aggregateUser = async user => {
  const userInfo = await getUserInfo(user)
  return aggregateUserInfo(userInfo, user)
}

const aggregateUserInfo = (userInfo, user) =>{
  return {
    ...pick(['email', 'name'], user),
    ...userInfo,
    changePasswordRequired: getChangePasswordRequired(userInfo)
  }
}

const authenticate = ({onAuthenticate, user, password}) => {
  firebase.auth().onAuthStateChanged(pipe(aggregateUser, onAuthenticate))
  firebase.auth().signInWithEmailAndPassword(user, password)
}

const passwordReset = async user => {
  const userInfo = await getUserInfo(user)
  await firebaseService.updateModel({
    uid: userInfo.uid,
    changes: { changePasswordRequired: false },
    collection: 'users'
  })
  return userInfo
}

const resetPassword = async newPassword => {
  const user = firebase.auth().currentUser;
  await user.updatePassword(newPassword)
  const userInfo = await passwordReset(user)
  return await aggregateUserInfo(userInfo, user)
}

export default {
  getAudit,
  removeAudit,
  authenticate,
  getUserInfo,
  resetPassword
}