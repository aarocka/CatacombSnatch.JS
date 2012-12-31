ig.module(
	'game.entities.mummy'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMummy = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 33, y:30},
	offset: {x: 5, y: 9},
	
	maxVel: {x: 100, y: 100},
	friction: {x: 600, y: 600},
	
	type: ig.Entity.TYPE.B, // Player enemy group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/mummy_48.png', 48, 48 ),	
	
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelAir: 200,
	jump: 200,
	health: 35,
	flip: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'left', 0.1, [0,1,2,3] );
		this.addAnim( 'forward', 0.1, [4,5,6,7] );
		this.addAnim( 'right', 0.1, [8,9,10,11] );
		this.addAnim( 'back', 0.1, [12,13,14,15] );
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
		if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.forward;
		}
		else if( this.vel.y > 0 ) {
			this.currentAnim = this.anims.back;
		}
		else if( this.vel.x < 0 ) {
			this.currentAnim = this.anims.left;
		}
		else if( this.vel.x > 0) {
			this.currentAnim = this.anims.right;
		}
		else {
			this.currentAnim = this.anims.idle;
		}
		
		
		// move!
		this.parent();
	}
});

});