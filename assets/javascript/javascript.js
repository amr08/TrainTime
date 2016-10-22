
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

//automatic time

	var time = new Date();

	function updateTime() {

		time = new Date(time.getTime() + 1000); 

		$("#time").html(moment().format("h:mm:ss a")); 

		}

		$(function() {
			updateTime();
			setInterval(updateTime,1000);
					 	
		});
	
//On click listener to add train
	$("#addTrain").on("click", function() {

//grabs user input
	var trTrain = $("#trainName").val().trim();
	var trPlace = $("#destination").val().trim();
	var trTime = moment($("#firstTrainTime").val().trim(),"HH:mm").format("HH:mm")
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
	console.log(newTrain.howOften);
	
	alert("Train successfully added");

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

	return false;

});


//Getting info from firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	
	var trTrain = (childSnapshot.val().train);
	var trPlace = (childSnapshot.val().place);
	var trTime = (childSnapshot.val().time);
	var trHowOften = (childSnapshot.val().howOften);
	
	console.log(trTrain);
	console.log(trPlace);
	console.log(trTime);
	console.log(trHowOften);


 
	//the maths
 	var firstTimeConverted = moment(trTime,"HH:mm").subtract(1, "years");
		 	
	var currentTime = moment().format("hh:mm:ss a");

	var difference = moment().diff(moment(firstTimeConverted), "minutes");

	var tRemainder = difference % trHowOften;

	var minutesLeft = trHowOften - tRemainder;

	var nextTrain = moment().add(minutesLeft, "minutes")

	var arrival = moment(nextTrain).format("hh:mm a")


    
	$("#trainTable > tbody").append("<tr><td>" + trTrain + "</td><td>" + trPlace + "</td><td>" + trHowOften +  "</td><td>" + arrival + "</td><td>" + minutesLeft + "</td></tr>");


});