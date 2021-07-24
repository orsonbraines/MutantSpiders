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
		this.maxArmPosition = 10;
		this.armPosition = 0;
		this.armDir = 1;
		this.leg_r = 20
		this.legExtention = 0;
		this.armAngle = 0;
		// Event handling
		this.moveDirX = 0;
		this.moveDirY = 0;
	}
	draw(ctx) {
		cameraTransform.setToCtx(ctx);
		const t = modelMatrix([this.x, this.y], this.theta + this.armAngle);
		ctx.lineCap = 'round';
		this.draw_leg(ctx, t);
		this.draw_body(ctx, t);
		this.draw_head(ctx, t);
		ctx.resetTransform();
	}

	draw_leg(ctx, t){
		ctx.strokeStyle = '#0b60ff';
		ctx.lineWidth = this.leg_r;
		ctx.beginPath();
		const position = [
			t.apply([10,0]),
			t.apply([10,this.legExtention]),
		]
		ctx.moveTo(position[0][0],position[0][1]);
		ctx.lineTo(position[1][0],position[1][1]);
		ctx.stroke();
	}

	draw_head(ctx, t) {
		ctx.fillStyle = '#473100';
		ctx.beginPath();
		const center = t.apply([0,0]);
		const r = this.head_r;
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
	}

	tick(){
		this.frame = 1 - this.frame;
		const invT = cameraTransform.inverse();
		const transformedMouse = invT.apply([mouse.x, mouse.y]);
		const delta = [transformedMouse[0] - this.x, transformedMouse[1] - this.y];
		//const delta = [mouse.x - this.x, mouse.y - this.y];
		const deltaR = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
		this.theta = Math.atan2(-delta[1], delta[0]) - Math.PI / 2;

		let keyDirection = normalize([this.moveDirX, this.moveDirY]);
		let playerDirection = normalize(delta);

		// if(distSq(playerDirection) !== 0) this.theta = Math.atan2(playerDirection[1], -playerDirection[0]) + Math.PI / 2;

		let playerVelocity = mult(playerDirection,this.v,-keyDirection[1]);

		this.x += playerVelocity[0];
		this.y += playerVelocity[1];


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
		this.armAngle = this.armPosition / 16;
		this.interpretRoundhouseKick(this.roundhouseKickFrame);
	}
	interpretRoundhouseKick(f){
		if(f <= 20){
			this.armAngle = (f/20)*(Math.PI * 2);
			this.legExtention = f*2;
		}else if(f <= 40){
			this.legExtention = (40-f)*2;
		}
	}
	startRoundhouseKick(){
		this.roundhouseKickFrame = 0;
	}
}
