import { pipe } from 'ramda'
import firebase from 'firebase/app'
import 'firebase/firestore'
import authService from './auth-service'

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID
};

firebase.initializeApp(config)
const db = firebase.firestore()

const resolveSnapshot = snapshot => {
  let docs = []
  snapshot.forEach(doc => docs = [...docs, {uid: doc.id, ...authService.removeAudit(doc.data())}])
  return docs
}

const getModel = async (collection) => {
  const modelSnapshot = await db.collection(collection).get()
  return resolveSnapshot(modelSnapshot)
}

const saveModel = async ({model, collection}) => {
  const audit = await authService.getAudit()
  db.collection(collection).add({...model, ...audit })
}

const addCallback = (collection, b, callback) => {
  return db.collection(collection).onSnapshot(pipe(resolveSnapshot, callback))
}

const updateModel = async({uid, changes, collection}) => {
  db.collection(collection).doc(uid).set(changes, { merge: true })
}

export default {
  saveModel,
  getModel,
  addCallback,
  updateModel
}