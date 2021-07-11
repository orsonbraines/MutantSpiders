class Spider {
	constructor() {
		this.x = 100;
		this.y = 100;
		this.head_r = 10;
		this.body_rx = 12;
		this.body_ry = 20;
		this.leg_angles = [
			[-70, -10, 10, 40, 125, 155, 185, 210],
			[-35, -5, 25, 50, 140, 170, 190, 250]
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
		this.draw_legs(ctx);
		this.draw_body(ctx);
		this.draw_head(ctx);
	}

	draw_legs(ctx) {
		for(let i = 0; i < 8; ++i) {
			ctx.beginPath();
			ctx.moveTo(this.x + this.head_r * Math.cos(this.leg_angles[this.frame][i]),
				this.y + this.head_r * Math.sin(this.leg_angles[this.frame][i]));
			ctx.lineTo(this.x + (this.head_r + this.leg_length) * Math.cos(this.leg_angles[this.frame][i]),
				this.y + (this.head_r + this.leg_length) * Math.sin(this.leg_angles[this.frame][i]));
			ctx.stroke();
		}
	}

	draw_head(ctx) {
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.head_r, this.head_r, 0, 0, Math.PI * 2);
		ctx.fill();
	}

	draw_body(ctx) {
		ctx.beginPath();
		ctx.ellipse(this.x, this.y + this.head_r + 15, this.body_rx, this.body_ry, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	tick(){
		this.frame = 1 - this.frame;
	}
}

// class Spider:
// 	def __init__(self):
// 		self.x = 100
// 		self.y = 100
// 		self.head_r = 10
// 		self.body_rx = 12
// 		self.body_ry = 20
// 		self.leg_angles = [
// 			[-70, -10, 10, 40, 125, 155, 185, 210],
// 			[-35, -5, 25, 50, 140, 170, 190, 250]
// 		]
// 		self.frame = 0
// 		for i in range(2):
// 			for j in range(8):
// 				self.leg_angles[i][j] = math.radians(self.leg_angles[i][j])
// 		self.leg_length = 40
//
// 	def draw(self, surface):
// 		self.draw_head(surface)
// 		self.draw_body(surface)
// 		self.draw_legs(surface)
//
// 	def draw_head(self, surface):
// 		pg.draw.ellipse(surface, (0,0,0), (-self.head_r + self.x, -self.head_r + self.y, self.head_r * 2, self.head_r * 2))
//
// 	def draw_body(self, surface):
// 		pg.draw.ellipse(surface, (0,0,0), (-self.body_rx + self.x, self.head_r - 9 + self.y, self.body_rx * 2, self.body_ry * 2))
//
// 	def draw_legs(self, surface):
// 		for i in range(8):
// 			pg.draw.line(surface, (0,0,0), (self.x + self.head_r * math.cos(self.leg_angles[self.frame][i]), self.y + self.head_r * math.sin(self.leg_angles[self.frame][i])),
// 				(self.x + (self.head_r + self.leg_length) * math.cos(self.leg_angles[self.frame][i]), self.y + (self.head_r + self.leg_length) * math.sin(self.leg_angles[self.frame][i])), 2)
//
// 	def tick(self):
// 		self.frame = 1 - self.frame
