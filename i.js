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
		var a=this;
		this.draw=function(){
			c.beginPath();
			c.strokeStyle=colour;
			c.moveTo(this.pt1.x, this.pt1.y);
			c.lineTo(this.pt2.x, this.pt2.y);
			c.stroke();
			return a;
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
	//Start being useful
	var n  = location.hash.slice(1);
	$.ajax({ url: "readhashes.php?", dataType:"json" }).done(function(d) { 
	

	//Recieve data
	var subjs=[];
	for (i=0;i< d[0].length; i++){
		subjs.push([d[0][i],new dot((ca.height/d.length)*i, i*(ca.width/d.length)).draw()]);
	}
	window.g=subjs;
	for(i=0;i<d[1].length;i++){
		//draw lines from dots to center of screen
		for (m=0;m<subjs.length;m++){
			if(subjs[m][0]==d[1][i][0]){
				//draw line to center of screen
				new line(new point(subjs[m][1].x, subjs[m][1].y), new point(ca.width, ca.height/2)).draw();
			}
		}
	}
});

}
