// Initial array of buttons
var buttons = ['rick and morty', 'adventure time', 'the simpsoms', 'family guy', 'south park', 'futurama', 'spongebob'];

$(document).ready(function(){

	// Render buttons
	renderButtons();

	// Render gifs
	$(document).on('click', '.button', renderGifs);

    // Play gif when selected
	$(document).on('click', '.gif-container', playGif);

	// Render buttons
	function renderButtons(){ 

		$('#buttons').empty();

		// Loops through and build buttons array
		for (var i = 0; i < buttons.length; i++){ 
		    var button = $('<button>') 
		    button.addClass('button'); 
		    button.attr('data-name', buttons[i]); 
		    button.text(buttons[i]); 
		    $('#buttons').append(button);
		}
	}

	// Add new buttons from the user input
	$('#add-button').on('click', function(){

		// Grab user input
		var buttonName = $('#user-input').val().trim().toLowerCase();

		// Validate user input
		var isUnique = true;
		for(var i = 0; i < buttons.length; i++){
			if(buttons[i] == buttonName){
				isUnique = false;
			}
		}

		// Append new button if the input is unique
		if (buttonName == "") {
			alert("Add some text to your button.")
		} else if (isUnique) {

			// Add new button to button list
			buttons.push(buttonName);
		
			// Add new buttons to the DOM
			renderButtons();

		} else { 
			alert(buttonName + " already exists!")
		}

		// Remove the default features of the Submit Button
		return false;
	})

	// Render gifs when button is pressed
	function renderGifs() {

		// Remove old gifs
		$('#gifs').empty();

		// Get name an replacing any spaces
		var show = $(this).attr('data-name').replace(/ /g, '+');

		// Create the API URL
		var publicKey = "ww3b0dqDbHNV7QySzi5Oo6c1X21FU4JD"; 
		var limit = "15"; 
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=" + limit + "&api_key=" + publicKey;

		// AJAX call
		$.ajax({url: queryUrl, method: 'GET'}).done(function(response) {

			// Create each gif element
			for (var i = 0; i < response.data.length; i++) {

				// Store gif URLs (image & gif)
				var imageUrl = response.data[i].images.fixed_height_still.url;  
				var gifUrl = response.data[i].images.fixed_height.url; 

				// Store gif rating
				var gifRating = response.data[i].rating;

                // Correct for empty rating
                if(gifRating == ""){
                    gifRating = "none";
                }

				// Create gif container
				var div = $('<div>');
				div.addClass('gif-container'); 
				div.attr('data-name', "unclicked"); 

				// Create image element
				var image = $('<img>');
				image.addClass('image'); 
				image.attr("src", imageUrl);
				div.append(image);

				// Create gif element
				var gif = $('<img>')
				gif.addClass('gif'); 
				gif.attr("src", gifUrl);
				gif.hide(); 
                div.append(gif);
                
                // Create rating element
				var rating = $('<h5>');
				rating.text("Rating: " + gifRating);
				div.append(rating);

				// Append to DOM
			    $('#gifs').append(div);

			}

		});	
	}

    // Play gifs (and stop if they are already playing)
	function playGif() {

		// Capture current gif state
		var gifState = $(this).attr('data-name');
		
		if (gifState == "unclicked") {
			$('.image').hide();
			$('.gif').show();

			// Change gif state to clicked
			$(this).attr('data-name', "clicked");

		} else {

			$('.gif').hide();
			$('.image').show();

			// Change gif state to unclicked
			$(this).attr('data-name', "unclicked");

		}
	}

});