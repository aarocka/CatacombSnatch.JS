ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)

	size: {x: 18, y:32},
	offset: {x: 7, y: 0},
	
	maxVel: {x: 120, y: 120},
	friction: {x: 1000, y: 1000},

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/lord_lard_sheet.png', 32, 32 ),	
	
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelAir: 560,
	health: 10,
	flip: false,
	playerdirection:0,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'run_back', 0.07, [0,1,2,3,4,5] );
		this.addAnim( 'diag_back_left', 0.07, [6,7,8,9,10,11] );
		this.addAnim( 'left', 0.07, [12,13,14,15,16,17] );
		this.addAnim( 'diag_fwd_left', 0.07, [18,19,20,21,22,23] );
		this.addAnim( 'run_fwd', 0.07, [24,25,26,27,28,29]);
		this.addAnim( 'diag_fwd_right', 0.07, [30,31,32,33,34,35] );
		this.addAnim( 'right', 0.07, [36,37,38,39,40,41] );
		this.addAnim( 'diag_back_right', 0.07, [42,43,44,45,46,47]);
		
		//idle animations
		this.addAnim( 'run_back_idle', 0.07, [0] );
		this.addAnim( 'diag_back_left_idle', 0.07, [6] );
		this.addAnim( 'left_idle', 0.07, [12] );
		this.addAnim( 'diag_fwd_left_idle', 0.07, [18] );
		this.addAnim( 'run_fwd_idle', 0.07, [24]);
		this.addAnim( 'diag_fwd_right_idle', 0.07, [30] );
		this.addAnim( 'right_idle', 0.07, [36] );
		this.addAnim( 'diag_back_right_idle', 0.07, [42]);
	},
	
	
	update: function() {
		//sets a variable or something
		
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
		};
        //move forward and back
        if( ig.input.state('forward') ) {
            this.accel.y = -accel;
        }
        else if(ig.input.state('backwards') ) {
            this.accel.y = accel;
        }
        else{
            this.accel.y = 0;
        };
		
		/*
		// jump
		if( this.standing && ig.input.pressed('jump') ) {
			this.vel.y = -this.jump;
		}
		*/

		// shoot
		if( ig.input.pressed('shoot') ) {
			ig.game.spawnEntity( EntityBullet, this.pos.x, this.pos.y+15, {playerdirection:this.playerdirection} );
		};
		
		// set the current animation, based on the player's velocity
		if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.run_fwd;
			this.playerdirection = 0;
		}
		else if( this.vel.y > 0 ) {
			this.currentAnim = this.anims.run_back;
			this.playerdirection = 180;
		}
		else if( this.vel.x < 0 ) {
			this.currentAnim = this.anims.left;
			this.playerdirection = -90;
		}
		else if ( this.vel.x > 0) {
			this.currentAnim = this.anims.right;
			this.playerdirection = 90;
		};
		
		if(this.vel.y > 0 && this.vel.x > 0 ) {
			this.currentAnim = this.anims.diag_back_right;
			this.playerdirection = 135;
		}
		else if(this.vel.y > 0 && this.vel.x < 0 ) {
			this.currentAnim = this.anims.diag_back_left;
			this.playerdirection = -135;
		};

		if(this.vel.y < 0 && this.vel.x > 0 ) {
			this.currentAnim = this.anims.diag_fwd_right;
			this.playerdirection = 45;
		}
		else if(this.vel.y < 0 && this.vel.x < 0 ) {
			this.currentAnim = this.anims.diag_fwd_left;
			this.playerdirection = -45;
		};

		if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==0 ) {
			this.currentAnim = this.anims.run_fwd_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==180) {
			this.currentAnim = this.anims.run_back_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==45) {
			this.currentAnim = this.anims.diag_fwd_right_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==-45) {
			this.currentAnim = this.anims.diag_fwd_left_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==135) {
			this.currentAnim = this.anims.diag_back_right_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==-135) {
			this.currentAnim = this.anims.diag_back_left_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==90) {
			this.currentAnim = this.anims.right_idle;
		}
		else if(this.vel.x == 0 && this.vel.y == 0 && this.playerdirection==-90) {
			this.currentAnim = this.anims.left_idle;
		};

		// move!
		this.parent();
	}
});


//This is where we define the bullet entity


EntityBullet = ig.Entity.extend({
	size: {x: 16, y: 16},
	offset: {x: 2, y: 2},
	maxVel: {x: 1000, y: 1000},
	
	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.0, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/bullet.png', 16, 16 ),
	
	bounceCounter: 0,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		//define all the animations
		this.addAnim( 'back', 1, [0] );
		this.addAnim( 'back_left', 1, [1] );
		this.addAnim( 'left', 1, [2] );
		this.addAnim( 'forward_left', 1, [3] );
		this.addAnim( 'forward', 1, [4] );
		this.addAnim( 'forward_right', 1, [5] );
		this.addAnim( 'right', 1, [6] );
		this.addAnim( 'back_right', 1, [7] );
		//player direction is settings.playerdirection
		if(settings.playerdirection == 0){
			this.currentAnim = this.anims.forward;
			this.vel.x =0;
			this.vel.y=-500;
		}
		else if(settings.playerdirection == 180){
			this.currentAnim = this.anims.back;
			this.vel.x =0;
			this.vel.y=500;
		}
		else if(settings.playerdirection == 90){
			this.currentAnim = this.anims.right;
			this.vel.x =500;
			this.vel.y=0;
		}
		else if(settings.playerdirection == -90){
			this.currentAnim = this.anims.left;
			this.vel.x =-500;
			this.vel.y=0;
		}
		else if(settings.playerdirection == 45){
			this.currentAnim = this.anims.forward_right;
			this.vel.x =353.55;
			this.vel.y=-353.55;
		}
		else if(settings.playerdirection == -45){
			this.currentAnim = this.anims.forward_left;
			this.vel.x =-353.55;
			this.vel.y=-353.55;
		}
		else if(settings.playerdirection == 135){
			this.currentAnim = this.anims.back_right;
			this.vel.x =353.55;
			this.vel.y=353.55;
		}
		else if(settings.playerdirection == -135){
			this.currentAnim = this.anims.back_left;
			this.vel.x =-353.55;
			this.vel.y=353.55;
		};
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			this.kill();
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});

});