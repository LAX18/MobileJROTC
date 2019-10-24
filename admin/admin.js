function deleteAdmin(email) {
  console.log(email)
  var path = firebase.database().ref("users/"+email)
  path.remove();
  document.getElementById("emails").innerHTML = ''
  pullAllEmails();
}

function addAdmin() {
  var s = document.getElementById("email-input").value
  sendData("users/"+s.replace("@","|").replace(".",","),true)
  document.getElementById("emails").innerHTML = ''
  pullAllEmails();
}

function pullAllEmails() {
  database = firebase.database().ref("users");
    database.once('value', function(snapshot) {
        snapshot.forEach(function(child) {
            firebase.database().ref("users/" + child["key"]).on('value', function(data) {
                var data1 = data.val();
                var unfiltered = data.key
                var email = unfiltered.replace("|","@").replace(",",".")
                var a = document.createElement("tr");
                a.innerHTML = "<tr> <td class='mdl-data-table__cell--non-numeric no-under' id='email-close'><i class='material-icons clickable' onclick='deleteAdmin(\""+unfiltered+"\");'>delete</i></td> <td class='mdl-data-table__cell--non-numeric' id='sign-date'>"+email+"</td></tr>"
                document.getElementById("emails").appendChild(a)
                componentHandler.upgradeAllRegistered();
            });
        });
    });
}


function externalOnLoad() {
  verify();
  pullAllEmails();
  timeChange();
  updatePage();
  readData("company", function(data) {
        document.getElementById("alphacurrentpoints").innerHTML = data.alphapoints
        document.getElementById("bravocurrentpoints").innerHTML = data.bravopoints
  });
  window.setInterval(verify(),1000);
}

// Verify if the user has access
function verify() {
  firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
        readData("users", function(array) {
               if (array[firebase.auth().currentUser.email.replace("@","|").replace(".",",")]) {
               document.getElementById("page-content").style.display = "block"
               document.getElementById("unauthorized").style.display = "none"
               } else {
               document.getElementById("unauthorized").style.display = "block"
               document.getElementById("page-content").style.display = "none"
        }});
        } else {
        document.getElementById("unauthorized").style.display = "block"
        document.getElementById("page-content").style.display = "none"
        }
  })
}