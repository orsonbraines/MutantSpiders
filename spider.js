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
		this.draw_legs(ctx, t);
		this.draw_body(ctx, t);
		this.draw_head(ctx, t);
	}

	draw_legs(ctx, t) {
		for(let i = 0; i < 8; ++i) {
			ctx.beginPath();
			const p1 = t.apply([this.head_r * Math.cos(this.leg_angles[this.frame][i]),
				this.head_r * Math.sin(this.leg_angles[this.frame][i])]);
			const p2 = t.apply([(this.head_r + this.leg_length) * Math.cos(this.leg_angles[this.frame][i]),
				(this.head_r + this.leg_length) * Math.sin(this.leg_angles[this.frame][i])]);
			ctx.moveTo(p1[0], p1[1]);
			ctx.lineTo(p2[0], p2[1]);
			ctx.stroke();
		}
	}

	draw_head(ctx, t) {
		ctx.beginPath();
		const center = t.apply([0,0]);
		const r = t.scale * this.head_r;
		ctx.ellipse(center[0], center[1], r, r, 0, 0, Math.PI * 2);
		ctx.fill();
	}

	draw_body(ctx, t) {
		ctx.beginPath();
		const center = t.apply([0,-this.head_r - this.body_ry/2]);
		const rx = t.scale * this.body_rx;
		const ry = t.scale * this.body_ry;
		ctx.ellipse(center[0], center[1], rx, ry, -this.theta, 0, Math.PI * 2);
		ctx.fill();
	}

	tick(){
		this.frame = 1 - this.frame;
		this.theta += 0.05;
	}
}
