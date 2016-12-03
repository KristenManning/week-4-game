$( document ).ready(function() {
	
	// function construct_player(health_points, attack_power, counter_power) {
	//     this.health = health_points;
	//     this.attack = attack_power;
	//     this.counter= counter_power;
	// }

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

// Sets the users player to be whichever character was clicked 
	function select_player(clicked_img){
		player = character_list[$(clicked_img).data("charnum")]
		$("#you").attr("src", clicked_img.src)
		$(".instruct").text("Click on an enemy to select your opponent")
		// $(".char").css("opacity", "0.5")
		
		$(clicked_img).addClass("player_border")
	}
// Sets the opponent to be whichever character was clicked 
	function select_opponent(clicked_img){
		// Opponent cannot be the same as player 
		if (player.num != $(clicked_img).data("charnum")){
			opponent = character_list[$(clicked_img).data("charnum")]
			$("#opp").attr("src", clicked_img.src)
			$(".instruct").text("Click the attack button to attack " + opponent.name + "or select a different opponent");
			$(".char").removeClass("enemies_border")
			$(clicked_img).addClass("enemies_border")
			$(".notes").html("")
		}
	}
// Resets everything 
	function restart(){
		player = ""
		opponent = ""
		defeat_count = 0 
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

		character_list = [judy, nick, bellwether, flash];

		$(".instruct").text("Click on any character to select your player")
		$("#opp").attr("src", "");
		$("#you").attr("src", "");
		$(".char").removeClass("enemies_border")
		$(".char").removeClass("player_border")
		$(".notes").html("")
	}

	$(".char").on("click", function() {
		if (player ==""){
			select_player(this)
		}else{
			select_opponent(this)
		}
	});

	$("#restart_btn").on("click", restart); 

	// When you click attack button 
	$("#attack_btn").on("click", function() {

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
			// Check whether opponent was defeated 
			if(opponent.health <= 0){
				defeat_count ++ ;
				$(".health"+opponent.num).html("DEFEATED");
				$("#opp").attr("src", "");

				if (defeat_count == 3){
					$(".instruct").text("You've defeated " + opponent.name +"! CONGRATULATIONS! You won. Click restart to play again.");
					opponent = ""; 
				}else{
					$(".instruct").text("You've defeated " + opponent.name +"! Click on another enemy");
					opponent = ""; 
				}
			
			// If opponent was not defeated, continue. Opponent attacks player. 
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
		// $(".char").on("click", function() {
		// 	player = character_list[$(this).data("charnum")]
		// });		

});