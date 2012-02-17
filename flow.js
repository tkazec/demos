/*** setup ***/
var w = this,
	r = "equestAnimationFrame",
	animFrame = w["r"+r] || w["webkitR"+r] || w["mozR"+r] || w["msR"+r] || w["oR"+r] || function (cb) { setTimeout(cb, 1000 / 60); };

var DEG = Math.PI / 180;

var WIDTH = c.width = 1280,
	HEIGHT = c.height = 720,
	MASK = document.createElement("canvas"),
	FADE = document.createElement("canvas"),
	y = MASK.getContext("2d"),
	z = FADE.getContext("2d"),
	drips = [],
	tick = 1800;

b.style.background = "#000";
c.style.background = "#FFF";
c.style.display = "block";
c.style.margin = "30px auto 0 auto";

MASK.width = FADE.width = 320;
MASK.height = FADE.height = 430;
y.translate(160, 10);
z.translate(160, 10);


/*** mask & fade ***/
var mask = function (x, fade) {
	x.save();
	x.fillStyle = fade ? "rgba(0,0,0,.02)" : "#FFF";
	x.translate(0, 75);
	x.beginPath();
	x.rotate(5 * DEG);
	x.scale(1, 0.5);
	x.arc(0, 0, 150, 0 * DEG, 180 * DEG, true);
	x.scale(1, 2);
	x.moveTo(-150, 0);
	x.rotate(-5 * DEG);
	x.lineTo(-150, 345);
	x.lineTo(150, 345);
	x.rotate(5 * DEG);
	x.lineTo(150, 0);
	x.fill();
	x.restore();
};

mask(y);

y.globalCompositeOperation = "destination-out";
y.translate(0, 85);
y.rotate(5 * DEG);
y.beginPath();
y.scale(1, 0.5);
y.arc(0, 0, 135, 0 * DEG, 180 * DEG, true);
y.scale(1, 2);
y.fill();
y.beginPath();
y.moveTo(0, -80);
y.lineTo(15, 0);
y.lineTo(-15, 0);
y.lineTo(0, -80);
y.fill();

mask(z, true);


/*** canvas ***/
for (var i = 90; i--;) {
	var hue = i * 4,
		pos = (i * 14) + 12.5;
	
	a.fillStyle = "hsl(" + hue + ",80%,70%)";
	a.fillRect(pos - 0.5, 12, 10, 50);
	
	a.fillStyle = "hsl(" + hue + ",100%,40%)";
	a.fillRect(pos, 10, 9, 2);
	a.beginPath();
	a.moveTo(pos, 60);
	a.lineTo(pos + 3.5, 70);
	a.lineTo(pos + 5.5, 70);
	a.lineTo(pos + 9, 60);
	a.fill();
}

(function render () {
	if (!Math.floor(Math.random() * 10)) {
		var pos = Math.floor(Math.random() * 90);
		
		drips.push({
			x: (pos * 14) + 17,
			y: 70,
			r: 2,
			h: "hsl(" + (pos * 4) + ",100%,50%)"
		});
	}
	
	drips.forEach(function (d) {
		d.x += 0.5 - Math.random();
		d.y += Math.random() * 1.5;
		d.r += 0.05 - (Math.random() / 10);
		
		a.fillStyle = d.h;
		a.fillRect(d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
	});
	
	a.drawImage(MASK, 750, HEIGHT - 430);
	
	--tick && animFrame(render);
})();