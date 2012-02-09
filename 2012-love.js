// "Firehearts", for js1k 2012 (love) by @tkazec | <url>
// b = body, c = cvs, a = ctx

var WIDTH = c.width = 960,
	HEIGHT = c.height = 540,
	hibana = [];

function burst (blast, count, speed, size, color) {
	for (var i = 0; i < count; i++) {
		var angle = Math.PI * 2 * Math.random(), velocity = speed * Math.random();
		
		hibana.push({
			x: 480, // x
			y: 180, // y
			j: velocity * Math.cos(angle), // vx
			k: velocity * Math.sin(angle), // vy
			s: 0.97 + ((blast - 100) / 1000), // spread
			r: size, // radius
			c: color // color
		});
	}
}

function heart (x, y, s) {
	var s1 = .48 * s, s2 = .24 * s, s3 = .336 * s;
	
	a.beginPath();
	a.moveTo(x - s1, y);
	a.lineTo(x, y + s1);
	a.arc(x + s2, y - s2, s3, 0.25 * Math.PI, 1.25 * Math.PI, true);
	a.arc(x - s2, y - s2, s3, 1.75 * Math.PI, 0.75 * Math.PI, true);
	a.fill();
}

function render () {
	hibana.forEach(function(s, ind, arr){
		s.x += s.j; // x+vx
		s.y += s.k; // y+vy
		s.j *= s.s; // vx*spread
		s.k *= s.s; // vy*spread
		s.y += 1.1; // y+gravity
		
		a.fillStyle = !Math.floor(Math.random() * 4) ? "rgba(256, 256, 256, 0.8)" : s.c;
		heart(s.x, s.y, s.r);
		
		if ((s.r *= s.s) < 0.1) {
			delete arr[ind];
		}
	});
	
	a.fillStyle = "rgba(0, 0, 0, 0.3)";
	a.fillRect(0, 0, WIDTH, HEIGHT);
	
	setTimeout(render, 1000 / 60);
}

render();

burst(100, 150, 5, 10, "#FF2000");