ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.levels.test',
	'plugins.impact-splash-loader',
	'plugins.analog-stick'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 0,

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'forward');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'backwards');
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		this.loadLevel(LevelTest);
		
		if (ig.ua.mobile) {
			var baseSize = 60;
            var stickSize = 30;
            var margin = 20;
            var y = ig.system.height - baseSize - margin;
            var x1 = baseSize + margin;
            var x2 = ig.system.width - baseSize - margin;        

            this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );
            this.stickRight = new ig.AnalogStick( x2, y, baseSize, stickSize );
		};

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		//moving camera
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		}
		if(ig.ua.mobile){
			this.stickLeft.draw();
  		    this.stickRight.draw();
		};
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 30, 400, 290, 2, ig.ImpactSplashLoader );

});
