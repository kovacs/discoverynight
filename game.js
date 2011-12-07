$(function(){

	var WIDTH = 700;
	var HEIGHT = 250;

	var dimensions = { "width": WIDTH , "height": HEIGHT };

	$("#playground").playground( dimensions );  

	$.playground().addGroup("background" , dimensions);

	$.playground().addGroup("actors" , dimensions);

	$.playground().addGroup("playerMissleLayer" , dimensions);

	$.playground().addGroup("enemiesMissileLayer" , dimensions);

	var smallStarSpeed    	= 1 //pixels per frame
	var mediumStarSpeed		= 3 //pixels per frame
	var bigStarSpeed		= 4 //pixels per frame


	var PLAYGROUND_WIDTH	= 700;
	var PLAYGROUND_HEIGHT	= 250;

	var REFRESH_RATE		= 15;

	var background1 = new $.gameQuery.Animation({imageURL: "./images/background1.png"});
	var background2 = new $.gameQuery.Animation({imageURL: "./images/background2.png"});
	var background3 = new $.gameQuery.Animation({imageURL: "./images/background3.png"});
	var background4 = new $.gameQuery.Animation({imageURL: "./images/background4.png"});
	var background5 = new $.gameQuery.Animation({imageURL: "./images/background5.png"});
	var background6 = new $.gameQuery.Animation({imageURL: "./images/background6.png"});
                
                
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
	
});