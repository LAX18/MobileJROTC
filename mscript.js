function alphaCompanyOnLoad() {
  // Initialize Firebase
      var config = {
        apiKey: "AIzaSyB0keF26uKYDOR2o-8HYkgoOGWhsPyHdkg",
        authDomain: "jrotc-database.firebaseapp.com",
        databaseURL: "https://jrotc-database.firebaseio.com",
        projectId: "jrotc-database",
        storageBucket: "jrotc-database.appspot.com",
        messagingSenderId: "787128694744"
      };
      firebase.initializeApp(config);
  setData("company","alphacomments","alphacomments");
  readData("company", function(data) {
        document.getElementById("alphacurrentpoints").innerHTML = data.alphapoints
  });
}
function bravoCompanyOnLoad() {
  // Initialize Firebase
      var config = {
        apiKey: "AIzaSyB0keF26uKYDOR2o-8HYkgoOGWhsPyHdkg",
        authDomain: "jrotc-database.firebaseapp.com",
        databaseURL: "https://jrotc-database.firebaseio.com",
        projectId: "jrotc-database",
        storageBucket: "jrotc-database.appspot.com",
        messagingSenderId: "787128694744"
      };
      firebase.initializeApp(config);
  setData("company","bravocomments","bravocomments");
  readData("company", function(data) {
        document.getElementById("bravocurrentpoints").innerHTML = data.bravopoints
  });
}