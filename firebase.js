const admin = require('firebase-admin')

const serviceAccount = require('./chatscape-73ac8-firebase-adminsdk-g1in4-cd22d51567.json')
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = getFirestore()

const docRef = db.collection('users').doc('alovelace')

const main = async () => {
  db.collection('users').add({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  })

  const snapshot = await db.collection('users').get()
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.id, doc.data())
  })
}

main().catch(console.error)

// module.exports = db
