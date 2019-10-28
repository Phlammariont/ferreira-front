import {pipe, reject} from 'ramda'
import firebase from 'firebase/app'
import 'firebase/firestore'
import authService, {removeAudit} from './auth-service'
import {isDeleted} from '../../utils/ramda'

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID
};

firebase.initializeApp(config)
const db = firebase.firestore()

const resolveSnapshot = (snapshot, skipAudit) => {
  let docs = []
  snapshot.forEach(doc => docs = [...docs, {uid: doc.id, ...doc.data()}])
  const existingDocs = reject(isDeleted, docs)
  return  skipAudit ? existingDocs : authService.auditCollection(existingDocs)
}

const getCollection = async (collection, skipAudit) => {
  const modelSnapshot = await db.collection(collection).get()
  return resolveSnapshot(modelSnapshot, skipAudit)
}

const saveModel = async ({model, collection}) => {
  const docRef = await db.collection(collection).add({...model, ...authService.getAudit() })
  const doc = await docRef.get()
  return removeAudit({ uid: doc.id, ...doc.data() })
}

const deleteModel = async ({model, collection}) => {
  await db.collection(collection).doc(model.uid).set({isDeleted: true}, { merge: true })
  return model
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

const find = async ({collection, field, operator, value}) => {
  const findSnapshot = await db.collection(collection).where(field, operator, value).get()
  return resolveSnapshot(findSnapshot)
}

export default {
  saveModel,
  deleteModel,
  find,
  getCollection,
  addCallback,
  updateModel,
  query,
  resolveSnapshot,
}