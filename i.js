//Fires on load
init=function(){
	var resize, 
	d=document, 
	dotRad=20, 
	ca=d.getElementsByTagName("canvas")[0],
	cRed="#a04800",
	cYellow="#bdbc55";
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
	var clear=function(callback){
		var fade;
		(fade = function(n){
			if(n<=(50)){
				c.fillStyle="rgba(255,255,255,0.1)";
				c.fillRect(0, 0, ca.width, ca.height);
				n++;
				setTimeout(fade, 1, n);
			}
			else{
				c.fillStyle="rgb(255,255,255)";
				c.fillRect(0, 0, ca.width, ca.height);
				if (typeof callback !== "undefined"){callback()};
			}
		})(0);
	}
	//draw a line as a test
	c.strokeStyle="red";
	var x, y;
	c.lineWidth=20;
	(x = new line(new point(5,5), new point(10,10), cRed)).draw();
	(y = new line(new point(100,5), new point(10,10), "green")).draw();
	clear();
}
