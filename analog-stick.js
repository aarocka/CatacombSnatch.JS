ig.module(
	'game.director.analog-stick'
)
.requires(
	'impact.system'
)
.defines(function(){

ig.AnalogStick = ig.Class.extend({
	stickSize: 30,
	baseSize: 70,
	
	stickColor: 'rgba(255,255,255,0.3)',
	baseColor: 'rgba(255,255,255,0.3)',
	baseWidth: 3,
	touchZoneStart: {x: 0, y: 0},
	touchZoneSize: {x: 0, y: 0},
	
	pos: {x: 0, y: 0},
	input: {x: 0, y: 0},
	delta: {x: 0, y: 0},
	pressed: false,
	
	angle: 0,
	amount: 0,
	
	_touchId: null,
	
	init: function( startX, startY, width, height, baseSize, stickSize ) {
		this.pos = {x: 0, y: 0};
		this.baseSize = baseSize || this.baseSize;
		this.stickSize = stickSize || this.stickSize;
		this.max = this.baseSize - this.stickSize/3;
       
        this.touchZoneStart.x = startX;
        this.touchZoneStart.y = startY;
        this.touchZoneSize.x = width;
        this.touchZoneSize.y = height;
		document.addEventListener( 'touchstart', this.touchStart.bind(this), false );
		document.addEventListener( 'touchmove', this.touchMove.bind(this), false );
		document.addEventListener( 'touchend', this.touchEnd.bind(this), false );
	},
	
	touchStart: function( ev ) {
		ev.preventDefault();
		
		if( this.pressed ) { return; }
		for( var i = 0; i < ev.touches.length; i++ ) {
			var touch = ev.touches[i];
	        if (
	            touch.pageX > this.touchZoneStart.x && touch.pageX < this.touchZoneStart.x + this.touchZoneSize.x &&
	                touch.pageY > this.touchZoneStart.y && touch.pageY < this.touchZoneStart.y + this.touchZoneSize.y
	            ) {
				this.pos.x = touch.pageX;
				this.pos.y = touch.pageY;
				var xd = this.pos.x - touch.pageX;
				var yd = this.pos.y - touch.pageY;
				if( Math.sqrt(xd*xd + yd*yd) < this.baseSize ) {
					this.pressed = true;
					this._touchId = touch.identifier;
					this._moved( touch );
					return;
				}
			}
		}
	},
	
	touchMove: function( ev ) {
		ev.preventDefault();
		
		for( var i = 0; i < ev.changedTouches.length; i++ ) {
			if( ev.changedTouches[i].identifier == this._touchId ) {
				this._moved( ev.changedTouches[i] );
				return;
			}
		}
	},
	
	_moved: function( touch ) {
		var x = touch.pageX - this.pos.x;
		var y = touch.pageY - this.pos.y;
		
		this.angle = Math.atan2(x, -y);
		this.amount = Math.min( 1, Math.sqrt(x*x + y*y)/this.max );
		this.input.x = Math.sin(this.angle) * this.amount;
		this.input.y = -Math.cos(this.angle) * this.amount;
		this.delta.x = touch.pageX - this.pos.x;
		this.delta.y = touch.pageY - this.pos.y; 
	},
	
	touchEnd: function( ev ) {
		// ev.preventDefault();
		
		ig.input.delayedKeyup['shoot'] = true;
		
		for( var i = 0; i < ev.changedTouches.length; i++ ) {
			if( ev.changedTouches[i].identifier == this._touchId ) {
				this.pressed = false;
				this.input.x = 0;
				this.input.y = 0;
				this.amount = 0;
				this._touchId = null;
				this.delta.x = 0;
				this.delta.y = 0;
				return;
			}
		}
	},
	
	draw: function() {
		var ctx = ig.system.context;
		ctx.beginPath();
		if (this.touchZoneStart.x < ig.system.width / 2) {
			ctx.arc(this.pos.x, this.pos.y, this.baseSize, 0, (Math.PI * 2), true);

			ctx.lineWidth = this.baseWidth;
			ctx.strokeStyle = this.baseColor;
			ctx.stroke();

			// Input
			ctx.beginPath();
			ctx.arc(
				this.pos.x + this.input.x * this.max, 
				this.pos.y + this.input.y * this.max, 
				this.stickSize, 0, (Math.PI * 2), true
			);
			ctx.fillStyle = this.stickColor;
			ctx.fill();
		}

		else if (this.touchZoneStart.x >= ig.system.width / 2) {
			ctx.beginPath();
			ctx.moveTo(this.pos.x, this.pos.y - 50);
			ctx.lineTo(this.pos.x, this.pos.y + 50);
			ctx.stroke();		
			
			var markerPos = {x: this.pos.x, y: this.delta.y + this.pos.y};
			if (markerPos.y < this.pos.y - 50) {
				markerPos.y = this.pos.y - 50;
			}
			else if (markerPos.y > this.pos.y + 50) {
				markerPos.y = this.pos.y + 50;
			}	
			ctx.beginPath();	
			ctx.arc(markerPos.x, markerPos.y, 20,0,2*Math.PI);
			ctx.fill(); 
		}
	}
});


});