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

module.exports = db
