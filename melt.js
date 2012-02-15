// b = body, c = cvs, a = ctx

/*** setup ***/
var DEG = Math.PI / 180;

var WIDTH = c.width = 1280,
	HEIGHT = c.height = 720,
	MASK = document.createElement("canvas"),
	FADE = document.createElement("canvas"),
	y = MASK.getContext("2d"),
	z = FADE.getContext("2d");

b.style.background = "#000";
c.style.display = "block";
c.style.margin = "30px auto 0 auto";

MASK.width = FADE.width = 320;
MASK.height = FADE.height = 430;
y.translate(160, 10);
z.translate(160, 10);


/*** mask & fade ***/
var mask = function (x, fade) {
	x.save();
	x.fillStyle = fade ? "rgba(0,0,0,0.02)" : "#FFF";
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
a.fillStyle = "#00F";
a.fillRect(0, 0, WIDTH, HEIGHT);

a.drawImage(MASK, 750, 720 - 430);