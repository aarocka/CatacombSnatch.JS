ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.levels.test',
	'impact.debug.debug',
	'plugins.impact-splash-loader'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 0,

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		/*
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'forward');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'backwards');
		ig.input.bind( ig.KEY.C, 'shoot' );
		*/
		this.loadLevel(LevelTest);
		/
		if (ig.ua.mobile) {
			var ypos = ig.system.height - 95;
			this.buttons = [
				new ig.TouchButton( 'left', 20, ypos, 40, 40, this.buttonImage, 2),
				new ig.TouchButton( 'right', 60, ypos, 40, 40, this.buttonImage, 3),
				new ig.TouchButton( 'up', 260, ypos, 40, 40, this.buttonImage, 0),
				new ig.TouchButton( 'down', 210, ypos, 40, 40, this.buttonImage, 1),
			];
		}*/

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		//moving camera
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}

		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 30, 400, 290, 2, ig.ImpactSplashLoader );

});
