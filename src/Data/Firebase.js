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

const Firestore = Firebase.firestore()

const AdminUserId = 'eWYqiOzNNOcJVTVzezHh22FwE703'

export { Firebase, Firestore, FirebaseUserCreation, AdminUserId }
