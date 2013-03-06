var WIDTH = c.width = 960;
var HEIGHT = c.height = 540;

var rods = [];
var missiles = [];
var bursts = [];
var lives = 3;
var score = Date.now();

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
			// screen-wide flower upon life lost
		}
	});
	
	missiles.forEach(function (m) {
		// move missile (dt)
		// draw
		// convert to bursts
	});
	
	bursts.forEach(function (b) {
		// size
		// draw
		// check for collisions
	});
	
	a.fillStyle = "rgba(255,255,255,.3)"
	a.fillText(lives + " ♥ " + ((Date.now() - score) / 1000).toFixed(2), 10, 20);
	
	lives && requestAnimationFrame(render);
})()

c.onclick = function (e) {
	// create missiles
	// e.pageX - this.offsetLeft
	// e.pageY - this.offsetTop
};

// http://js1k.com/2010-first/demo/680