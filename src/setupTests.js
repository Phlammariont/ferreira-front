import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID
};

const testProject = firebase.initializeApp(config, 'testProject')
const testDb = testProject.firestore()

const deleteCollection = async (collection) => {
  const snapshot = await testDb.collection(collection).get()

  const batch = testDb.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  })
  return await batch.commit()
}

afterAll( async () => {
  await deleteCollection('inventoryItem')
  await testProject.delete()
})