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
		$(".char").addClass("enemies_border")
		$(".char").css("opacity", "0.5")
		$(clicked_img).removeClass("enemies_border")
		$(clicked_img).addClass("player_border")
	}
// Sets the opponent to be whichever character was clicked 
	function select_opponent(clicked_img){
		// Opponent cannot be the same as player 
		if (player.num != $(clicked_img).data("charnum")){
			opponent = character_list[$(clicked_img).data("charnum")]
			$("#opp").attr("src", clicked_img.src)
			$(".instruct").text("Click the attack button to attack " + opponent.name)
		}
	}

	$(".char").on("click", function() {
		if (player ==""){
			select_player(this)
		}else{
			select_opponent(this)
		}
	});

	// When you click attack button 
	$("#attack_btn").on("click", function() {

		if ((player == "") && (opponent == "")){
			$(".instruct").text("Please select a player and an opponent.")
		}else if(opponent == ""){
			$(".instruct").text("Please select an opponent.")
		}else{
			// player's attack amount increases by base 
			player.attack += player.base; 
			// opponent's health is decreased by player's attack amount 
			opponent.health -= player.attack;
			$(".health"+opponent.num).html("HP = " + opponent.health);
			// player's health is decreased by opponents's attack amount [counter]
			player.health -= opponent.counter; 
			$(".health"+player.num).html("HP = " + player.health);

			if (player.health <= 0){
				$(".health"+player.num).html("DEFEATED");
				$(".instruct").text("GAME OVER. You were defeated. Press restart to try again.")
				$("#opp").attr("src", "");
				$("#you").attr("src", "");
			}else if(opponent.health <= 0){
				$(".health"+opponent.num).html("DEFEATED");
				$(clicked_img).css('opacity', '0.15') 
				$("#opp").attr("src", "");
				$(".instruct").text("You've defeated " + opponent.name +"! Click on another enemy");
				defeat_count ++ ;
				opponent = ""; 
				
				
					
				}
			}
		});
		// $(".char").on("click", function() {
		// 	player = character_list[$(this).data("charnum")]
		// });		

});