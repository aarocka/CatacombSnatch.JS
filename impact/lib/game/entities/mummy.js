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
	
	type: ig.Entity.TYPE.B, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/mummy_48.png', 48, 48 ),	
	
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelAir: 200,
	jump: 200,
	health: 10,
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


// The grenades a player can throw are NOT in a separate file, because
// we don't need to be able to place them in Weltmeister. They are just used
// here in the code.

// Only entities that should be usable in Weltmeister need to be in their own
// file.
/*
EntitySlimeGrenade = ig.Entity.extend({
	size: {x: 4, y: 4},
	offset: {x: 2, y: 2},
	maxVel: {x: 200, y: 200},
	
	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.6, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/slime-grenade.png', 8, 8 ),
	
	bounceCounter: 0,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -50;
		this.addAnim( 'idle', 0.2, [0,1] );
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			
			// only bounce 3 times
			this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});
*/
});