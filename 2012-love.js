// "Firehearts", for js1k 2012 (love) by @tkazec | <url>
// b = body, c = cvs, a = ctx

var WIDTH = c.width = 960,
	HEIGHT = c.height = 540,
	RADIAN = Math.PI * 2,
	GRAV = 1.1;

var frame = 0,
	hibana = [];

function burst (blast, count, speed, size, color) {
	for (var i = 0; i < count; i++) {
		var angle = RADIAN * Math.random(), velocity = speed * Math.random();
		
		hibana.push({
			x: 480, // px
			y: 180, // py
			j: velocity * Math.cos(angle), // vx
			k: velocity * Math.sin(angle), // vy
			s: 0.97 + ((blast - 100) / 1000), // spread
			r: size, // radius
			c: color // color
		});
	}
}

function render () {
	hibana.forEach(function(s, ind, arr){
		s.x += s.j;
		s.y += s.k;
		s.j *= s.s;
		s.k *= s.s;
		s.y += GRAV;
		
		a.fillStyle = frame % 2 ? "rgba(256, 256, 256, 0.8)" : s.c;
		a.beginPath();
		a.arc(s.x, s.y, s.r, 0, RADIAN, true);
		a.fill();
		
		if ((s.r *= s.s) < 0.1) {
			delete arr[ind];
		}
	});
	
	a.fillStyle = "rgba(0, 0, 0, 0.3)";
	a.fillRect(0, 0, WIDTH, HEIGHT);
	
	frame++;
	setTimeout(render, 1000 / 60);
}

render();