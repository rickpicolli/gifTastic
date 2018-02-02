

var tvShows = ["Westworld", "Game of Thrones", "Amazing Race", "How to get away with murder", "Atypical", "Black Mirror", "How I Met Your Mother", "House", "13 Reasons Why", "Super Natural", "Friends", "Breaking Bad", "The Big Bang Theory"];


		function displayGifs() {

        $("#gif-appear").empty();

        var serie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + serie + "&api_key=dc6zaTOxFJmzC&limit=15";

      
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

        	var results = response.data;

        	console.log(results);

        	for (var i = 0; i < results.length; i++){
     	
        		var gifDiv = $("<div class='wrap'>");
          
         
            var rating = results[i].rating;
               
            var rate = $("<p>").text("Rating: " + rating);

    
            var gifImages = $("<img>");
            


            gifImages.attr("src", results[i].images.fixed_width_still.url);
            gifImages.attr("data-animate", results[i].images.fixed_width.url);
            gifImages.attr("data-still", results[i].images.fixed_width_still.url);
            gifImages.attr("data-state", "still");
          

            gifDiv.prepend(rate);
            gifDiv.prepend(gifImages);

            $("#gif-appear").prepend(gifDiv);

			}
        });
        // displayGifs();
      

    }
			

		function serieButtons() {

			$("#series-buttons").empty();

			var serie = $(this).attr("data-name");

			for (var i = 0; i < tvShows.length; i++){

				var myButton = $("<button>");

				myButton.addClass("btn btn-warning");

				myButton.attr("data-name", tvShows[i]);
				myButton.text(tvShows[i]);

				$("#series-buttons").append(myButton);
				// console.log(myButton);
			}


		}

		$("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        // var serie = $("#gif-input").val().trim();

                // Adding movie from the textbox to our array, and create a button,
                // but if in my array of button already have a button with the same name that my new input, nothing happens 
       // This line grabs the input from the textbox
        var serie = $("#gif-input").val().trim();
        if(!tvShows.includes(serie)){
        	tvShows.push(serie);
        	serieButtons();

        }
        
        serieButtons();

      });

	

        $(document).on("click", ".btn-warning", displayGifs);

        serieButtons();

        $(document).on("click", "img", function(){
        	var state = $(this).attr("data-state");

        	if (state === "still") {
        		$(this).attr("src", $(this).attr("data-animate"));
        		$(this).attr("data-state", "animate");

        	}else {
        		$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");

        	}


        });


