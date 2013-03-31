var w = this,
	r = "equestAnimationFrame",
	animFrame = w["r"+r] || w["webkitR"+r] || w["mozR"+r] || w["msR"+r] || w["oR"+r] || function (cb) { setTimeout(cb, 1000 / 60); };

var MATH = Math,
	PI = MATH.PI,
	FLOOR = MATH.floor,
	RAND = MATH.random;

var WIDTH = c.width = 960;
var HEIGHT = c.height = 540;

var rods = [];
var missiles = [];
var bursts = [];
var lives = 5;
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
			ty: HEIGHT,
			s: 0.5 + ((Date.now() - score) / 50000)
		});
	}
	
	rods.forEach(function (r, i) {
		Math.move(r, r.s);
		
		a.strokeStyle = "hsl(" + (r.cy * (HEIGHT / 360)) + ",50%,50%)";
		
		a.beginPath();
		a.moveTo(r.ox, r.oy);
		a.lineTo(r.cx, r.cy);
		a.stroke();
		
		if (r.d || r.cy >= HEIGHT) {
			rods.splice(i, 1);
			
			if (!r.d) {
				lives--;
				deathframes = 60;
			}
		}
	});
	
	missiles.forEach(function (m, i) {
		Math.move(m, 6);
		
		a.strokeStyle = "#0F8";
		
		a.beginPath();
		a.moveTo(WIDTH / 2, HEIGHT);
		a.lineTo(m.cx, m.cy);
		a.stroke();
		
		if (m.cy <= m.ty) {
			missiles.splice(i, 1);
			
			bursts.push({
				x: m.cx,
				y: m.cy,
				r: 0
			});
		}
	});
	
	bursts.forEach(function (b, i) {
		b.r++;
		
		a.fillStyle = "#FFF";
		
		a.beginPath();
		a.arc(b.x, b.y, b.r, 0, Math.PI * 2, true);
		a.fill();
		
		// todo draw flower, duh
		
		rods.forEach(function (r) {
			if ((b.x - r.cx)*(b.x - r.cx) + (b.y - r.cy)*(b.y - r.cy) < b.r*b.r) {
				r.d = true;
				
				bursts.push({
					x: r.cx,
					y: r.cy,
					r: 0
				});
			}
		});
		
		if (b.r === 50) {
			bursts.splice(i, 1);
		}
	});
	
	a.fillStyle = "#8F8";
	
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