//Fires on load
init=function(){
	var resize;
	var d=document;
	var dotRad=20;
	var ca=d.getElementsByTagName("canvas")[0];
	var c=ca.getContext("2d");
	(resize = function() {
		ca.width = d.documentElement.clientWidth;
		ca.height = d.documentElement.clientHeight;
	})();
	var point=function(x,y){
		this.x=x;
		this.y=y;
	}
	c.fillStyle = 'rgb(255,255,255)';
	c.fillRect(0, 0, ca.width, ca.height);
	window.addEventListener('resize', resize, false);
	var dot=function(x,y, colour){
		this.x=x;
		this.y=y;
		this.draw=function(){
			c.arc(this.x, this.y, dotRad,  0, 2*Math.PI, true);
		}
	}
	var line=function(point1, point2, colour){
		this.pt1=point1;
		this.pt2=point2;
		this.colour=colour;
		this.draw=function(){
			c.beginPath();
			c.strokeStyle=colour;
			c.moveTo(this.pt1.x, this.pt1.y);
			c.lineTo(this.pt2.x, this.pt2.y);
			c.stroke();
		}
	}
	//draw a line as a test
	c.strokeStyle="red";
	var x;
	c.linewidth=100;
	(x = new line(new point(5,5), new point(10,10), "red")).draw();
}
