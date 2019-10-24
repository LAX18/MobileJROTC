// Redirect to Dashboard
function dashboard() {
  location.href = "admin/index.html"
}

// Firebase Check Log In Status
function checkLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
        readData("users", function(array) {
        if (array[firebase.auth().currentUser.email.replace("@","|").replace(".",",")]) {
                   document.getElementById("loginbutton").innerHTML = "<button class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect' onclick='dashboard();'>Dashboard</button>";
                   document.getElementById("logoutbutton").style.display = "block"
                   componentHandler.upgradeDom();
        } else {
                   document.getElementById("loginbutton").innerHTML = "Welcome, "+firebase.auth().currentUser.displayName
                   document.getElementById("logoutbutton").style.display = "block"
        }
  })} else {
          document.getElementById("loginbutton").innerHTML = "<button class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect' onclick='logIn();'> Log In</button>"
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