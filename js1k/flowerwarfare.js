var WIDTH = c.width = 960;
var HEIGHT = c.height = 540;

var rods = [];
var missiles = [];
var bursts = [];
var lives = 3;
var score = Date.now();

var deathframes = 0;

Math.move = function (obj, speed) {
	var distx = obj.tx - obj.cx;
	var disty = obj.ty - obj.cy;
	var angle = Math.atan2(disty, distx);
	
	obj.cx += speed * Math.cos(angle);
	obj.cy += speed * Math.sin(angle);
};

(function render () {
	if (!Math.floor(Math.random() * 120)) {
		var tx = Math.floor(Math.random() * WIDTH);
		
		rods.push({
			ox: tx,
			oy: 0,
			cx: tx,
			cy: 0,
			tx: Math.floor(Math.random() * WIDTH),
			ty: HEIGHT
		});
	}
	
	rods.forEach(function (r, i) {
		Math.move(r, 0.5 + ((Date.now() - score) / 100000));
		
		a.strokeStyle = "hsl(" + (r.cy * (HEIGHT / 360)) + ",50%,50%)";
		
		a.beginPath();
		a.moveTo(r.ox, r.oy);
		a.lineTo(r.cx, r.cy);
		a.stroke();
		
		if (r.cy >= HEIGHT) {
			rods.splice(i, 1);
			
			lives--;
			deathframes = 60;
		}
	});
	
	missiles.forEach(function (m, i) {
		Math.move(m, 6);
		
		a.strokeStyle = "#FFF";
		
		a.beginPath();
		a.moveTo(WIDTH / 2, HEIGHT);
		a.lineTo(m.cx, m.cy);
		a.stroke();
		
		if (m.cy <= m.ty) {
			missiles.splice(i, 1);
			
			bursts.push({
				x: m.cx,
				y: m.cy
			});
		}
	});
	
	bursts.forEach(function (b) {
		// size
		// draw
		// check for and burst on collisions
		// (obj.x - target.x)*(obj.x - target.x) + (obj.y - target.y)*(obj.y - target.y) < rad*rad;
	});
	
	a.fillStyle = "#FFF";
	
	a.fillText(lives + " ♥ " + ((Date.now() - score) / 1000).toFixed(2), 10, 20);
	
	a.fillRect(0, HEIGHT - 10, WIDTH, 10)
	
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
	
	a.fillStyle = "rgba(0,0,0,.3)";
	a.fillRect(0, 0, WIDTH, HEIGHT);
	
	lives && requestAnimationFrame(render);
})();

c.onclick = function (e) {
	missiles.push({
		cx: WIDTH / 2,
		cy: HEIGHT,
		tx: e.pageX - this.offsetLeft,
		ty: e.pageY - this.offsetTop
	});
};