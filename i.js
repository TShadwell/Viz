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
		c.fillStyle = 'rgb(255,255,255)';
		c.fillRect(0, 0, ca.width, ca.height);
	})();
	var point=function(x,y){
		this.x=x;
		this.y=y;
	}
	window.addEventListener('resize', resize, false);
	var dot=function(x,y){
		this.x=x;
		this.y=y;
		this.draw=function(){
			c.arc(this.x, this.y, dotRad,  0, 2*Math.PI, true);
		}
	}
	var line=function(point1, point2){
		this.pt1=point1;
		this.pt2=point2;
		this.draw=function(){
			moveTo(pt1.x, pt1.y);
			lineTo(pt2.x, pt2.y);
		}
	}

}
