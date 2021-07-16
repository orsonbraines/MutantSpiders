class Player{
	constructor() {
		this.x = 100;
		this.y = 100;
		this.v = 3;
		this.theta = 0;
		this.head_r = 20;
		this.body_r = 12;
		this.body_w = 40;
		this.body_h = 12;
		this.leg_r = 5
		this.leg_x = 0;
		this.leg_y = 0;
		this.maxArmPosition = 10;
		this.armPosition = 0;
		this.armDir = 1;
		this.theta = 0;
		// Event handling
		this.moveDirX = 0;
		this.moveDirY = 0;
	}
	draw(ctx) {
		const t = new Transform([this.x, this.y], this.theta);
		this.draw_body(ctx, t);
		this.draw_head(ctx, t);
	}

	draw_leg(){
		ctx.fillStyle = '#0b60ff';
		// ctx.beginPath();
		// const rect = [
		// 	t.apply([-this.body_w,this.body_h]),
		// 	t.apply([this.body_w,this.body_h]),
		// 	t.apply([this.body_w,-this.body_h]),
		// 	t.apply([-this.body_w,-this.body_h]),
		// 	t.apply([0,this.body_h])
		// ]

		ctx.ellipse(0,0, this.leg_r, this.leg_r, 0, 0, Math.PI * 2);
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

	changeDir(isOn, dir) {
		if(isOn) {
			if(dir[0] != 0) {
				this.moveDirX = dir[0];
			}
			if(dir[1] != 0) {
				this.moveDirY = dir[1];
			}
		}
		else {
			if(dir[0] == this.moveDirX) {
				this.moveDirX = 0;
			}
			if(dir[1] == this.moveDirY) {
				this.moveDirY = 0;
			}
		}
		console.log(this.moveDirX, this.moveDirY);
	}

	tick(){
		this.frame = 1 - this.frame;
		this.x += this.moveDirX * this.v;
		this.y += this.moveDirY * this.v;
		this.roundhouseKickFrame++;
		if(this.moveDirX !== 0 || this.moveDirY !== 0) {
			if(this.armDir === 1) {
				++this.armPosition;
				if(this.armPosition === this.maxArmPosition) {
					this.armDir = -1;
				}
			}
			else {
				--this.armPosition;
				if(this.armPosition === -this.maxArmPosition) {
					this.armDir = 1;
				}
			}
		}
		else {
			if(this.armPosition > 0) {
				--this.armPosition;
			}
			else if(this.armPosition < 0){
				++this.armPosition;
			}
		}
		this.theta = this.armPosition / 16;
		this.interpretRoundhouseKick(this.roundhouseKickFrame);
	}
	interpretRoundhouseKick(f){
		if(f <= 20){
			this.theta = (f/20)*(Math.PI * 2);
		}
	}
	startRoundhouseKick(){
		this.roundhouseKickFrame = 0;
	}
}
