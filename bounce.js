//cube.js
"use strict";
var ball_List = [new Ball(100, 200, 5, 5, 100)]
var init = function(){
	window.requestAnimationFrame(draw);
}	


var options = {
	"linear_slow" : {
		x : 5,
		y : 5
	},
	"linear_fast" : {
		x: 10, 
		y: 10
	},
	"explosion" : {
		x :Math.floor((Math.random() * 10) + 2),
		y :Math.floor((Math.random() * 10) + 2)
	}

}

function Ball(x, y, dx, dy, r) {
	this.vert_speed = dx;
	this.horiz_speed = dy;
	this.x = x;
	this.y = y;
	this.color =  "rgb(" + String(Math.floor((Math.random() * 255) + 0))+ ','+String(Math.floor((Math.random() * 255) + 0))+ ','+String(Math.floor((Math.random() * 255) + 0)) + ")";
	this.r = r;
}


Ball.prototype.updateLocation = function(c, ball_inst){
		if (this.x < this.r || this.x > c.width - this.r){
			this.horiz_speed = this.horiz_speed * -1;
			ball_List = ball_List.concat(duplicate(c, ball_inst, 'h'));
			
		}
		if (this.y < this.r || this.y > c.height - this.r){
			this.vert_speed = this.vert_speed * -1;
			ball_List = ball_List.concat(duplicate(c, ball_inst, 'v'));
		}
		this.x = this.x + this.horiz_speed;
		this.y = this.y + this.vert_speed;
	}



var duplicate = function(c, parent, wall){
	
	if(ball_List.length < 1000){
		var child_size = parent.r < 5 ? 15 : parent.r*3/4.0;


		const child1 = new Ball(parent.x, parent.y, parent.vert_speed, parent.horiz_speed, child_size);

		if (wall === 'v'){
			var v = 1;
			var h = -1;
		}
		else{
			var v = -1;
			var h = 1;
		}

		const child2 = new Ball(parent.x, parent.y, v*parent.vert_speed, h*parent.horiz_speed, child_size);

			ball_List.splice(ball_List.indexOf(parent), 1);
			return [child1, child2];
	}
	return []
	
}

var draw = function(){
	var canvas = document.getElementById("GameCanvas");
	var ctx = canvas.getContext("2d");
	

	ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas for redrawing

	//fill background
	ctx.fillStyle = 'rgb(0,0,0)'
	ctx.fillRect(0,0,canvas.width, canvas.height);



	for (var i = 0; i < ball_List.length; i++){
		var cB = ball_List[i]
		ctx.fillStyle = cB.color;
		ctx.beginPath();
		ctx.arc(cB.x, cB.y, cB.r, 0, 2*Math.PI, false);
		ctx.closePath()
		ctx.fill()

		cB.updateLocation(canvas, ball_List[i]);
	}

	window.requestAnimationFrame(draw);
}

init()
