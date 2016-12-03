$( document ).ready(function() {

	// GLOBAL VARIABLES 
	
	// Create a variable for each character. **(There is probably a quicker way to do this with a function...)**
	// Give each character a "base" which is a random number between 15 and 29. If that character is the player, base will be added to "attack" on each turn
	// Give each character an initial health between 90 and 159 
	// Give each character a "counter" which is the same as attack but for enemies. Does not increase with each turn 
	// Set name as the character's name and num as the same number as data-charnum later on (makes it easy to relate this character to corresponding HTML elements)

	var judy = {
		num: 0,
		name: "Judy", 
		base: Math.floor(Math.random()*15)+15, 
		health: Math.floor(Math.random()*70)+90, 
		attack: 0, 
		counter: Math.floor(Math.random()*25)+20, 
	}
	$(".health0").html("HP = " + judy.health);

	var nick = {
		num: 1,
		name: "Nick",
		base: Math.floor(Math.random()*15)+15, 
		health: Math.floor(Math.random()*70)+90, 
		attack: 0, 
		counter: Math.floor(Math.random()*25)+20, 
	}
	$(".health1").html("HP = " + nick.health);

	var bellwether = {
		num: 2, 
		name: "Bellwether",
		base: Math.floor(Math.random()*15)+15, 
		health: Math.floor(Math.random()*70)+90, 
		attack: 0, 
		counter: Math.floor(Math.random()*25)+20, 
	}
	$(".health2").html("HP = " + bellwether.health);

	var flash = {
		num: 3, 
		name: "Flash",
		base: Math.floor(Math.random()*15)+15, 
		health: Math.floor(Math.random()*70)+90, 
		attack: 0, 
		counter: Math.floor(Math.random()*25)+20, 
	}
	$(".health3").html("HP = " + flash.health);

	var player = ""; 
	var opponent = "";
	var defeat_count = 0; 

	character_list = [judy, nick, bellwether, flash];

// GAME PLAY FUNCTIONS 

	// Sets the users player to be whichever character was clicked 
		function select_player(clicked_img){
			// In game logic 
			player = character_list[$(clicked_img).data("charnum")]
			// Visually 
			$("#you").attr("src", clicked_img.src)
			$(".instruct").text("Click on an enemy to select your opponent")
			
			$(clicked_img).addClass("player_border")
		}
	// Sets the opponent to be whichever character was clicked 
		function select_opponent(clicked_img){
			// Opponent cannot be the same as player 
			if (player.num != $(clicked_img).data("charnum")){
				// In game logic 
				opponent = character_list[$(clicked_img).data("charnum")]
				// Visually 
				$("#opp").attr("src", clicked_img.src)
				$(".instruct").text("Click the attack button to attack " + opponent.name + " or select a different opponent");
				// Remove border from previous enemy (if there was one)
				$(".char").removeClass("enemies_border")
				$(clicked_img).addClass("enemies_border")
				// Reset 'notes' section from previous enemy (if there was one)
				$(".notes").html("")
			}
		}
	// Resets everything 
		function restart(){
			player = ""
			opponent = ""
			defeat_count = 0 
			// Reset each character 
			judy = {
				num: 0,
				name: "Judy", 
				base: Math.floor(Math.random()*15)+15, 
				health: Math.floor(Math.random()*70)+90, 
				attack: 0, 
				counter: Math.floor(Math.random()*25)+20, 
				}
			$(".health0").html("HP = " + judy.health);

			nick = {
				num: 1,
				name: "Nick",
				base: Math.floor(Math.random()*15)+15, 
				health: Math.floor(Math.random()*70)+90, 
				attack: 0, 
				counter: Math.floor(Math.random()*25)+20, 
			}
			$(".health1").html("HP = " + nick.health);

			bellwether = {
				num: 2, 
				name: "Bellwether",
				base: Math.floor(Math.random()*15)+15, 
				health: Math.floor(Math.random()*70)+90, 
				attack: 0, 
				counter: Math.floor(Math.random()*25)+20, 
			}
			$(".health2").html("HP = " + bellwether.health);

			flash = {
				num: 3, 
				name: "Flash",
				base: Math.floor(Math.random()*15)+15, 
				health: Math.floor(Math.random()*70)+90, 
				attack: 0, 
				counter: Math.floor(Math.random()*25)+20, 
			}
			$(".health3").html("HP = " + flash.health);

			//Update 'character_list' so that select_opponent and select_player functions work as expected 
			character_list = [judy, nick, bellwether, flash];

			// Reset everything visually 
			$(".instruct").text("Click on any character to select your player")
			$("#opp").attr("src", "");
			$("#you").attr("src", "");
			$(".char").removeClass("enemies_border")
			$(".char").removeClass("player_border")
			$(".notes").html("")
			$(".instruct").css("background-color", "#FF6505")
		}

// BUTTONS: 

	// If a player has not been chosen yet, then any clicked character becomes player. Otherwise, becomes opponent 
	$(".char").on("click", function() {
		if (player ==""){
			select_player(this)
		}else{
			select_opponent(this)
		}
	});

	// Restart button resets everything visually and in game 
	$("#restart_btn").on("click", restart); 

	// When you click attack button 
	$("#attack_btn").on("click", function() {
		// Check that opponent and player are chosen 
		if ((player == "") && (opponent == "")){
			$(".instruct").text("Please select a player and an opponent.")
		}else if(opponent == ""){
			$(".instruct").text("Please select an opponent.")

		}else{
			// Player attacks opponent. Player's attack amount increases by base.
			player.attack += player.base; 
			console.log(player.attack)

			// opponent's health is decreased by player's attack amount 
			opponent.health -= player.attack;
			$(".health"+opponent.num).html("HP = " + opponent.health);

			// Check whether opponent was defeated and how many opponents have been defeated so far. 
			// If opponent was defeated, update game & visuals accordingly 
			if(opponent.health <= 0){
				defeat_count ++ ;
				$(".health"+opponent.num).html("DEFEATED");
				$("#opp").attr("src", "");
				if (defeat_count == 3){
					$(".instruct").css("background-color", "black")
					$(".instruct").text("You've defeated " + opponent.name +"! CONGRATULATIONS! You won. Click restart to play again.");
					opponent = ""; 
				}else{
					$(".instruct").text("You've defeated " + opponent.name +"! Click on another enemy");
					opponent = ""; 
				}
			
			// If opponent was not defeated, continue -- Opponent attacks player. 
			}else{
				// player's health is decreased by opponents's attack amount [counter]
				player.health -= opponent.counter; 
				$(".health"+player.num).html("HP = " + player.health);
				$(".notes").html("<br> You attacked " + opponent.name + " for " + player.attack + " damage. " + "<br><br>" + opponent.name + " attacked you back for " + opponent.counter + " damage.");
				// Check whether player was defeated. 
				if (player.health <= 0){
					$(".health"+player.num).html("DEFEATED");
					$(".instruct").css("background-color", "black")
					$(".instruct").text("You were defeated. GAME OVER. Click restart to try again.")
					$("#opp").attr("src", "");
					$("#you").attr("src", "");
					opponent = ""; 
					
					}
				}
			}
		});
});




		// $(".char").on("click", function() {
		// 	player = character_list[$(this).data("charnum")]
		// });		