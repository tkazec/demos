// "Firehearts", for js1k 2012 (love) by @tkazec | <url>
// b = body, c = cvs, a = ctx

var WIDTH = c.width = 960,
	HEIGHT = c.height = 540,
	hanabi = [],
	queue = [],
	w = this,
	r = "equestAnimationFrame",
	animFrame = w["r"+r] || w["webkitR"+r] || w["mozR"+r] || w["msR"+r] || w["oR"+r] || function(cb){ setTimeout(cb, 1000 / 60); };

function burst (x, y, size, speed, spread, count) {
	var list = [];
	
	for (; count--;) {
		var angle = Math.PI * 2 * Math.random(), velocity = speed * Math.random();
		
		list.push({
			x: x, // x
			y: y, // y
			j: velocity * Math.cos(angle), // vx
			k: velocity * Math.sin(angle), // vy
			s: 0.97 + ((spread - 100) / 1000), // spread, 0-129
			r: size + Math.floor(Math.random() * 6) // radius
		});
	}
	
	return list;
}

function heart (x, y, s) {
	var s1 = .48 * s,
		s2 = .24 * s,
		s3 = .336 * s;
	
	a.beginPath();
	a.moveTo(x - s1, y);
	a.lineTo(x, y + s1);
	a.arc(x + s2, y - s2, s3, 0.25 * Math.PI, 1.25 * Math.PI, true);
	a.arc(x - s2, y - s2, s3, 1.75 * Math.PI, 0.75 * Math.PI, true);
	a.fill();
}

(function render () {
	if (!hanabi.length && queue.length) {
		var set = queue.shift();
		
		for (var delay in set) {
			setTimeout(function(list){
				hanabi = hanabi.concat(list);
			}, delay * (1000 / 60), set[delay]); // ie?
		}
	}
	
	hanabi.forEach(function(h, i){
		h.x += h.j; // x+vx
		h.y += h.k; // y+vy
		h.j *= h.s; // vx*spread
		h.k *= h.s; // vy*spread
		h.y += 1.1; // y+gravity
		
		a.fillStyle = !Math.floor(Math.random() * 4) ? "rgba(256,256,256,.8)" : "#F20";
		heart(h.x, h.y, h.r);
		
		if ((h.r *= h.s) < 0.1) {
			hanabi.splice(i, 1);
		}
	});
	
	a.fillStyle = "rgba(0,0,0,.3)";
	a.fillRect(0, 0, WIDTH, HEIGHT);
	
	animFrame(render);
})();

hanabi = hanabi.concat(burst(
	130 + Math.floor(Math.random() * 701), // x
	130 + Math.floor(Math.random() * 151), // y
	10, // size
	5, // speed
	100, // spread
	150 // count
));