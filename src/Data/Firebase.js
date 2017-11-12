import * as Firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: 'AIzaSyAisrmpKWx3bl9YLOhcafWPcsOV9_8MLRs',
    authDomain: 'my-awesome-quiz-application.firebaseapp.com',
    databaseURL: 'https://my-awesome-quiz-application.firebaseio.com',
    projectId: 'my-awesome-quiz-application',
    storageBucket: 'my-awesome-quiz-application.appspot.com',
    messagingSenderId: '256269976601'
}

Firebase.initializeApp(config)
const FirebaseUserCreation = Firebase.initializeApp(config, 'UserCreation')

const Firestore = Firebase.firestore()

const AdminUserId = 'rFgtWZBLY8PLISnu7Z7EKIj3uJO2'

export { Firebase, Firestore, 
    FirebaseUserCreation, AdminUserId }