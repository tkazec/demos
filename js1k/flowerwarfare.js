var WIDTH = c.width = 960;
var HEIGHT = c.height = 540;

var rods = [];
var missiles = [];
var bursts = [];
var lives = 3;
var score = Date.now();

var deathframes = 0;

(function render () {
	a.fillStyle = "rgba(0,0,0,.3)";
	a.fillRect(0, 0, WIDTH, HEIGHT);
	
	rods.forEach(function (r, i) {
		// move rod (dt, global speed)
		// color rod (y)
		// draw
		
		if (r.y >= HEIGHT) {
			rods.splice(i, 1);
			lives--;
			deathframes = 60;
		}
	});
	
	missiles.forEach(function (m) {
		// move missile (dt)
		a.strokeStyle = "#FFF";
		a.beginPath();
		a.moveTo(m.x, m.y);
		a.lineTo(m.j, m.k);
		a.stroke();
		// convert to bursts
	});
	
	bursts.forEach(function (b) {
		// size
		// draw
		// check for and burst on collisions
	});
	
	a.fillStyle = "rgba(255,255,255,.3)";
	
	a.fillText(lives + " ♥ " + ((Date.now() - score) / 1000).toFixed(2), 10, 20);
	
	a.fillStyle = "#FFF";
	
	a.beginPath();
	a.arc(WIDTH / 2, HEIGHT, 30, 0, Math.PI, true);
	a.fill();
	
	if (deathframes) {
		a.fillStyle = "rgba(255,0,127,.3)";
		
		for (var i = 0; i < 12; i++) {
			if (i % 2) {
				a.beginPath();
				a.moveTo(WIDTH / 2, HEIGHT / 2);
				a.arc(WIDTH / 2, HEIGHT / 2, HEIGHT / 3, ((i / 6) + (deathframes / 240)) * Math.PI, ((i / 6) + 0.2 + (deathframes / 240)) * Math.PI, false);
				a.fill();
			}
		}
		
		deathframes--;
	}
	
	lives && requestAnimationFrame(render);
})();

c.onclick = function (e) {
	missiles.push({
		x: WIDTH / 2,
		y: HEIGHT,
		j: e.pageX - this.offsetLeft,
		k: e.pageY - this.offsetTop
	});
};

// http://js1k.com/2010-first/demo/680