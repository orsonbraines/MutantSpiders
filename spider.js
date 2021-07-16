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
		for(let i = 0; i < 2; ++i) {
			for(let j = 0; j < 8; ++j) {
				this.leg_angles[i][j] = this.leg_angles[i][j] * Math.PI / 180;
			}
		}
		this.leg_length = 40;
	}

	draw(ctx) {
		const t = new Transform([this.x, this.y], this.theta);
		t.setToCtx(ctx);
		this.draw_legs(ctx);
		this.draw_body(ctx);
		this.draw_head(ctx);
		ctx.resetTransform();
	}
	draw_legs(ctx) {
		ctx.fillStyle = '#000';
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
		this.frame = 1 - this.frame;
		this.theta += 0.05;
	}
}
