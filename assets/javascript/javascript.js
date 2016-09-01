 ///initialize firebase
 var config = {
    apiKey: "AIzaSyBkFv_w5VYs2Qp0hF08sYxpQdIBfipxNRU",
    authDomain: "homework-6ee5d.firebaseapp.com",
    databaseURL: "https://homework-6ee5d.firebaseio.com",
    storageBucket: "homework-6ee5d.appspot.com",
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //////-------------------------------------



$("#addTrain").on("click", function() {

//grabs user input
	var trTrain = $("#trainName").val().trim();
	var trPlace = $("#destination").val().trim();
	var trTime = moment($("#firstTrainTime").val().trim(),"DD/MM/YY").format("X");
	var trHowOften = $("#frequency").val().trim();


var newTrain = {

		train: trTrain,
		place: trPlace,
		time: trTime,
		howOften: trHowOften,
		
	}

	database.ref().push(newTrain);


	console.log(newTrain.train);
	console.log(newTrain.place);
	console.log(newTrain.time);
	console.log(newTrain.howOften)

	alert("Train successfully added");

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

	return false;
});



database.ref().on("child_added", function(childSnapshot, prevChildKey){
	
	var trTrain = (childSnapshot.val().train);
	var trPlace = (childSnapshot.val().place);
	var trTime = (childSnapshot.val().time);
	var trHowOften = (childSnapshot.val().howOften);

	console.log(trTrain);
	console.log(trPlace);
	console.log(trTime);
	console.log(trHowOften);


// var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
// 	// Calculate the months worked using hardconre math
// 	// To calculate the months worked
// 	var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
// 	console.log(empMonths);

// 	// Calculate the total billed rate
// 	var empBilled = empMonths * empRate;
// 	console.log(empBilled);

		 $("#trainTable > tbody").append("<tr><td>" + trTrain + "</td><td>" + trPlace + "</td><td>" + trTime + "</td><td>" + trHowOften +  "</td></tr>");


});