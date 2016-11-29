$( document ).ready(function() {
	
	// function construct_player(health_points, attack_power, counter_power) {
	//     this.health = health_points;
	//     this.attack = attack_power;
	//     this.counter= counter_power;
	// }

	var judy = {
		health: 100, 
		attack: 20, 
		counter: 10, 
	}
	var nick = {
		health: 90, 
		attack: 20, 
		counter: 10, 
	}
	var merry = {
		health: 80, 
		attack: 20, 
		counter: 10, 
	}
	var sloth = {
		health: 70, 
		attack: 20, 
		counter: 10, 
	}

	var player = ""; 
	var opponent = "";

	character_list = [judy, nick, merry, sloth];

	// for (c in character_list) {
	// 	var num1 = Math.random()*100 + 50
	// 	var num2 = Math.random()*30 + 1
	// 	var num3 = Math.random()*30 + 1
		
	// 	character_list[c] = new construct_player(num1, num2, num3)
	// }

	function select_player(clicked_img){
		player = character_list[$(clicked_img).data("charnum")]
		$(clicked_img).css('opacity', '0.15') 
		$("#you").attr("src", clicked_img.src)


	}

	function select_opponent(clicked_img){
		opponent = character_list[$(clicked_img).data("charnum")]
		$("#opp").attr("src", clicked_img.src)


	}

		$(".char").on("click", function() {
			if (player ==""){
				select_player(this)
			}else{
				select_opponent(this)
			}

			
		});


		// $(".char").on("click", function() {
		// 	player = character_list[$(this).data("charnum")]
		// });		



});