var config = {
  apiKey: "AIzaSyCsdrmFjVKRUAeUmo2r0sTLXwuA8BgLMD0",
  authDomain: "train-scheduler-328c9.firebaseapp.com",
  databaseURL: "https://train-scheduler-328c9.firebaseio.com",
  projectId: "train-scheduler-328c9",
  storageBucket: "train-scheduler-328c9.appspot.com",
  messagingSenderId: "1041136939064"
};
firebase.initializeApp(config);


var database = firebase.database();

// set up event listener for form submit to capture our employee data
$('#train-form').on('submit', function(event) {
  event.preventDefault();

  // trainName = $("#train-name").val().trim();
  // destination = $("#train-destination").val().trim();
  // time = $("#train-time").val().trim();
  // frequency = $("#time-freq");

  // gather our form data
  var trainDataInput = {
    name: $('#train-name')
      .val()
      .trim(),
    destination: $('#train-destination')
      .val()
      .trim(),
    time: $('#train-time')
      .val()
      .trim(),
    frequency: $('#time-freq')
      .val()
      .trim()
  };

  // // add to firebase
  database.ref().push(trainDataInput);
  $("#train-name").val(" ");
  $("#train-destination").val(" ");
  $("#train-time").val(" ");
  $("#time-freq").val(" ");

});

database.ref().on("child_added", function (childSnapshot) {
  console.log("this is child_added");
 

  var trainData = childSnapshot.val();

  var frequency = trainData.frequency;
  console.log(frequency);

  

  var startTime = trainData.time;
  console.log(startTime)
  

  var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
  
  var currentTime = moment();


  var timeDiff = moment().diff(startTimeConverted, "minutes");
  console.log(timeDiff);

  var tRemainder = timeDiff % frequency;

  var tMinutesTillNextTrain = frequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillNextTrain, "minutes").format("hh:mm");
  
  
  

  
  var $tr = $("<tr>");

  var $tdName = $("<td>").text(trainData.name);
  var $tdDestination = $("<td>").text(trainData.destination);
  var $tdFrequency = $("<td>").text(trainData.frequency);
  var $tdMinutesAway = $("<td>").text(tMinutesTillNextTrain);
  var $tdArrival = $("<td>").text(nextTrain);


  $tr.append($tdName, $tdDestination, $tdFrequency, $tdMinutesAway, $tdArrival);

  $("tbody").append($tr);
});



