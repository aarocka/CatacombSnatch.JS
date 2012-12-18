ig.module(
	'game.entities.bat'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBat = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 22, y:12},
	offset: {x: 5, y: 7},
	
	maxVel: {x: 120, y: 120},
	friction: {x: 600, y: 600},
	
	type: ig.Entity.TYPE.B, // Player enemy group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/bat_32.png', 32, 32 ),	
	
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelAir: 400,
	jump: 200,
	health: 10,
	flip: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 0.07, [0,1,2,3] );

	},
	
	
	update: function() {
		
		// move left or right
		var accel = this.accelAir;
		if( ig.input.state('left') ) {
			this.accel.x = -accel;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
		}
		else{
			this.accel.x = 0;
		}
        //move forward and back
        if( ig.input.state('forward') ) {
            this.accel.y = -accel;
        }
        else if(ig.input.state('backwards') ) {
            this.accel.y = accel;
        }
        else{
            this.accel.y = 0;
        }
		
		
		// set the current animation, based on the player's speed

		this.currentAnim = this.anims.idle;
		
		// move!
		this.parent();
	}
});

});