class Spider {
	constructor() {
		this.x = 100;
		this.y = 100;
		this.theta = 0;
		this.head_r = 10;
		this.body_rx = 12;
		this.body_ry = 20;
		this.leg_angles = [
			[110, 170, 190, 220, 305, 335, 5, 30],
			[145, 175, 205, 230, 320, 350, 10, 70]
		];
		this.frame = 0;
		this.subframe = 0;
		for(let i = 0; i < 2; ++i) {
			for(let j = 0; j < 8; ++j) {
				this.leg_angles[i][j] = this.leg_angles[i][j] * Math.PI / 180;
			}
		}
		this.leg_length = 30;
	}

	draw(ctx) {
		const t = new Transform([this.x, this.y], this.theta);
		t.setToCtx(ctx);
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#000';
		this.draw_legs(ctx);
		this.draw_body(ctx);
		this.draw_head(ctx);
		ctx.resetTransform();
	}
	draw_legs(ctx) {
		for(let i = 0; i < 8; ++i) {
			ctx.beginPath();
			ctx.moveTo(this.head_r * Math.cos(this.leg_angles[this.frame][i]),
				this.head_r * Math.sin(this.leg_angles[this.frame][i]));
			ctx.lineTo((this.head_r + this.leg_length) * Math.cos(this.leg_angles[this.frame][i]),
				(this.head_r + this.leg_length) * Math.sin(this.leg_angles[this.frame][i]));
			ctx.stroke();
		}
	}

	draw_head(ctx) {
		ctx.beginPath();
		ctx.ellipse(0, 0, this.head_r, this.head_r, 0, 0, Math.PI * 2);
		ctx.fill();
	}

	draw_body(ctx) {
		ctx.beginPath();
		ctx.ellipse(0, -this.head_r - this.body_ry/2, this.body_rx, this.body_ry, 0, 0, Math.PI * 2);
		ctx.fill();
	}


	tick() {
		const delta = [mouse.x - this.x, mouse.y - this.y];
		const deltaR = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
		this.theta = Math.atan2(-delta[1], delta[0]) - Math.PI / 2;
		//console.log(delta[0],delta[1],this.theta);
		const v = 5;
		this.moving = (deltaR >= v)
		if(this.moving) {
			this.x += delta[0] * v / deltaR;
			this.y += delta[1] * v / deltaR;

			++this.subframe;
			if(this.subframe == 10) {
				this.subframe = 0;
				this.frame = 1 - this.frame;
			}
		}
	}
}
