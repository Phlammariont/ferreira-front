import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDUV0wxU2lY4VIFE247LsxfvWgQhSmcK-4",
  authDomain: "ferreira-front.firebaseapp.com",
  projectId: "ferreira-front"
};

firebase.initializeApp(config)
const db = firebase.firestore()


const initDB = async () => {
  const priceListSnapshot = await db.collection('price-list').get()
  priceListSnapshot.forEach( doc => console.log(doc.data()))

}


const savePrice = (price) => {
  db.collection('price-list').add(price)
}

initDB()
export const firebaseService = {
  savePrice
}