import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCwjrHasAU2rIzsyIKPo4jHQjU0kkD-9NA",
    authDomain: "dps02-8923d.firebaseapp.com",
    databaseURL: "https://dps02-8923d-default-rtdb.firebaseio.com",
    projectId: "dps02-8923d",
    storageBucket: "dps02-8923d.appspot.com",
    messagingSenderId: "884568148813",
    appId: "1:884568148813:web:983fcbd40dd4caa7ee0504"
  };
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);
  export default fireDB.database().ref();