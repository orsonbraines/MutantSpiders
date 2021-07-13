class Player{
	constructor() {
		this.x = 100;
		this.y = 100;
		this.theta = 0;
		this.head_r = 20;
		this.body_r = 12;
		this.body_w = 50;
		this.body_h = 50;
		this.armAngle = 0;
		this.frame = 0;
	}
	draw(ctx) {
		const t = new Transform([this.x, this.y], this.theta);
		this.draw_body(ctx, t);
		this.draw_head(ctx, t);
	}

	draw_head(ctx, t) {
		ctx.fillStyle = '#473100';
		ctx.beginPath();
		const center = t.apply([0,0]);
		const r = t.scale * this.head_r;
		ctx.ellipse(center[0], center[1], r, r, 0, 0, Math.PI * 2);
		ctx.fill();
	}

	draw_body(ctx, t) {
		ctx.beginPath();
		const rect = [
			t.apply([-this.body_w,this.body_h]),
			t.apply([this.body_w,this.body_h]),
			t.apply([-this.body_w,-this.body_h]),
			t.apply([this.body_w,-this.body_h]),
		]

		ctx.moveTo(rect[0][0],rect[0][1]);
		ctx.lineTo(rect[1][0],rect[1][1]);
		ctx.lineTo(rect[2][0],rect[2][1]);
		ctx.lineTo(rect[3][0],rect[3][1]);
		// const rx = t.scale * this.body_rx;
		// const ry = t.scale * this.body_ry;
		// ctx.ellipse(center[0], center[1], rx, ry, -this.theta, 0, Math.PI * 2);
		ctx.fill();
	}

	tick(){
		this.frame = 1 - this.frame;
		this.theta += 0.05;
	}
}
