import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID
};

firebase.initializeApp(config)
const db = firebase.firestore()


const getModel = async (collection) => {
  const modelSnapshot = await db.collection(collection).get()
  let docs = []
  modelSnapshot.forEach(doc => docs = [...docs, doc.data()])
  return docs
}


const saveModel = ({model, collection}) => {
  db.collection(collection).add(model)
}

const addCallback = (collection, b, callback) => {
  return db.collection(collection).onSnapshot(querySnapshot => {
    let docs = []
    querySnapshot.forEach(doc => docs = [...docs, doc.data()])
    return callback(docs)
  })
}

export const firebaseService = {
  saveModel,
  getModel,
  addCallback
}