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

const resolveSnapshot = (snapshot, skipAudit) => {
  let docs = []
  snapshot.forEach(doc => docs = [...docs, {uid: doc.id, ...doc.data()}])
  return  skipAudit ? docs : authService.auditCollection(docs)
}

const getCollection = async (collection, skipAudit) => {
  const modelSnapshot = await db.collection(collection).get()
  return resolveSnapshot(modelSnapshot, skipAudit)
}

const saveModel = async ({model, collection}) => {
  return await db.collection(collection).add({...model, ...authService.getAudit() })
}

const addCallback = (collection, b, callback) => {
  return db.collection(collection).onSnapshot(pipe(resolveSnapshot, callback))
}

const updateModel = async ({uid, changes, collection}) => {
  return await db.collection(collection).doc(uid).set(changes, { merge: true })
}

const query = async (collection, field, operator, value) => {
  return await db.collection(collection).where(field, operator, value).get()
}

export default {
  saveModel,
  getCollection,
  addCallback,
  updateModel,
  query,
  resolveSnapshot,
}