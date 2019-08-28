function externalOnLoad() {
    console.log("[index.html] LOADED")
    var data = readData("nextevent", function(data) {
        if (data.event === "FOR") {
            document.getElementById("event_type").innerHTML = "Formation"
            document.getElementById("event_uniform").innerHTML = data.uniform
            document.getElementById("event_time").innerHTML = data.time
            document.getElementById("event_date").innerHTML = data.date
            document.getElementById("event_place").innerHTML = data.location
        } else if (data.event === "UNI") {
            document.getElementById("event_type").innerHTML = "Uniform Day"
            document.getElementById("event_uniform").innerHTML = data.uniform
            document.getElementById("event_time").innerHTML = "N/A"
            document.getElementById("event_date").innerHTML = data.date
            document.getElementById("event_place").innerHTML = "N/A"
        }
    })
}

// Firebase Scripts
// global read data and place on page function
function setData(ref, element, read1) {
    var array = readData(ref, function(array) {
        document.getElementById(element).innerHTML = array[read1]
    });
}

function readData(ref, callback) {
    var nextformation = firebase.database().ref(ref);
    nextformation.on("value", function(data) {
        var array = data.val();
        callback(array)
    });
}