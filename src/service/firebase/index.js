import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDUV0wxU2lY4VIFE247LsxfvWgQhSmcK-4",
  authDomain: "ferreira-front.firebaseapp.com",
  projectId: "ferreira-front"
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

export const firebaseService = {
  saveModel,
  getModel
}