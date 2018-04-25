import * as Firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: 'AIzaSyCzMSGbhk1f6ufnEkLCRaQBZVk66jYuhLY',
    authDomain: 'api-project-600003414170.firebaseapp.com',
    databaseURL: 'https://api-project-600003414170.firebaseio.com',
    projectId: 'api-project-600003414170',
    storageBucket: 'api-project-600003414170.appspot.com',
    messagingSenderId: '600003414170'
}

Firebase.initializeApp(config)
const FirebaseUserCreation = Firebase.initializeApp(config, 'UserCreation')

Firebase.firestore().enablePersistence()
  .then(function() {

  })
  .catch(function(err) {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

const Firestore = Firebase.firestore()

const AdminUserId = 'eWYqiOzNNOcJVTVzezHh22FwE703'

export { Firebase, Firestore, FirebaseUserCreation, AdminUserId }
