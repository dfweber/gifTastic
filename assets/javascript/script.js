//create array with starter topics
var topics = ["mma", "jiu jitsu", "boxing", "judo", "muai thay", "sambo", "pride fc", "ufc", "bellator", "knockouts", "heel hook", "takedown", "self defense", "street fight", "sumo"];

//create for loop to create buttons with values from array
for (var i = 0; i < topics.length; i++) {
	//create button
    var createButton = $("<button>");
    //append strings from array on button, add class, add attribute with strings from array and style button
	createButton.append(topics[i]).addClass("btn btn-success").attr("data-btn", topics[i]).css({"margin": "5px"});
    //push button to DOM
	$("#gifButtons").append(createButton);
    //log buttons to test
	console.log(topics[i]);
};

//create click function to display gifs when button is clicked
$("button").on("click", function() {
    //create button
    $("#gifsHere").empty();
    //assign attribute to variable based on which button user clicks
    var buttonTopic = $(this).attr("data-btn");
    //assim API key to a variable and with the value based on which button user clicked
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    	buttonTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    //initiate ajax function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //log response to test
    	console.log(response);

    	var results = response.data;
        //create for loop to display gifs
    	for (var i = 0; i < results.length; i++) {
    		//create a new div and assign to a variable
            var gifDiv = $("<div>");
            //create a p html tag and assign to a variable
    		var p = $("<p>");
            //add rating text and pull rating from API
    		$(p).text("Rating: " + results[i].rating);
            //create image tag and assign to variable
    		var gifImage = $("<img>");
            //add image source attribute to image variable
    		gifImage.attr("src", results[i].images.fixed_height.url);
            //add data still attribute to image
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            //add data animate attribute to image
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            //add attributes to image, class and style
            gifImage.attr("data-state", "still").addClass("gifClass").css({"float": "left", "margin-right": "10px"});
            //append rating text and image to div, style div
    		gifDiv.append(p).append(gifImage).css({"float": "left", "margin-top": "10px"});
            //prepend to id on DOM
    		$("#gifsHere").prepend(gifDiv);
    	}
        //create gif on click still and animate events
        $('.gifClass').on('click', function() {
            
            var state = $(this).attr('data-state'); 

            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
              } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
              };      
        });
    });
});



//Create add button function from input box
$("#addNewButton").on("click", function(event) {
	$("#gifsHere").empty();
    event.preventDefault();

	var newInput = $("#topicInput").val().trim();

    var createNewButton = $("<button>").addClass("btn btn-success").attr("data-btn", newInput).append(" " + newInput).css({"margin": "5px"});

    console.log("test", createNewButton);

	$("#gifButtons").append(createNewButton);

    var newQueryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        newInput + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: newQueryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var p = $("<p>");

            $(p).text("Rating: " + results[i].rating);

            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height.url);

            gifImage.attr("data-still", results[i].images.fixed_height_still.url);

            gifImage.attr("data-animate", results[i].images.fixed_height.url);

            gifImage.attr("data-state", "still").addClass("gifClass").css({"float": "left", "margin-right": "10px"});;

            gifDiv.append(p).append(gifImage).css({"float": "left", "margin-top": "10px"});

            $("#gifsHere").prepend(gifDiv);
        }

        $('.gifClass').on('click', function() {
            
            var state = $(this).attr('data-state'); 

            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            };      
        });
    });
});

