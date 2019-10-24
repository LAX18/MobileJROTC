// Firebase Check Log In Status
function checkLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
        readData("users", function(array) {
        if (array[firebase.auth().currentUser.email.replace("@","|").replace(".",",")]) {
                   document.getElementById("loginbutton").innerHTML = "<a href='dashboard.html'>Dashboard</a>"
                   var logoutnode = document.createElement("li");
                   document.getElementById("logoutbutton").style.display = "block"
        } else {
                   document.getElementById("loginbutton").innerHTML = "Welcome, "+firebase.auth().currentUser.displayName
                   document.getElementById("logoutbutton").style.display = "block"
        }
  })} else {
          document.getElementById("loginbutton").innerHTML = "<a href='javascript:logIn();'>Log In</a>"
          document.getElementById("logoutbutton").style.display = "none"
        }
  })
}

// Firebase Log In
function logIn() {
 firebase.auth().setPersistence("local")
    // No user is signed in.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      readData("users", function(array) {
        checkLogin();
      });
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode)
      console.log(errorMessage)
// ...
    });
}

// Firebase Log Out
function logOut() {
   firebase.auth().signOut().then(function() {
   checkLogin();
}, function(error) {
   console.log("ERROR")
   console.log(error)
});
}


// Firebase Interaction Scripts
function readData(ref, callback) {
  var nextformation = firebase.database().ref(ref);
  nextformation.on("value", function(data) {
    var array = data.val();
    callback(array)
  });
}
// global read data and place on page function
function setData(ref, element, read1) {
  var array = readData(ref, function(array) {
    document.getElementById(element).innerHTML = array[read1]
  });
}

// Firebase Interaction Scripts
function sendData(ref, data) {
  var database = firebase.database();
  firebase.database().ref(ref).set(data);
}