$(function() {
	var canvas = $('#canvas')[0];
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	var ctx = canvas.getContext('2d');
    window.mmuted = true;

	// resize
	$(window).on('resize', function() {
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		//ctx.fillStyle = '#000003';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		center = { x: canvas.width / 2, y: canvas.height / 2 };
	});

	// init
	ctx.fillStyle = '#000003';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// objects
	var listFire = [];
	var listFire2 = [];
	var listFirework = [];
	var listText = [];
	var listSpecial = [];
	var listSpark = [];
	var lights = [];
	var fireNumber = 10;
	var center = { x: canvas.width / 2, y: canvas.height / 2 };
	var range = 100;
	var fired = 0;
	var fired2 = 0;//控制最后发射100发结束
	var onHold = 0;
	var supprise = false;
	// var textIndex = 0;

	// var textCanvas = document.createElement("canvas");
	// textCanvas.width=1000;
	// textCanvas.height=300;
	// var textctx = textCanvas.getContext("2d");
	// textctx.fillStyle = "#000000";
	// textctx.fillRect(0,0,textCanvas.width,textCanvas.height);
	// var textFire = [];

	var actions = [makeDoubleFullCircleFirework, makePlanetCircleFirework, makeFullCircleFirework, makeDoubleCircleFirework, makeHeartFirework, makeCircleFirework, makeRandomFirework];
	for (var i = 0; i < fireNumber; i++) {
		var fire = {
			x: Math.random() * range / 2 - range / 4 + center.x,
			y: Math.random() * range * 2.5 + canvas.height,
			size: Math.random() + 0.5,
			fill: '#ff3',
			vx: Math.random() - 0.5,
			vy: -(Math.random() + 4),
			ax: Math.random() * 0.06 - 0.03,
			delay: Math.round(Math.random() * range) + range * 4,
			hold: false,
			alpha: 1,
			far: Math.random() * range + (center.y - range)
		};
		fire.base = {
			x: fire.x,
			y: fire.y,
			vx: fire.vx,
			vy: fire.vy
		};
		//
		listFire.push(fire);
		// play sound
		playLaunchSound();
	}


	// define array of sound
	var listExpSound = $('audio.exp');
	var listLaunchSound = $('audio.launch');

	    // window.mmuted = true;
        // playExpSound();
        // playLaunchSound();

	// define array position of text
	var textString = 'happylunarnewyear2018';
	var textMatrix = [
		4.5, 0, 5.5, 0, 6.5, 0, 7.5, 0, 8.5, 0,
		0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 6, 1, 7, 1, 8, 1, 10, 1, 11, 1, 12, 1, 13, 1,
		5, 2, 6, 2, 7, 2, 8, 2
	]
	var chars = {
		h: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
			1, 3, 2, 3, 3, 3, 4, 3,
			5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7
		],
		a: [
			10, 0, 2, 1, 2, 2, 1, 2, 1, 3, 1, 4, 1, 5, 0, 5, 0, 6, 0, 7, 2, 5,
			3, 0, 3, 1, 3, 2, 4, 2, 4, 3, 4, 4, 4, 1, 5, 5, 5, 6, 5, 7, 3, 5
		],
		p: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
			1, 0, 2, 0, 3, 0, 4, 1, 5, 2, 4, 3, 3, 4, 2, 4, 1, 4
		],
		y: [
			0, 0, 0, 1, 1, 1, 1, 2, 1, 3, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7,
			3, 2, 3, 3, 4, 1, 4, 2, 5, 0, 5, 1
		],
		l: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
			1, 7, 2, 7, 3, 7, 4, 7, 5, 7
		],
		u: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6,
			1, 7, 2, 7, 3, 7, 4, 7,
			5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6
		],
		n: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
			1, 1, 1, 2, 2, 2, 2, 3, 2, 4, 3, 4, 3, 5, 4, 5, 4, 6,
			5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7
		],
		e: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
			1, 0, 2, 0, 3, 0, 4, 0, 5, 0,
			1, 3, 2, 3, 3, 3, 4, 3,
			1, 7, 2, 7, 3, 7, 4, 7, 5, 7
		],
		w: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 1, 6,
			2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7, 3, 7,
			5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 4, 5, 4, 6
		],
		r: [
			0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
			1, 0, 2, 0, 3, 0, 4, 1, 5, 2, 4, 3, 3, 4, 2, 4, 1, 4,
			1, 5, 2, 5, 3, 6, 4, 6, 5, 7
		],
		/*
		@todo 这个年份有空再画
		2: [
			0, 1, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 5, 1, 5, 2, 5, 3,
			4, 3, 3, 3, 2, 3, 2, 4, 1, 4, 1, 5,
			0, 5, 0, 6, 0, 7, 1, 7, 2, 7, 3, 7, 4, 7, 5, 7, 5, 6
		],
		0: [
			0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6,
			1, 0, 2, 0, 3, 0, 4, 0,
			1, 7, 2, 7, 3, 7, 4, 7,
			5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6
		],
		1: [
			1, 2, 2, 2, 2, 1, 3, 1, 3, 0,
			4, 0, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 4, 7,
			1, 7, 2, 7, 3, 7, 5, 7
		],
		7: [
			0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0,
			5, 1, 5, 2, 5, 3, 4, 3, 4, 4,
			3, 4, 3, 5, 3, 6, 3, 7
		]
		*/
	}

	function initText() {
		var i = textIndex;
		var velocity = Math.random() * 0.25 + 1;
		var shift = { x: -(Math.random() + 2), y: -(Math.random() + 3) };
		var char = chars[textString[i]];
		var width = 80;
		var half = 6.5 * width;
		var left = textMatrix[i * 2] * width - half;
		var top = textMatrix[i * 2 + 1] * range * 1.2 - range * 2.4;
		for (var j = 0; j < fireNumber * char.length * 0.25; j++) {
			var rand = Math.floor(Math.random() * char.length * 0.5);
			var x = char[rand * 2] + shift.x;
			var y = char[rand * 2 + 1] + shift.y;
			var text = {
				x: center.x + left * 0.9,
				y: center.y + top,
				left: center.x + left,
				size: Math.random() + 0.5,
				fill: '#ff3',
				vx: x * (velocity + (Math.random() - 0.5) * 0.5),
				vy: y * (velocity + (Math.random() - 0.5) * 0.5),
				ay: 0.08,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			}
			text.base = {
				life: text.life,
				size: text.size,
			};
			text.direct = (text.left - text.x) * 0.08;
			listText.push(text);
		}
		// play sound
		playExpSound();
		//
		lights.push({ x: center.x + left * 0.9, y: center.y + top, color: text.fill, radius: range * 2 });
		if (++textIndex < textString.length) {
			setTimeout(initText, 10);
		}
		else {
			textIndex = 0;
		}
	}

	function initSpark() {
		var x = Math.random() * range * 3 - range * 1.5 + center.x;
		var vx = Math.random() - 0.5;
		var vy = -(Math.random() + 4);
		var ax = Math.random() * 0.04 - 0.02;
		var far = Math.random() * range * 4 - range + center.y;
		var direct = ax * 10 * Math.PI;
		var max = fireNumber * 0.5;
		for (var i = 0; i < max; i++) {
			var special = {
				x: x,
				y: Math.random() * range * 0.25 + canvas.height,
				size: Math.random() + 2,
				fill: '#ff3',
				vx: vx,
				vy: vy,
				ax: ax,
				direct: direct,
				alpha: 1
			};
			special.far = far - (special.y - canvas.height);
			listSpecial.push(special);
			// play sound
			playLaunchSound();
		}
	}

	function randColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var color = 'rgb($r, $g, $b)';
		color = color.replace('$r', r);
		color = color.replace('$g', g);
		color = color.replace('$b', b);
		return color;
	}

	function playExpSound() {
		if(window.mmuted){
			var sound = listExpSound[Math.floor(Math.random() * listExpSound.length)];
	        sound.volume = Math.random() * 0.4 + 0.1;
	        sound.play();
		}
		
	}
	function playLaunchSound() {
		if(window.mmuted){
			setTimeout(function() {
			  var sound = listLaunchSound[Math.floor(Math.random() * listLaunchSound.length)];
		      sound.volume = 0.05;
		      sound.play();
		    }, 200);
	    }
		
	}

	function makeCircleFirework(fire) {
		var color = randColor();
		var velocity = Math.random() * 2 + 6;
		var max = fireNumber * 5;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.04,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 2 +2
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return color;
	}

	//
	function makeDoubleCircleFirework(fire) {
		var color = randColor();
		var velocity = Math.random() * 2 + 8;
		var max = fireNumber * 3;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.04,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5 +2
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		color = randColor();
		velocity = Math.random() * 3 + 4;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.04,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return color;
	}

	//行星
	function makePlanetCircleFirework(fire) {
		var color = '#aa0609';
		var velocity = Math.random() * 2 + 4;
		var max = fireNumber * 2;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.04,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		max = fireNumber * 4;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity * Math.random(),
				vy: Math.sin(rad) * velocity * Math.random(),
				ay: 0.04,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		max = fireNumber * 3;
		color = '#ff9';
		var rotate = Math.random() * Math.PI * 2;
		var vx = velocity *  (Math.random() + 2);
		var vy = velocity * 0.6;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			// calc x, y for ellipse
			var cx = Math.cos(rad) * vx + (Math.random() - 0.5) * 0.5;
			var cy = Math.sin(rad) * vy + (Math.random() - 0.5) * 0.5;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: cx * Math.cos(rotate) - cy * Math.sin(rotate), // rotate x ellipse
				vy: cx * Math.sin(rotate) + cy * Math.cos(rotate), // rotate y ellipse
				ay: 0.02,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return '#aa0609';
	}

	function makeFullCircleFirework(fire) {
		var color = randColor();
		var velocity = Math.random() * 8 + 8;
		var max = fireNumber * 3;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.06,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		max = fireNumber * Math.round(Math.random() * 4 + 4);
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity * Math.random(),
				vy: Math.sin(rad) * velocity * Math.random(),
				ay: 0.06,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return color;
	}

	function makeDoubleFullCircleFirework(fire) {
		var color = randColor();
		var velocity = Math.random() * 8 + 8;
		var max = fireNumber * 3;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.04,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		color = randColor();
		velocity = Math.random() * 3 + 4;
		max = fireNumber * 2;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.06,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		max = fireNumber * 4;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * velocity * Math.random(),
				vy: Math.sin(rad) * velocity * Math.random(),
				ay: 0.06,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return color;
	}

	function makeHeartFirework(fire) {
		var color = randColor();
		var velocity = Math.random() * 3 + 3;
		var max = fireNumber * 5;
		var rotate = Math.random() * Math.PI * 2;
		for (var i = 0; i < max; i++) {
			var rad = (i * Math.PI * 2) / max + rotate;
			var v, p;
			if (rad - rotate < Math.PI * 0.5) {
				p = (rad - rotate) / (Math.PI * 0.5);
				v = velocity + velocity * p;
			}
			else if (rad - rotate > Math.PI * 0.5 && rad - rotate < Math.PI) {
				p = (rad - rotate - Math.PI * 0.5) / (Math.PI * 0.5);
				v = velocity * (2 - p);
			}
			else if (rad - rotate > Math.PI && rad - rotate < Math.PI * 1.5) {
				p = (rad - rotate - Math.PI) / (Math.PI * 0.5);
				v = velocity * (1 - p);
			}
			else if (rad - rotate > Math.PI * 1.5 && rad - rotate < Math.PI * 2) {
				p = (rad - rotate - Math.PI * 1.5) / (Math.PI * 0.5);
				v = velocity * p;
			}
			else {
				v = velocity;
			}
			v = v + (Math.random() - 0.5) * 0.25 + 1;
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.cos(rad) * v,
				vy: Math.sin(rad) * v,
				ay: 0.02,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 1.5 + 4
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return color;
	}

	function makeRandomFirework(fire) {
		var color = randColor();
		for (var i = 0; i < fireNumber * 5; i++) {
			var firework = {
				x: fire.x,
				y: fire.y,
				size: Math.random() + 1.5,
				fill: color,
				vx: Math.random() * 15 - 7.5,
				vy: Math.random() * -15 + 5,
				ay: 0.05,
				alpha: 1,
				life: Math.round(Math.random() * range / 2) + range / 2
			};
			firework.base = {
				life: firework.life,
				size: firework.size
			};
			listFirework.push(firework);
		}
		return color;
	}

	function makeSpark(special) {
		var color = special.fill;
		var velocity = Math.random() * 6 + 12;
		var max = fireNumber;
		for (var i = 0; i < max; i++) {
			var rad = (Math.random() * Math.PI * 0.3 + Math.PI * 0.35) + Math.PI + special.direct;
			var spark = {
				x: special.x,
				y: special.y,
				size: Math.random() + 1,
				fill: color,
				vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
				vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
				ay: 0.02,
				alpha: 1,
				rad: rad,
				direct: special.direct,
				chain: Math.round(Math.random() * 2) + 2,
				life: Math.round(Math.random() * range / 2) + range / 2
			};
			spark.base = {
				life: spark.life,
				velocity: velocity
			};
			listSpark.push(spark);
		}
		return color;
	}

	function chainSpark(parentSpark) {
		var color = parentSpark.fill;
		if (parentSpark.chain > 0) {
			var velocity = parentSpark.base.velocity * 0.6;
			var max = Math.round(Math.random() * 5);
			for (var i = 0; i < max; i++) {
				var rad = (Math.random() * Math.PI * 0.3 - Math.PI * 0.15) + parentSpark.rad + parentSpark.direct;
				var spark = {
					x: parentSpark.x,
					y: parentSpark.y,
					size: parentSpark.size * 0.6,
					fill: color,
					vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
					vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
					ay: 0.02,
					alpha: 1,
					rad: rad,
					direct: parentSpark.direct,
					chain: parentSpark.chain,
					life: parentSpark.base.life * 0.8
				};
				spark.base = {
					life: spark.life,
					size: spark.size,
					velocity: velocity
				};
				listSpark.push(spark);
			}

			if (Math.random() > 0.9 && parentSpark.chain > 1) {
				// play sound
				playExpSound();
			}
		}
		return color;
	}
var jishu = 0;
var end = 0;
var onefirenum = 25;
	(function loop() {
		requestAnimationFrame(loop);
		//150次循环生成一次火花	
		jishu ++;
			if(jishu %150 == 0 && fired <= onefirenum ){
				oneFire(Math.floor(Math.random() * 2) );
	//			textFireworks(center.x,center.y,["生日快乐"]);
			}
		update2();
		draw();
	})();


	function oneFire(x){
		
		//将随机生成的火花释放
		for(i=0;i<=x;i++){
			var fire = {
				x: Math.random() * range / 2 - range / 4 + center.x,
				y: Math.random() * range * 2.5 + canvas.height,
				size: Math.random() + 0.5,
				fill: '#ff3',
				vx: Math.random() - 0.5,
				vy: -(Math.random() + 4),
				ax: Math.random() * 0.06 - 0.03,
				delay: Math.round(Math.random() * range) + range * 4,
				hold: false,
				alpha: 1,
				far: Math.random() * range + (center.y - range)
			};
			fire.base = {
				x: fire.x,
				y: fire.y,
				vx: fire.vx,
				vy: fire.vy
			};
			//
			listFire2.push(fire);
			// play sound
			playLaunchSound();


		}
		

	}
	oneFire(1);
	var end = 0;//文字火花是否放了
	


	// function textFireworks(x, y,text="") {

	// 	var hue = Math.random() * 360;
	// 	var hueVariance = 30;

	// 	function setupColors(p){
	// 		p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
	// 		p.brightness = Math.floor(Math.random() * 21) + 50;
	// 		p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
	// 	}

	// 	if(text!=""){
			
	// 		var gap = 6;
	// 		var fontSize = 120;

	// 		textctx.font=fontSize+"px Verdana";
	// 		textctx.fillStyle = "#ffffff";
			
	// 		var textWidth = textctx.measureText(text).width;
	// 		var textHeight = fontSize;
			
	// 		textctx.fillText(text,0,textHeight);
	// 		var imgData = textctx.getImageData(0,0,textWidth,textHeight*1.2);
			
	// 		textctx.fillStyle = "#000000";
	// 		textctx.fillRect(0,0,textCanvas.width,textCanvas.height);

	// 		for (var h = 0; h < textHeight*1.2; h+=gap) {
	// 		    for(var w = 0; w < textWidth; w+=gap){
	// 		            var position = (textWidth * h + w) * 4;
	// 		            var r = imgData.data[position], g = imgData.data[position + 1], b = imgData.data[position + 2], a = imgData.data[position + 3];
			    
	// 		    		if(r+g+b==0)continue;

	// 		            var p = {};

	// 					p.x = x;
	// 					p.y = y;

	// 					p.fx = x + w - textWidth/2;
	// 					p.fy = y + h - textHeight/2;

	// 					p.size = Math.floor(Math.random()*2)+1;
	// 					p.speed = 1;
	// 					setupColors(p);

	// 					textFire.push(p);
	// 		    }
	// 		}
		
	// 	}
	// }


	function update2() {
		
		if(listFire2.length){
			for (var i = 0; i < listFire2.length; i++) {
				var fire = listFire2[i];
				//
				if (fire.y <= fire.far) {
					// play sound
					playExpSound();
					// case add firework
					fired++;
					var color = actions[Math.floor(Math.random() * actions.length)](fire);
					// light
					lights.push({ x: fire.x, y: fire.y, color: color, radius: range * 2 });
	
					listFire2.splice(i, 1);
					// reset
					fire.y = fire.base.y;
					fire.x = fire.base.x;
					
					fire.vx = fire.base.vx;
					fire.vy = fire.base.vy;
					fire.ax = Math.random() * 0.06 - 0.03;
						// play sound
					playLaunchSound();
				}
	
				fire.x += fire.vx;
				fire.y += fire.vy;
				fire.vx += fire.ax;
				fire.alpha = (fire.y - fire.far) / fire.far;
			}

		}

// 		//文字
// //		if(fired >= 25 && textFire.length ){}
// 		for (var i = 0; i < textFire.length; i++) {
// 			var p =textFire[i];

// 			p.x += (p.fx - p.x)/10;
// 			p.y += (p.fy - p.y)/10-(p.alpha-1)*p.speed;

// 			p.alpha -= 0.006;

// 			if (p.alpha<=0) {
// 				textFire.splice(i, 1);
// 				continue;
// 			}

// 		}

		if(fired >= onefirenum){
			if(jishu %950 == 0 ){
				end = 1;
			}
			
		}

		//最后速度很快的放
		if(end&&fired2<=120){
			
			for (var i = 0; i < listFire.length; i++) {
				var fire = listFire[i];
				//
				if (fire.y <= fire.far) {
					// play sound
					playExpSound();
					// case add firework
					fired2++;
					var color = actions[Math.floor(Math.random() * actions.length)](fire);
					// light
					lights.push({ x: fire.x, y: fire.y, color: color, radius: range * 2 });

					
					// reset
					fire.y = fire.base.y;
					fire.x = fire.base.x;
					
					fire.vx = fire.base.vx;
					fire.vy = fire.base.vy;
					fire.ax = Math.random() * 0.06 - 0.03;
						// play sound
					playLaunchSound();
				}
	
				fire.x += fire.vx;
				fire.y += fire.vy;
				fire.vx += fire.ax;
				fire.alpha = (fire.y - fire.far) / fire.far;
			}
	
		}
		
		// update firework logic
		for (var i = listFirework.length - 1; i >= 0; i--) {
			var firework = listFirework[i];
			if (firework) {
				firework.vx *= 0.9;
				firework.vy *= 0.9;
				firework.x += firework.vx;
				firework.y += firework.vy;
				firework.vy += firework.ay;
				firework.alpha = firework.life / firework.base.life;
				firework.size = firework.alpha * firework.base.size;
				firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
				//
				firework.life--;
				if (firework.life <= 0) {
					listFirework.splice(i, 1);
				}
			}
		}
	}

	function draw() {
		// clear
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = '#000003';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// re-draw
		ctx.globalCompositeOperation = 'screen';

		for (var i = 0; i < listFire2.length; i++) {
			var fire = listFire2[i];
			ctx.globalAlpha = fire.alpha;
			ctx.beginPath();
			ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = fire.fill;
			ctx.fill();
		}

		//文字
		// for (var i = 0; i < textFire.length; i++) {
		// 	var text = textFire[i];
			
		// 	ctx.beginPath();
		// 	ctx.arc(text.x, text.y, text.size, 0, Math.PI * 2, false);
		// 	ctx.closePath();

		// 	ctx.fillStyle = 'hsla('+text.hue+',100%,'+text.brightness+'%,'+text.alpha+')';
		// 	ctx.fill();
		// }


		for (var i = 0; i < listFire.length; i++) {
			var fire = listFire[i];
			ctx.globalAlpha = fire.alpha;
			ctx.beginPath();
			ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = fire.fill;
			ctx.fill();
		}

		for (var i = 0; i < listFirework.length; i++) {
			var firework = listFirework[i];
			ctx.globalAlpha = firework.alpha;
			ctx.beginPath();
			ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = firework.fill;
			ctx.fill();
		}

		for (var i = 0; i < listSpecial.length; i++) {
			var special = listSpecial[i];
			ctx.globalAlpha = special.alpha;
			// ctx.beginPath();
			// ctx.arc(special.x, special.y, special.size, 0, Math.PI * 2);
			// ctx.closePath();
			// ctx.fill();
			ctx.fillStyle = special.fill;
			ctx.fillRect(special.x - special.size, special.y - special.size, special.size * 2, special.size *2);
		}

		for (var i = 0; i < listSpark.length; i++) {
			var spark = listSpark[i];
			ctx.globalAlpha = spark.alpha;
			// ctx.beginPath();
			// ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
			// ctx.closePath();
			// ctx.fill();
			ctx.fillStyle = spark.fill;
			ctx.fillRect(spark.x - spark.size, spark.y - spark.size, spark.size * 2, spark.size *2);
		}

		// light effect
		while (lights.length) {
			var light = lights.pop();
			var gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
			gradient.addColorStop(0, '#fff');
			gradient.addColorStop(0.2, light.color);
			gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
			gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			ctx.globalAlpha = light.alpha ? light.alpha : 0.25;
			ctx.fillStyle = gradient;
			ctx.fillRect(light.x - light.radius, light.y - light.radius, light.radius * 2, light.radius * 2);
		}

		// supprise: HAPPY LUNAR NEW YEAR 2018!
		for (var i = 0; i < listText.length; i++) {
			var text = listText[i];
			ctx.globalAlpha = text.alpha;
			ctx.fillStyle = text.fill;
			ctx.fillRect(text.x - text.size, text.y - text.size, text.size * 2, text.size * 2);
		}
	}
})