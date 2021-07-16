class Player{
	constructor() {
		this.x = 100;
		this.y = 100;
		this.theta = 0;
		this.head_r = 20;
		this.body_r = 12;
		this.body_w = 40;
		this.body_h = 12;
		this.armAngle = 0;
		this.counter = 0;
		this.theta = 0;
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
		ctx.fillStyle = '#ffb55e';
		ctx.beginPath();
		const rect = [
			t.apply([-this.body_w,this.body_h]),
			t.apply([this.body_w,this.body_h]),
			t.apply([this.body_w,-this.body_h]),
			t.apply([-this.body_w,-this.body_h]),
			t.apply([0,this.body_h])
		]

		ctx.moveTo(rect[4][0], rect[4][1]);
		ctx.arcTo(rect[1][0], rect[1][1], rect[2][0], rect[2][1], 10);

		ctx.arcTo(rect[2][0], rect[2][1], rect[3][0], rect[3][1], 10);
		ctx.arcTo(rect[3][0], rect[3][1], rect[0][0], rect[0][1], 10);
		ctx.arcTo(rect[0][0], rect[0][1], rect[1][0], rect[1][1], 10);
		ctx.lineTo(rect[4][0],rect[4][1]);

		ctx.fill();
	}

	tick(){
		this.frame = 1 - this.frame;
		this.counter += 0.1;
		this.theta = Math.sin(this.counter);
	}
}
