$(function(){

	var WIDTH = 700;
	var HEIGHT = 250;


	var smallStarSpeed    	= 1 //pixels per frame
	var mediumStarSpeed		= 3 //pixels per frame
	var bigStarSpeed		= 4 //pixels per frame


	var PLAYGROUND_WIDTH	= 700;
	var PLAYGROUND_HEIGHT	= 250;

	var playerAnimation = new Array();
	var enemies = new Array(3); // There are three kind of enemies in the game
	var missile = new Array();

	var gameOver = false;
	var playerHit = false;

	var REFRESH_RATE		= 15;

	var background1 = new $.gameQuery.Animation({imageURL: "./images/background1.png"});
	var background2 = new $.gameQuery.Animation({imageURL: "./images/background2.png"});
	var background3 = new $.gameQuery.Animation({imageURL: "./images/background3.png"});
	var background4 = new $.gameQuery.Animation({imageURL: "./images/background4.png"});
	var background5 = new $.gameQuery.Animation({imageURL: "./images/background5.png"});
	var background6 = new $.gameQuery.Animation({imageURL: "./images/background6.png"});
                
	// Player space shipannimations:
	playerAnimation["idle"]		= new $.gameQuery.Animation({imageURL: "./images/player_spaceship.png"});
	playerAnimation["explode"]	= new $.gameQuery.Animation({imageURL: "./images/player_explode.png", numberOfFrame: 4, delta: 26, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});
	playerAnimation["up"]		= new $.gameQuery.Animation({imageURL: "./images/boosterup.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_HORIZONTAL});
	playerAnimation["down"]		= new $.gameQuery.Animation({imageURL: "./images/boosterdown.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_HORIZONTAL});
	playerAnimation["boost"]	= new $.gameQuery.Animation({imageURL: "./images/booster1.png" , numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});
	playerAnimation["booster"]	= new $.gameQuery.Animation({imageURL: "./images/booster2.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});

	//  List of enemies animations :
	// 1st kind of enemy:
	enemies[0] = new Array(); // enemies have two animations
	enemies[0]["idle"]	= new $.gameQuery.Animation({imageURL: "./images/minion_idle.png", numberOfFrame: 5, delta: 52, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});
	enemies[0]["explode"]	= new $.gameQuery.Animation({imageURL: "./images/minion_explode.png", numberOfFrame: 11, delta: 52, rate: 30, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_CALLBACK});
	
	// 2nd kind of enemy:
	enemies[1] = new Array();
	enemies[1]["idle"]	= new $.gameQuery.Animation({imageURL: "./images/brainy_idle.png", numberOfFrame: 8, delta: 42, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});
	enemies[1]["explode"]	= new $.gameQuery.Animation({imageURL: "./images/brainy_explode.png", numberOfFrame: 8, delta: 42, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_CALLBACK});
	
	// 3rd kind of enemy:
	enemies[2] = new Array();
	enemies[2]["idle"]	= new $.gameQuery.Animation({imageURL: "./images/bossy_idle.png", numberOfFrame: 5, delta: 100, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});
	enemies[2]["explode"]	= new $.gameQuery.Animation({imageURL: "./images/bossy_explode.png", numberOfFrame: 9, delta: 100, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_CALLBACK});
	
	// Weapon missile:
	missile["player"] = new $.gameQuery.Animation({imageURL: "./images/player_missile.png", numberOfFrame: 6, delta: 10, rate: 90, type: $.gameQuery.ANIMATION_VERTICAL});
	missile["enemies"] = new $.gameQuery.Animation({imageURL: "./images/enemy_missile.png", numberOfFrame: 6, delta: 15, rate: 90, type: $.gameQuery.ANIMATION_VERTICAL});
	missile["playerexplode"] = new $.gameQuery.Animation({imageURL: "./images/player_missile_explode.png" , numberOfFrame: 8, delta: 23, rate: 90, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_CALLBACK});
	missile["enemiesexplode"] = new $.gameQuery.Animation({imageURL: "./images/enemy_missile_explode.png" , numberOfFrame: 6, delta: 15, rate: 90, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_CALLBACK});
                
	        $("#background").addSprite("background1", {animation: background1, 
	                       width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
	           .addSprite("background2", {animation: background2,
	                       width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT,
	                       posx: PLAYGROUND_WIDTH})
	           .addSprite("background3", {animation: background3, 
	                      width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
	           .addSprite("background4", {animation: background4, 
	                      width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT,
	                      posx: PLAYGROUND_WIDTH})
	           .addSprite("background5", {animation: background5,
	                      width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
	           .addSprite("background6", {animation: background6,
	                      width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT,
	                      posx: PLAYGROUND_WIDTH}).end();

	var dimensions = { "width": WIDTH , "height": HEIGHT };

	$("#playground").playground( dimensions );  

	$.playground().addGroup("background" , dimensions);

	$.playground().addGroup("actors" , dimensions);

	$.playground().addGroup("playerMissleLayer" , dimensions);

	$.playground().addGroup("enemiesMissileLayer" , dimensions);

	$.playground().addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
		.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: 100, height: 26})
			.addSprite("playerBoostUp", {posx:37, posy: 15, width: 14, height: 18})
			.addSprite("playerBody",{animation: playerAnimation["idle"], posx: 0, posy: 0, width: 100, height: 26})
			.addSprite("playerBooster", {animation:playerAnimation["boost"], posx:-32, posy: 5, width: 36, height: 14})
			.addSprite("playerBoostDown", {posx:37, posy: -7, width: 14, height: 18})
		.end()
	.end()


	$.playground().registerCallback(function() {
		var newPos = (parseInt($("#background1").css("left")) - smallStarSpeed - PLAYGROUND_WIDTH) 
		                                  % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
		$("#background1").css("left", newPos);
	
		newPos = (parseInt($("#background2").css("left")) - smallStarSpeed - PLAYGROUND_WIDTH)
		                             % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
	  $("#background2").css("left", newPos);

	  newPos = (parseInt($("#background3").css("left")) - mediumStarSpeed - PLAYGROUND_WIDTH)
	                     % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
	  $("#background3").css("left", newPos);

	  newPos = (parseInt($("#background4").css("left")) - mediumStarSpeed - PLAYGROUND_WIDTH)
	                     % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
	  $("#background4").css("left", newPos);

	  newPos = (parseInt($("#background5").css("left")) - bigStarSpeed - PLAYGROUND_WIDTH)
	                     % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
	  $("#background5").css("left", newPos);

	  newPos = (parseInt($("#background6").css("left")) - bigStarSpeed - PLAYGROUND_WIDTH)
	                     % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
	  $("#background6").css("left", newPos);
	}, REFRESH_RATE);	
	
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	})
	
	//this is where the keybinding occurs
	$(document).keydown(function(e){
		if(!gameOver && !playerHit){
			switch(e.keyCode){
				case 65: //this is left! (a)
					$("#playerBooster").setAnimation();
					break;
				case 87: //this is up! (w)
					$("#playerBoostUp").setAnimation(playerAnimation["up"]);
					break;
				case 68: //this is right (d)
					$("#playerBooster").setAnimation(playerAnimation["booster"]);
					break;
				case 83: //this is down! (s)
					$("#playerBoostDown").setAnimation(playerAnimation["down"]);
					break;
			}
		}
	});
	//this is where the keybinding occurs
	$(document).keyup(function(e){
		if(!gameOver && !playerHit){
			switch(e.keyCode){
				case 65: //this is left! (a)
					$("#playerBooster").setAnimation(playerAnimation["boost"]);
					break;
				case 87: //this is up! (w)
					$("#playerBoostUp").setAnimation();
					break;
				case 68: //this is right (d)
					$("#playerBooster").setAnimation(playerAnimation["boost"]);
					break;
				case 83: //this is down! (s)
					$("#playerBoostDown").setAnimation();
					break;
			}
		}
	});
	
});