class Transform {
	constructor(pos, theta, flipY = true) {
		this.xx = Math.cos(theta);
		this.xy = -Math.sin(theta);
		this.xt = pos[0];
		this.yx = Math.sin(theta);
		this.yy = Math.cos(theta);
		if(flipY) {
			this.yx *= -1;
			this.yy *= -1;
		}
		this.yt = pos[1];
		this.scale = 1;
	}

	apply(vec) {
		return [vec[0] * this.xx + vec[1] * this.xy + this.xt, vec[0] * this.yx + vec[1] * this.yy + this.yt];
	}

	setToCtx(ctx) {
		ctx.setTransform(this.xx, this.xy, this.yx, this.yy, this.xt, this.yt);
	}
}
