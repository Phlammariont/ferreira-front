import firebase from 'firebase/app'
import 'firebase/auth'
import {filter, isNil, map, omit, pathEq, pick, pipe, prop, propOr} from 'ramda'
import firebaseService from './index'

const getUId = prop('uid')
const getLocationId = prop('locationId')
export const removeAudit = omit(['audit'])
const getChangePasswordRequired = propOr(true, 'changePasswordRequired')

const AuthState = {
  userInfo: {}
}

const setUserInfo = info => AuthState.userInfo = info

const fetchUserInfo = async user => {
  if ( isNil(user) ) return [{}]
  const snapshot = await firebaseService.query('users', "authId", "==", getUId(user))
  return firebaseService.resolveSnapshot(snapshot, true)
}

const getAudit = () => {
  const user = firebase.auth().currentUser;
  const userInfo = AuthState.userInfo
  return {
    audit: {
      user: user.uid,
      locationId: userInfo.locationId
    }
  }
}

const aggregateUser = user => {
  const userInfo = AuthState.userInfo
  return aggregateUserInfo(userInfo, user)
}

const aggregateUserInfo = (userInfo, user) =>{
  return {
    ...pick(['email', 'name'], user),
    ...userInfo,
    changePasswordRequired: getChangePasswordRequired(userInfo)
  }
}

const authenticate = ({ user, password }) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth().signInWithEmailAndPassword(user, password)
    })
}

const init = ({onAuthenticate}) => {
  firebase.auth().onAuthStateChanged(async user => {
    if ( isNil(user) ) return
    const [userInfo] = await fetchUserInfo(user)
    setUserInfo(userInfo)
    const aggregatedUser = aggregateUser(user)
    return onAuthenticate(aggregatedUser)
  })
}

const passwordReset = async () => {
  await firebaseService.updateModel({
    uid: AuthState.userInfo.uid,
    changes: { changePasswordRequired: false },
    collection: 'users'
  })
  return AuthState.userInfo
}

const resetPassword = async newPassword => {
  const user = firebase.auth().currentUser;
  await user.updatePassword(newPassword)
  const userInfo = await passwordReset(user)
  return aggregateUserInfo(userInfo, user)
}

const auditFilter = userInfo => pathEq(['audit', 'locationId'], getLocationId(userInfo))

export const auditCollection = docs => pipe(
  filter(auditFilter(AuthState.userInfo)),
  map(removeAudit)
)(docs)

const logOut = () => {
  firebase.auth().signOut()
}

export default {
  auditCollection,
  authenticate,
  getAudit,
  init,
  logOut,
  resetPassword,
}