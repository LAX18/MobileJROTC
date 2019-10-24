// JROTC Firebase Interaction Script
// Bravo Company Comment Send
function bravoComment() {
  sendData("company/bravocomments",document.getElementById("bravocomments").value)
  document.getElementById('bravocomments').value = '';
}
// Alpha Company Comment Send
function alphaComment() {
  sendData("company/alphacomments",document.getElementById("alphacomments").value)
  document.getElementById('alphacomments').value = '';
}
// Commanders Cup Point Send
function alphaSend() {
  sendData("company/alphapoints", document.getElementById("alpha").value);
  document.getElementById('alpha').value = '';
}

// Bravo Point Send
function bravoSend() {
  sendData("company/bravopoints", document.getElementById("bravo").value);
  document.getElementById('bravo').value = '';
}


// Time Change Function (Global)
function timeConvert(timestring) {
  var year = timestring.substring(0,4)
  var month = timestring.substring(5,7)
  var day = timestring.substring(8,10)
  var fulldate = month+"-"+day+"-"+year
  return fulldate
}

// Specific Webpage Scripts
function timeChange() {
  var data = document.getElementById("time").value
  if (data == "RTI") {
    document.getElementById("customtimebox").style.display = 'none'
  } else {
    document.getElementById('customtimebox').style.display = 'block'
  }
}

function updatePage() {
  var data = document.getElementById("event").value
  if (data == "UNI") {
    document.getElementById("event_type").innerHTML = "Uniform Day"
    document.getElementById("locationbox").style.display = 'none'
    document.getElementById("timebox").style.display = 'none'
    document.getElementById("messagebox").style.display = 'none'
    document.getElementById("datebox").style.display = 'block'
    document.getElementById("uniformbox").style.display = 'block'
  } else if (data == "FOR") {
    document.getElementById("event_type").innerHTML = "Formation"
    document.getElementById("locationbox").style.display = 'block'
    document.getElementById("timebox").style.display = 'block'
    document.getElementById("messagebox").style.display = 'none'
    document.getElementById("datebox").style.display = 'block'
    document.getElementById("uniformbox").style.display = 'block'
  } else if (data == "CUS") {
    document.getElementById("locationbox").style.display = 'none'
    document.getElementById("timebox").style.display = 'none'
    document.getElementById("datebox").style.display = 'none'
    document.getElementById("uniformbox").style.display = 'none'
    document.getElementById("messagebox").style.display = 'block'
  }
  document.getElementById("event_uniform").innerHTML = document.getElementById("uniformtype").value
  document.getElementById("event_date").innerHTML = timeConvert(document.getElementById("date").value)
  if (document.getElementById("time").value === "RTI") {
    document.getElementById("event_time").innerHTML = "RTI"
  } else {
    document.getElementById("event_time").innerHTML = document.getElementById("customtime").value
  }
  document.getElementById("event_place").innerHTML = document.getElementById("location").value
}

// Key handle sending functions

function eventSend() {
  var array = {
    event: document.getElementById("event").value,
    date: timeConvert(document.getElementById("date").value),
    uniform: document.getElementById("uniformtype").value,
    location: document.getElementById('location').value,
    time: document.getElementById('time').value,
    custom: document.getElementById('custommessage').value
  }
  sendData("nextevent/", array);
  document.getElementById('date').value = '';
  document.getElementById('uniformtype').value = '';
  document.getElementById('time').value = '';
  document.getElementById('location').value = '';
  //document.getElementById('event').value = '';
  document.getElementById('custommessage').value = '';
}