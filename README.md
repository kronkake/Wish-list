Short description

Recomended firestore rules:

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if request.auth.uid == '{your admin ID}';
    }
      match /users/{userID}/wishes/{wish} {
    allow read, write: if request.auth.uid == userID;
  }
  }
}